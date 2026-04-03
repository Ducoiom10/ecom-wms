<?php

namespace Modules\WMS\Services;

use App\Core\Services\BaseService;
use Illuminate\Support\Facades\DB;
use Modules\Inventory\Models\InventoryBatch;
use Modules\WMS\Iterators\PickListIterator;
use Modules\WMS\Models\PickList;
use Modules\WMS\Models\PickListItem;
use Exception;

class PickListGenerator extends BaseService
{
    /**
     * Generate a pick list for an order using FIFO batch locations.
     * $order must have: id, warehouse_id, items (collection with product_id, quantity).
     */
    public function generatePickList(object $order): PickList
    {
        return DB::transaction(function () use ($order) {
            $pickList = PickList::create([
                'order_id'     => $order->id,
                'warehouse_id' => $order->warehouse_id,
                'status'       => PickList::STATUS_PENDING,
            ]);

            foreach ($order->items as $item) {
                // lockForUpdate: ngăn reserveStock đồng thời deduct batch này
                // trước khi PickListItem được tạo xong.
                $batch = InventoryBatch::where('product_id', $item->product_id)
                    ->where('quantity', '>', 0)
                    ->where(fn($q) => $q->whereNull('expiry_date')->orWhere('expiry_date', '>', now()))
                    ->orderBy('fifo_sequence')
                    ->orderBy('id')
                    ->lockForUpdate()
                    ->first();

                if (!$batch) {
                    throw new Exception("No available batch for product #{$item->product_id}.");
                }

                PickListItem::create([
                    'pick_list_id'      => $pickList->id,
                    'product_id'        => $item->product_id,
                    'quantity_required' => $item->quantity,
                    'quantity_picked'   => 0,
                    'location_id'       => $batch->warehouse_location_id,
                ]);
            }

            return $pickList->load('items.location');
        });
    }

    /**
     * Build optimized picking route for a pick list.
     */
    public function getPickingRoute(PickList $pickList): array
    {
        $iterator = new PickListIterator($pickList);
        $route = $iterator->getRoute();

        return [
            'pick_list_id'   => $pickList->id,
            'status'         => $pickList->status,
            'route'          => $route,
            'total_items'    => count($route),
            'estimated_time' => count($route) * 2, // 2 mins per item
        ];
    }

    /**
     * Mark a pick list item as picked.
     */
    public function markItemPicked(PickListItem $item, int $quantityPicked, int $pickedBy): void
    {
        DB::transaction(function () use ($item, $quantityPicked, $pickedBy) {
            $item->update([
                'quantity_picked' => $quantityPicked,
                'picked_at'       => now(),
                'picked_by'       => $pickedBy,
            ]);

            // Lock pick_list row trước khi check để tránh 2 picker
            // cùng thấy allPicked=false hoặc cùng update completed.
            $pickList = PickList::lockForUpdate()->find($item->pick_list_id);
            $allPicked = $pickList->items()->get()->every(fn($i) => $i->isPicked());

            if ($allPicked) {
                $pickList->update(['status' => PickList::STATUS_COMPLETED]);
            }
        });
    }
}
