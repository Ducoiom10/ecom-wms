<?php

namespace Database\Seeders;

use Modules\PIM\app\Models\GoodsReceiptNote;
use Modules\PIM\app\Models\GRNItem;
use Modules\PIM\app\Models\PurchaseOrder;
use Modules\PIM\app\Models\PurchaseOrderItem;
use Modules\Inventory\app\Models\WarehouseLocation;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GoodsReceiptNoteSeeder extends Seeder
{
    /**
     * Run the database seeders
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        $locations = WarehouseLocation::all();

        if (!$admin) {
            $this->command->warn('⚠️ Cannot seed GRNs: Missing admin user');
            return;
        }

        if ($locations->isEmpty()) {
            $this->command->warn('⚠️ Cannot seed GRNs: Missing warehouse locations');
            return;
        }

        // Get approved/partial POs
        $purchaseOrders = PurchaseOrder::whereIn('status', ['approved', 'partial', 'completed'])
            ->limit(3)
            ->get();

        if ($purchaseOrders->isEmpty()) {
            $this->command->warn('⚠️ Cannot seed GRNs: No approved purchase orders found');
            return;
        }

        $count = 0;

        foreach ($purchaseOrders as $po) {
            // Create GRN for this PO
            $grn = GoodsReceiptNote::create([
                'code' => 'GRN-' . Str::upper(Str::random(8)),
                'po_id' => $po->id,
                'warehouse_id' => $po->warehouse_id,
                'status' => $po->status === 'partial' ? 'partial' : 'completed',
                'receipt_date' => $po->status === 'partial' ? now()->subDays(2) : now()->subDays(5),
                'created_by' => $admin->id,
                'notes' => 'Goods receipt for PO ' . $po->code
            ]);

            // Create GRN items for each PO item
            foreach ($po->purchaseOrderItems as $poItem) {
                $received = $po->status === 'partial'
                    ? intval($poItem->quantity * 0.6)
                    : $poItem->quantity;

                $location = $locations->random();

                GRNItem::create([
                    'grn_id' => $grn->id,
                    'po_item_id' => $poItem->id,
                    'quantity_received' => $received,
                    'quality_check_status' => $received > 0 ? 'passed' : 'pending_check',
                    'batch_number' => 'BATCH-' . Str::upper(Str::random(6)),
                    'expiry_date' => now()->addMonths(12),
                    'location_id' => $location->id
                ]);
            }

            $count++;
        }

        $this->command->info('✅ ' . $count . ' goods receipt notes seeded successfully');
    }
}
