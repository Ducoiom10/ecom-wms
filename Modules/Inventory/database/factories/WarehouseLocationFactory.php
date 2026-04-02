<?php

namespace Modules\Inventory\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Inventory\Models\Warehouse;
use Modules\Inventory\Models\WarehouseLocation;

class WarehouseLocationFactory extends Factory
{
    protected $model = WarehouseLocation::class;

    public function definition(): array
    {
        return [
            'warehouse_id' => Warehouse::factory(),
            'aisle'        => strtoupper($this->faker->randomLetter()),
            'rack'         => $this->faker->numerify('##'),
            'level'        => $this->faker->numerify('##'),
            'bin'          => $this->faker->numerify('##'),
            'barcode'      => 'LOC-' . strtoupper($this->faker->unique()->bothify('??####')),
            'is_active'    => true,
        ];
    }
}
