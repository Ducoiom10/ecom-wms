<?php

namespace Database\Seeders;

use Modules\PIM\app\Models\PurchaseOrder;
use Modules\PIM\app\Models\PurchaseOrderItem;
use Modules\PIM\app\Models\Supplier;
use Modules\Catalog\app\Models\Product;
use Modules\Inventory\app\Models\Warehouse;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PurchaseOrderSeeder extends Seeder
{
    /**
     * Run the database seeders
     */
    public function run(): void
    {
        $suppliers = Supplier::all();
        $products = Product::all();
        $warehouse = Warehouse::first();
        $admin = User::where('role', 'admin')->first();

        if ($suppliers->isEmpty() || $products->isEmpty() || !$warehouse || !$admin) {
            $this->command->warn('⚠️ Cannot seed purchase orders: Missing suppliers, products, warehouse, or admin user');
            return;
        }

        $purchaseOrders = [
            // PO 1: Pending approval
            [
                'code' => 'PO-' . Str::upper(Str::random(8)),
                'supplier_id' => $suppliers->random()->id,
                'warehouse_id' => $warehouse->id,
                'status' => 'pending',
                'total_amount' => 0, // Will be calculated
                'expected_delivery_date' => now()->addDays(7),
                'created_by' => $admin->id,
                'approved_by' => null,
                'notes' => 'Initial purchase order for inventory replenishment',
                'items' => [
                    ['product_id' => $products->random()->id, 'quantity' => 50, 'unit_price' => 150.00],
                    ['product_id' => $products->random()->id, 'quantity' => 30, 'unit_price' => 200.00]
                ]
            ],
            // PO 2: Approved
            [
                'code' => 'PO-' . Str::upper(Str::random(8)),
                'supplier_id' => $suppliers->random()->id,
                'warehouse_id' => $warehouse->id,
                'status' => 'approved',
                'total_amount' => 0,
                'expected_delivery_date' => now()->addDays(5),
                'created_by' => $admin->id,
                'approved_by' => $admin->id,
                'notes' => 'Approved order for electronics',
                'items' => [
                    ['product_id' => $products->random()->id, 'quantity' => 100, 'unit_price' => 350.00],
                    ['product_id' => $products->random()->id, 'quantity' => 20, 'unit_price' => 450.00],
                    ['product_id' => $products->random()->id, 'quantity' => 15, 'unit_price' => 600.00]
                ]
            ],
            // PO 3: Partially received
            [
                'code' => 'PO-' . Str::upper(Str::random(8)),
                'supplier_id' => $suppliers->random()->id,
                'warehouse_id' => $warehouse->id,
                'status' => 'partial',
                'total_amount' => 0,
                'expected_delivery_date' => now()->subDays(2),
                'actual_delivery_date' => now()->subDays(2),
                'created_by' => $admin->id,
                'approved_by' => $admin->id,
                'notes' => 'Partially received - waiting for remaining items',
                'items' => [
                    ['product_id' => $products->random()->id, 'quantity' => 40, 'unit_price' => 180.00],
                    ['product_id' => $products->random()->id, 'quantity' => 25, 'unit_price' => 220.00]
                ]
            ],
            // PO 4: Completed
            [
                'code' => 'PO-' . Str::upper(Str::random(8)),
                'supplier_id' => $suppliers->random()->id,
                'warehouse_id' => $warehouse->id,
                'status' => 'completed',
                'total_amount' => 0,
                'expected_delivery_date' => now()->subDays(10),
                'actual_delivery_date' => now()->subDays(9),
                'created_by' => $admin->id,
                'approved_by' => $admin->id,
                'notes' => 'Completed and received',
                'items' => [
                    ['product_id' => $products->random()->id, 'quantity' => 60, 'unit_price' => 175.00],
                    ['product_id' => $products->random()->id, 'quantity' => 35, 'unit_price' => 240.00],
                    ['product_id' => $products->random()->id, 'quantity' => 20, 'unit_price' => 310.00]
                ]
            ]
        ];

        foreach ($purchaseOrders as $poData) {
            $itemsData = $poData['items'];
            unset($poData['items']);

            // Calculate total
            $total = 0;
            foreach ($itemsData as $item) {
                $total += $item['quantity'] * $item['unit_price'];
            }
            $poData['total_amount'] = $total;

            // Create PO
            $po = PurchaseOrder::create($poData);

            // Create items
            foreach ($itemsData as $itemData) {
                $received = 0;

                // If PO is partial or completed, set received_quantity
                if ($po->status === 'partial') {
                    $received = intval($itemData['quantity'] * 0.6); // 60% received
                } elseif ($po->status === 'completed') {
                    $received = $itemData['quantity']; // 100% received
                }

                PurchaseOrderItem::create([
                    'po_id' => $po->id,
                    'product_id' => $itemData['product_id'],
                    'quantity' => $itemData['quantity'],
                    'unit_price' => $itemData['unit_price'],
                    'received_quantity' => $received
                ]);
            }
        }

        $this->command->info('✅ ' . count($purchaseOrders) . ' purchase orders seeded successfully');
    }
}
