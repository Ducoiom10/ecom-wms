<?php

namespace Modules\WMS\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Events\StockUpdated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Catalog\Models\Product;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\StockMovement;
use Modules\Inventory\Models\WarehouseLocation;

class ScannerController extends Controller
{
    public function scan(Request $request)
    {
        $validated = $request->validate([
            'barcode'  => 'required|string',
            'mode'     => 'required|in:inbound,outbound',
            'quantity' => 'integer|min:1',
        ]);

        $qty = $validated['quantity'] ?? 1;

        $product = Product::where('sku', $validated['barcode'])->first();

        if (!$product) {
            return response()->json(['message' => 'Không tìm thấy sản phẩm: ' . $validated['barcode']], 404);
        }

        return $validated['mode'] === 'inbound'
            ? $this->handleInbound($product, $qty)
            : $this->handleOutbound($product, $qty);
    }

    private function handleInbound(Product $product, int $qty)
    {
        $location = WarehouseLocation::where('is_active', true)->first();

        if (!$location) {
            return response()->json(['message' => 'Không có vị trí kho khả dụng'], 400);
        }

        DB::transaction(function () use ($product, $location, $qty) {
            $stock = Stock::firstOrCreate(
                ['product_id' => $product->id, 'warehouse_location_id' => $location->id],
                ['quantity' => 0, 'reserved_quantity' => 0]
            );

            $stock->increment('quantity', $qty);

            StockMovement::create([
                'stock_id'       => $stock->id,
                'type'           => 'in',
                'quantity'       => $qty,
                'reference_type' => 'scanner',
                'note'           => 'Quét mã nhập kho',
                'user_id'        => auth()->id(),
            ]);

            broadcast(new StockUpdated($stock->fresh()));
        });

        return response()->json([
            'product_name' => $product->name,
            'quantity'     => $qty,
            'location'     => $location->barcode,
        ]);
    }

    private function handleOutbound(Product $product, int $qty)
    {
        $result = null;

        DB::transaction(function () use ($product, $qty, &$result) {
            $stock = Stock::where('product_id', $product->id)
                ->where('quantity', '>=', $qty)
                ->lockForUpdate()
                ->first();

            if (!$stock) {
                $result = response()->json(['message' => 'Không đủ hàng trong kho'], 400);
                return;
            }

            $stock->decrement('quantity', $qty);

            StockMovement::create([
                'stock_id'       => $stock->id,
                'type'           => 'out',
                'quantity'       => $qty,
                'reference_type' => 'scanner',
                'note'           => 'Quét mã xuất kho',
                'user_id'        => auth()->id(),
            ]);

            broadcast(new StockUpdated($stock->fresh()));

            $result = response()->json([
                'product_name' => $product->name,
                'quantity'     => $qty,
            ]);
        });

        return $result;
    }
}
