<?php

namespace Modules\Inventory\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Inventory\Models\Warehouse;

class WarehouseFactory extends Factory
{
    protected $model = Warehouse::class;

    public function definition(): array
    {
        return [
            'code'         => 'WH-' . strtoupper($this->faker->unique()->bothify('??##')),
            'name'         => $this->faker->company() . ' Warehouse',
            'address'      => $this->faker->address(),
            'manager_name' => $this->faker->name(),
            'is_active'    => true,
        ];
    }
}
