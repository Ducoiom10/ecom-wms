<?php

namespace Modules\PIM\Services;

use App\Core\Services\BaseService;
use Modules\PIM\Models\PurchaseOrder;
use Modules\PIM\Models\PurchaseOrderItem;
use Modules\PIM\Repositories\PurchaseOrderRepository;
use Modules\Catalog\Repositories\ProductRepository;
use Exception;
use Illuminate\Support\Str;

class PurchaseOrderService extends BaseService
{
    protected PurchaseOrderRepository $poRepository;
    protected ProductRepository $productRepository;

    /**
     * Constructor
     */
    public function __construct(
        PurchaseOrderRepository $poRepository,
        ProductRepository $productRepository
    ) {
        $this->poRepository = $poRepository;
        $this->productRepository = $productRepository;
    }

    /**
     * Create a new purchase order
     */
    public function createPurchaseOrder(int $supplierId, int $warehouseId, array $items, array $data = []): PurchaseOrder
    {
        return $this->executeInTransaction(function () use ($supplierId, $warehouseId, $items, $data) {
            // Validate items
            if (empty($items)) {
                throw new Exception("Purchase order must have at least one item");
            }

            // Calculate total amount
            $totalAmount = 0;
            foreach ($items as $item) {
                $product = $this->productRepository->findById($item['product_id']);
                if (!$product) {
                    throw new Exception("Product with ID {$item['product_id']} not found");
                }

                $itemTotal = $item['quantity'] * $item['unit_price'];
                $totalAmount += $itemTotal;
            }

            // Create purchase order
            $poData = array_merge([
                'code' => 'PO-' . Str::upper(Str::random(8)),
                'supplier_id' => $supplierId,
                'warehouse_id' => $warehouseId,
                'status' => 'pending',
                'total_amount' => $totalAmount,
                'created_by' => auth()->id()
            ], $data);

            $purchaseOrder = $this->poRepository->create($poData);

            // Add items to purchase order
            foreach ($items as $item) {
                PurchaseOrderItem::create([
                    'po_id' => $purchaseOrder->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'received_quantity' => 0
                ]);
            }

            $this->logSuccess('Purchase order created', [
                'po_id' => $purchaseOrder->id,
                'po_code' => $purchaseOrder->code,
                'items_count' => count($items),
                'total_amount' => $totalAmount
            ]);

            return $purchaseOrder;
        });
    }

    /**
     * Approve a purchase order
     */
    public function approvePurchaseOrder(int $poId, int $userId): PurchaseOrder
    {
        return $this->executeInTransaction(function () use ($poId, $userId) {
            $po = $this->poRepository->findById($poId);

            if (!$po) {
                throw new Exception("Purchase order with ID {$poId} not found");
            }

            if ($po->status !== 'pending') {
                throw new Exception("Only pending purchase orders can be approved");
            }

            $this->poRepository->update($poId, [
                'status' => 'approved',
                'approved_by' => $userId
            ]);

            $this->logSuccess('Purchase order approved', [
                'po_id' => $poId,
                'po_code' => $po->code,
                'approved_by' => $userId
            ]);

            return $this->poRepository->findById($poId);
        });
    }

    /**
     * Cancel a purchase order
     */
    public function cancelPurchaseOrder(int $poId, string $reason = null): PurchaseOrder
    {
        return $this->executeInTransaction(function () use ($poId, $reason) {
            $po = $this->poRepository->findById($poId);

            if (!$po) {
                throw new Exception("Purchase order with ID {$poId} not found");
            }

            if (in_array($po->status, ['completed', 'cancelled'])) {
                throw new Exception("Cannot cancel {$po->status} purchase order");
            }

            $updateData = ['status' => 'cancelled'];
            if ($reason) {
                $updateData['notes'] = ($po->notes ?? '') . "\nCancellation reason: {$reason}";
            }

            $this->poRepository->update($poId, $updateData);

            $this->logSuccess('Purchase order cancelled', [
                'po_id' => $poId,
                'po_code' => $po->code,
                'reason' => $reason
            ]);

            return $this->poRepository->findById($poId);
        });
    }

    /**
     * Update item received quantity
     */
    public function updateReceivedQuantity(int $poItemId, int $receivedQuantity): PurchaseOrderItem
    {
        return $this->executeInTransaction(function () use ($poItemId, $receivedQuantity) {
            $poItem = PurchaseOrderItem::find($poItemId);

            if (!$poItem) {
                throw new Exception("Purchase order item with ID {$poItemId} not found");
            }

            if ($receivedQuantity > $poItem->quantity) {
                throw new Exception("Received quantity cannot exceed ordered quantity");
            }

            $poItem->update(['received_quantity' => $receivedQuantity]);

            // Check if entire PO is received
            $po = $poItem->purchaseOrder;
            $totalOrdered = $po->purchaseOrderItems->sum('quantity');
            $totalReceived = $po->purchaseOrderItems->sum('received_quantity');

            if ($totalReceived === $totalOrdered) {
                $po->update(['status' => 'completed']);
            } elseif ($totalReceived > 0) {
                $po->update(['status' => 'partial']);
            }

            return $poItem;
        });
    }

    /**
     * Get purchase order with all details
     */
    public function getPurchaseOrderDetails(int $id): ?PurchaseOrder
    {
        return $this->poRepository->findWithRelations($id);
    }

    /**
     * Get pending approval purchase orders
     */
    public function getPendingApproval(): array
    {
        return $this->poRepository->getPendingApproval()
            ->map(fn($po) => [
                'id' => $po->id,
                'code' => $po->code,
                'supplier' => $po->supplier->name,
                'total_amount' => $po->total_amount,
                'items_count' => $po->purchaseOrderItems()->count(),
                'created_at' => $po->created_at
            ])
            ->toArray();
    }

    /**
     * Get purchase orders by status summary
     */
    public function getStatusSummary(): array
    {
        $counts = $this->poRepository->countByStatus();
        $totalAmount = PurchaseOrder::sum('total_amount');

        return [
            'by_status' => $counts,
            'total_amount' => $totalAmount,
            'total_orders' => array_sum($counts)
        ];
    }
}
