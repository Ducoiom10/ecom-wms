<?php

namespace Modules\Inventory\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\WarehouseLocation;

class StockSeeder extends Seeder
{
    public function run(): void
    {
        $locations = WarehouseLocation::all();

        if ($locations->isEmpty()) {
            return;
        }

        $stocks = [
            ['product_id' => 1, 'location_index' => 0, 'quantity' => 50],
            ['product_id' => 1, 'location_index' => 1, 'quantity' => 30],
            ['product_id' => 2, 'location_index' => 2, 'quantity' => 25],
            ['product_id' => 3, 'location_index' => 4, 'quantity' => 100],
            ['product_id' => 3, 'location_index' => 5, 'quantity' => 80],
            ['product_id' => 4, 'location_index' => 6, 'quantity' => 120],
            ['product_id' => 5, 'location_index' => 0, 'quantity' => 500],
            ['product_id' => 5, 'location_index' => 5, 'quantity' => 300],
            ['product_id' => 6, 'location_index' => 1, 'quantity' => 200],
            ['product_id' => 6, 'location_index' => 6, 'quantity' => 150],
        ];

        foreach ($stocks as $stock) {
            if (isset($locations[$stock['location_index']])) {
                Stock::updateOrCreate(
                    ['product_id' => $stock['product_id'], 'warehouse_location_id' => $locations[$stock['location_index']]->id],
                    ['quantity' => $stock['quantity'], 'reserved_quantity' => 0]
                );
            }
        }
    }
}
