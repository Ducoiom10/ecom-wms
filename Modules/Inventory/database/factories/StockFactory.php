<?php

namespace Modules\Inventory\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Catalog\Models\Product;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\WarehouseLocation;

class StockFactory extends Factory
{
    protected $model = Stock::class;

    public function definition(): array
    {
        return [
            'product_id'           => Product::factory(),
            'warehouse_location_id' => WarehouseLocation::factory(),
            'quantity'             => $this->faker->numberBetween(0, 500),
            'reserved_quantity'    => 0,
        ];
    }
}
