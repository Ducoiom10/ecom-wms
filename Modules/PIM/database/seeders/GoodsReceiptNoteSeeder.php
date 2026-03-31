<?php

namespace Modules\PIM\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\Inventory\Models\WarehouseLocation;
use Modules\PIM\Models\GoodsReceiptNote;
use Modules\PIM\Models\GRNItem;
use Modules\PIM\Models\PurchaseOrder;

class GoodsReceiptNoteSeeder extends Seeder
{
    public function run(): void
    {
        $admin     = User::where('role', 'admin')->first();
        $locations = WarehouseLocation::all();

        if (!$admin || $locations->isEmpty()) {
            $this->command->warn('⚠️ Missing admin user or warehouse locations');
            return;
        }

        $purchaseOrders = PurchaseOrder::whereIn('status', ['approved', 'partial', 'completed'])->limit(3)->get();

        if ($purchaseOrders->isEmpty()) {
            $this->command->warn('⚠️ No approved purchase orders found');
            return;
        }

        foreach ($purchaseOrders as $po) {
            $grn = GoodsReceiptNote::create([
                'code'         => 'GRN-' . Str::upper(Str::random(8)),
                'po_id'        => $po->id,
                'warehouse_id' => $po->warehouse_id,
                'status'       => $po->status === 'partial' ? 'partial' : 'completed',
                'receipt_date' => $po->status === 'partial' ? now()->subDays(2) : now()->subDays(5),
                'created_by'   => $admin->id,
                'notes'        => 'Goods receipt for PO ' . $po->code,
            ]);

            foreach ($po->items as $poItem) {
                $received = $po->status === 'partial' ? intval($poItem->quantity * 0.6) : $poItem->quantity;

                GRNItem::create([
                    'grn_id'               => $grn->id,
                    'po_item_id'           => $poItem->id,
                    'quantity_received'    => $received,
                    'quality_check_status' => $received > 0 ? 'passed' : 'pending_check',
                    'batch_number'         => 'BATCH-' . Str::upper(Str::random(6)),
                    'expiry_date'          => now()->addMonths(12),
                    'location_id'          => $locations->random()->id,
                ]);
            }
        }
    }
}
