<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\WarehouseLocation;

class StockSeeder extends Seeder
{
    public function run(): void
    {
        // Get warehouse locations for assigning stocks
        $locations = WarehouseLocation::all();

        if ($locations->isEmpty()) {
            return; // No locations, skip seeding
        }

        $stocks = [
            // MacBook Pro at Hanoi warehouse (locations 1-2)
            ['product_id' => 1, 'location_index' => 0, 'quantity' => 50],
            ['product_id' => 1, 'location_index' => 1, 'quantity' => 30],

            // Dell XPS at Hanoi warehouse (location 2)
            ['product_id' => 2, 'location_index' => 2, 'quantity' => 25],

            // iPhone 16 Pro at HCMC warehouse (locations 4-5)
            ['product_id' => 3, 'location_index' => 4, 'quantity' => 100],
            ['product_id' => 3, 'location_index' => 5, 'quantity' => 80],

            // Samsung Galaxy at HCMC (location 6)
            ['product_id' => 4, 'location_index' => 6, 'quantity' => 120],

            // T-Shirts distributed (locations 0, 5)
            ['product_id' => 5, 'location_index' => 0, 'quantity' => 500],
            ['product_id' => 5, 'location_index' => 5, 'quantity' => 300],

            // Jeans (locations 1, 6)
            ['product_id' => 6, 'location_index' => 1, 'quantity' => 200],
            ['product_id' => 6, 'location_index' => 6, 'quantity' => 150],
        ];

        foreach ($stocks as $stock) {
            if (isset($locations[$stock['location_index']])) {
                Stock::updateOrCreate(
                    [
                        'product_id' => $stock['product_id'],
                        'warehouse_location_id' => $locations[$stock['location_index']]->id
                    ],
                    [
                        'quantity' => $stock['quantity'],
                        'reserved_quantity' => 0,
                    ]
                );
            }
        }
    }
}
