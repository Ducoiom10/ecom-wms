<?php

namespace Modules\PIM\app\Services;

use App\Core\Services\BaseService;
use Modules\PIM\app\Models\GoodsReceiptNote;
use Modules\PIM\app\Models\GRNItem;
use Modules\PIM\app\Repositories\GoodsReceiptNoteRepository;
use Modules\PIM\app\Repositories\PurchaseOrderRepository;
use Exception;
use Illuminate\Support\Str;

class GoodsReceiptService extends BaseService
{
    protected GoodsReceiptNoteRepository $grnRepository;
    protected PurchaseOrderRepository $poRepository;

    /**
     * Constructor
     */
    public function __construct(
        GoodsReceiptNoteRepository $grnRepository,
        PurchaseOrderRepository $poRepository
    ) {
        $this->grnRepository = $grnRepository;
        $this->poRepository = $poRepository;
    }

    /**
     * Create a goods receipt note for a purchase order
     */
    public function createGoodsReceiptNote(int $poId, array $data = []): GoodsReceiptNote
    {
        return $this->executeInTransaction(function () use ($poId, $data) {
            $po = $this->poRepository->findById($poId);

            if (!$po) {
                throw new Exception("Purchase order with ID {$poId} not found");
            }

            if ($po->status === 'cancelled') {
                throw new Exception("Cannot create GRN for cancelled purchase order");
            }

            // Create the GRN
            $grnData = array_merge([
                'code' => 'GRN-' . Str::upper(Str::random(8)),
                'po_id' => $poId,
                'warehouse_id' => $po->warehouse_id,
                'status' => 'pending',
                'receipt_date' => now(),
                'created_by' => auth()->id()
            ], $data);

            $grn = $this->grnRepository->create($grnData);

            // Create GRN items from PO items
            foreach ($po->purchaseOrderItems as $poItem) {
                GRNItem::create([
                    'grn_id' => $grn->id,
                    'po_item_id' => $poItem->id,
                    'quantity_received' => 0,
                    'quality_check_status' => 'pending_check'
                ]);
            }

            $this->logSuccess('Goods receipt note created', [
                'grn_id' => $grn->id,
                'grn_code' => $grn->code,
                'po_id' => $poId,
                'items_count' => $po->purchaseOrderItems()->count()
            ]);

            return $grn;
        });
    }

    /**
     * Receive items into GRN
     */
    public function receiveItem(
        int $grnItemId,
        int $quantityReceived,
        string $batchNumber = null,
        int $locationId = null
    ): GRNItem {
        return $this->executeInTransaction(function () use ($grnItemId, $quantityReceived, $batchNumber, $locationId) {
            $grnItem = GRNItem::find($grnItemId);

            if (!$grnItem) {
                throw new Exception("GRN item with ID {$grnItemId} not found");
            }

            $poItem = $grnItem->purchaseOrderItem;

            // Validate quantity
            if ($quantityReceived > $poItem->quantity) {
                throw new Exception("Received quantity cannot exceed ordered quantity");
            }

            // Update GRN item
            $grnItem->update([
                'quantity_received' => $quantityReceived,
                'batch_number' => $batchNumber,
                'location_id' => $locationId
            ]);

            // Update PO item received quantity
            $poItem->increment('received_quantity', $quantityReceived);

            $this->logSuccess('Item received', [
                'grn_item_id' => $grnItemId,
                'quantity_received' => $quantityReceived,
                'batch_number' => $batchNumber,
                'location_id' => $locationId
            ]);

            return $grnItem;
        });
    }

    /**
     * Validate quality check for GRN item
     */
    public function validateQualityCheck(int $grnItemId, string $status, string $notes = null): GRNItem
    {
        return $this->executeInTransaction(function () use ($grnItemId, $status, $notes) {
            if (!in_array($status, ['passed', 'failed', 'pending_check'])) {
                throw new Exception("Invalid quality check status: {$status}");
            }

            $grnItem = GRNItem::find($grnItemId);

            if (!$grnItem) {
                throw new Exception("GRN item with ID {$grnItemId} not found");
            }

            $updateData = ['quality_check_status' => $status];
            if ($notes) {
                $updateData['notes'] = $notes;
            }

            $grnItem->update($updateData);

            $this->logSuccess('Quality check performed', [
                'grn_item_id' => $grnItemId,
                'status' => $status,
                'notes' => $notes
            ]);

            return $grnItem;
        });
    }

