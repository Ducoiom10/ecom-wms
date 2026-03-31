<?php

namespace Modules\PIM\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\Catalog\Models\Product;
use Modules\Inventory\Models\Warehouse;
use Modules\PIM\Models\PurchaseOrder;
use Modules\PIM\Models\PurchaseOrderItem;
use Modules\PIM\Models\Supplier;

class PurchaseOrderSeeder extends Seeder
{
    public function run(): void
    {
        $suppliers = Supplier::all();
        $products  = Product::all();
        $warehouse = Warehouse::first();
        $admin     = User::where('role', 'admin')->first();

        if ($suppliers->isEmpty() || $products->isEmpty() || !$warehouse || !$admin) {
            $this->command->warn('⚠️ Missing suppliers, products, warehouse, or admin user');
            return;
        }

        $orders = [
            ['status' => 'pending',    'notes' => 'Initial replenishment',          'approved_by' => null,       'days' => 7,   'items' => [[50, 150.00], [30, 200.00]]],
            ['status' => 'approved',   'notes' => 'Approved order for electronics', 'approved_by' => $admin->id, 'days' => 5,   'items' => [[100, 350.00], [20, 450.00], [15, 600.00]]],
            ['status' => 'partial',    'notes' => 'Partially received',             'approved_by' => $admin->id, 'days' => -2,  'items' => [[40, 180.00], [25, 220.00]]],
            ['status' => 'completed',  'notes' => 'Completed and received',         'approved_by' => $admin->id, 'days' => -10, 'items' => [[60, 175.00], [35, 240.00], [20, 310.00]]],
        ];

        foreach ($orders as $orderData) {
            $itemsData = $orderData['items'];
            $total = array_sum(array_map(fn($i) => $i[0] * $i[1], $itemsData));

            $po = PurchaseOrder::create([
                'code'                   => 'PO-' . Str::upper(Str::random(8)),
                'supplier_id'            => $suppliers->random()->id,
                'warehouse_id'           => $warehouse->id,
                'status'                 => $orderData['status'],
                'total_amount'           => $total,
                'expected_delivery_date' => now()->addDays($orderData['days']),
                'actual_delivery_date'   => $orderData['days'] < 0 ? now()->addDays($orderData['days'] + 1) : null,
                'created_by'             => $admin->id,
                'approved_by'            => $orderData['approved_by'],
                'notes'                  => $orderData['notes'],
            ]);

            foreach ($itemsData as [$qty, $price]) {
                $received = match ($po->status) {
                    'partial'   => intval($qty * 0.6),
                    'completed' => $qty,
                    default     => 0,
                };

                PurchaseOrderItem::create([
                    'po_id'             => $po->id,
                    'product_id'        => $products->random()->id,
                    'quantity'          => $qty,
                    'unit_price'        => $price,
                    'received_quantity' => $received,
                ]);
            }
        }
    }
}
