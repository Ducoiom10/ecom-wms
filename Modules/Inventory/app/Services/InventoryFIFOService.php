<?php

namespace Modules\Inventory\Services;

use App\Core\Services\BaseService;
use Illuminate\Support\Facades\DB;
use Modules\Inventory\Models\InventoryBatch;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\StockMovement;
use Modules\Inventory\Models\WarehouseLocation;
use Exception;

class InventoryFIFOService extends BaseService
{
    /**
     * Reserve stock using FIFO (oldest batch first, skip expired).
     * Returns array of allocated batches or throws if insufficient stock.
     */
    public function reserveStock(int $productId, int $quantity, ?int $warehouseId = null): array
    {
        return DB::transaction(function () use ($productId, $quantity, $warehouseId) {
            $query = InventoryBatch::where('product_id', $productId)
                ->where('quantity', '>', 0)
                ->where(fn($q) => $q->whereNull('expiry_date')->orWhere('expiry_date', '>', now())) // bỏ qua batch đã hết hạn
                ->orderBy('fifo_sequence');

            if ($warehouseId) {
                $query->whereHas('location', fn($q) => $q->where('warehouse_id', $warehouseId)->where('is_active', true)); // chỉ lấy batch ở kho cụ thể và kho phải đang hoạt động
            }

            $batches = $query->lockForUpdate()->get();

            $reserved = [];
            $remaining = $quantity;

            foreach ($batches as $batch) {
                $allocate = min($batch->quantity, $remaining);
                $batch->decrement('quantity', $allocate);

                $reserved[] = [
                    'batch_id'     => $batch->id,
                    'batch_number' => $batch->batch_number,
                    'location_id'  => $batch->warehouse_location_id,
                    'quantity'     => $allocate,
                    'expiry_date'  => $batch->expiry_date,
                ];

                $remaining -= $allocate;
                if ($remaining === 0) break;
            }

            if ($remaining > 0) {
                throw new Exception("Insufficient stock for product #{$productId}. Short by {$remaining} units.");
            }

            return $reserved;
        });
    }

    /**
     * Deduct multiple items in ONE transaction, locks sorted by product_id
     * to prevent cross-lock deadlocks when concurrent orders share products.
     *
     * @param  array  $items  [['product_id' => int, 'quantity' => int], ...]
     * @return Stock[]
     */
    public function deductStockBatch(array $items, string $referenceType, int $referenceId): array
    {
        // Cho ngắn gọn code trong transaction, sort trước để tất cả transaction đều lock theo cùng thứ tự product_id,
        // giảm thiểu deadlock khi có nhiều đơn hàng cùng sản phẩm.
        usort($items, fn($a, $b) => $a['product_id'] <=> $b['product_id']);

        return DB::transaction(function () use ($items, $referenceType, $referenceId) {
            $results = [];

            foreach ($items as $item) {
                $productId = $item['product_id'];
                $quantity  = $item['quantity'];

                $stock = Stock::lockForUpdate()
                    ->where('product_id', $productId)
                    ->firstOrFail();

                if ($stock->quantity < $quantity) {
                    throw new Exception("Insufficient stock for product #{$productId}.");
                }

                $stock->decrement('quantity', $quantity);
                $stock->increment('reserved_quantity', $quantity);

                StockMovement::create([
                    'stock_id'       => $stock->id,
                    'type'           => 'out',
                    'quantity'       => $quantity,
                    'reference_type' => $referenceType,
                    'reference_id'   => $referenceId,
                ]);

                $results[] = $stock->fresh();
            }

            return $results;
        });
    }

    /**
     * Deduct stock for a single product (wraps deductStockBatch).
     */
    public function deductStock(int $productId, int $quantity, string $referenceType, int $referenceId): Stock
    {
        return $this->deductStockBatch(
            [['product_id' => $productId, 'quantity' => $quantity]],
            $referenceType,
            $referenceId
        )[0];
    }

    /**
     * Thực hiện release stock đã được reserve (ví dụ khi hủy đơn hàng), tăng lại quantity và giảm reserved_quantity.
     * Ghi log vào StockMovement để theo dõi lịch sử.
     *
     * @param int $productId
     * @param int $quantity
     * @param string $referenceType
     * @param int $referenceId
     * @return void
     * @throws Exception
     */
    public function releaseReserved(int $productId, int $quantity, string $referenceType, int $referenceId): void
    {
        DB::transaction(function () use ($productId, $quantity, $referenceType, $referenceId) {
            $stock = Stock::lockForUpdate()
                ->where('product_id', $productId)
                ->firstOrFail();

            $stock->decrement('reserved_quantity', min($quantity, $stock->reserved_quantity));
            $stock->increment('quantity', $quantity);

            StockMovement::create([
                'stock_id'       => $stock->id,
                'type'           => 'in',
                'quantity'       => $quantity,
                'reference_type' => $referenceType,
                'reference_id'   => $referenceId,
                'note'           => 'Reserved stock released',
            ]);
        });
    }
}