    /**
     * Complete a goods receipt note
     */
    public function completeGoodsReceiptNote(int $grnId): GoodsReceiptNote
    {
        return $this->executeInTransaction(function () use ($grnId) {
            $grn = $this->grnRepository->findById($grnId);

            if (!$grn) {
                throw new Exception("Goods receipt note with ID {$grnId} not found");
            }

            // Validate all items have been received
            $pendingItems = GRNItem::where('grn_id', $grnId)
                ->where('quantity_received', 0)
                ->count();

            if ($pendingItems > 0) {
                throw new Exception("Cannot complete GRN with pending items");
            }

            // Validate all items passed quality check
            $failedItems = GRNItem::where('grn_id', $grnId)
                ->where('quality_check_status', 'failed')
                ->count();

            if ($failedItems > 0) {
                throw new Exception("Cannot complete GRN with failed quality items. Please create return note.");
            }

            $this->grnRepository->update($grnId, ['status' => 'completed']);

            // Update related stock inventory (trigger event)
            event(new \Modules\PIM\Events\GoodsReceiptCompleted($grn));

            $this->logSuccess('Goods receipt note completed', [
                'grn_id' => $grnId,
                'grn_code' => $grn->code
            ]);

            return $this->grnRepository->findById($grnId);
        });
    }

    /**
     * Mark GRN as partially received
     */
    public function markAsPartiallyReceived(int $grnId): GoodsReceiptNote
    {
        return $this->executeInTransaction(function () use ($grnId) {
            $grn = $this->grnRepository->findById($grnId);

            if (!$grn) {
                throw new Exception("Goods receipt note with ID {$grnId} not found");
            }

            $receivedCount = GRNItem::where('grn_id', $grnId)
                ->where('quantity_received', '>', 0)
                ->count();

            if ($receivedCount === 0) {
                throw new Exception("No items have been received yet");
            }

            $this->grnRepository->update($grnId, ['status' => 'partial']);

            $this->logSuccess('GRN marked as partially received', ['grn_id' => $grnId]);

            return $this->grnRepository->findById($grnId);
        });
    }

    /**
     * Cancel a goods receipt note
     */
    public function cancelGoodsReceiptNote(int $grnId, string $reason = null): GoodsReceiptNote
    {
        return $this->executeInTransaction(function () use ($grnId, $reason) {
            $grn = $this->grnRepository->findById($grnId);

            if (!$grn) {
                throw new Exception("Goods receipt note with ID {$grnId} not found");
            }

            if ($grn->status === 'completed') {
                throw new Exception("Cannot cancel completed goods receipt note");
            }

            $updateData = ['status' => 'cancelled'];
            if ($reason) {
                $updateData['notes'] = ($grn->notes ?? '') . "\nCancellation reason: {$reason}";
            }

            $this->grnRepository->update($grnId, $updateData);

            // Reset received quantities
            GRNItem::where('grn_id', $grnId)->update(['quantity_received' => 0]);

            $this->logSuccess('Goods receipt note cancelled', [
                'grn_id' => $grnId,
                'reason' => $reason
            ]);

            return $this->grnRepository->findById($grnId);
        });
    }

    /**
     * Get GRN details
     */
    public function getGoodsReceiptDetails(int $id): ?GoodsReceiptNote
    {
        return $this->grnRepository->findWithRelations($id);
    }

    /**
     * Get GRNs with discrepancies
     */
    public function getDiscrepancies(): array
    {
        return $this->grnRepository->getWithDiscrepancies()
            ->map(fn($grn) => [
                'grn_id' => $grn->id,
                'grn_code' => $grn->code,
                'po_code' => $grn->purchaseOrder->code,
                'supplier' => $grn->purchaseOrder->supplier->name,
                'failed_items_count' => $grn->grnItems()
                    ->where('quality_check_status', 'failed')
                    ->count()
            ])
            ->toArray();
    }

    /**
     * Get GRNs pending quality check
     */
    public function getPendingQualityCheck(): array
    {
        return $this->grnRepository->getPendingQualityCheck()
            ->map(fn($grn) => [
                'grn_id' => $grn->id,
                'grn_code' => $grn->code,
                'items_pending' => $grn->grnItems()
                    ->where('quality_check_status', 'pending_check')
                    ->count(),
                'created_at' => $grn->created_at
            ])
            ->toArray();
    }
}
