<?php

namespace Modules\Catalog\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Catalog\Models\Category;
use Modules\Catalog\Models\Product;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true);

        return [
            'name'        => ucwords($name),
            'slug'        => \Illuminate\Support\Str::slug($name) . '-' . $this->faker->unique()->numberBetween(1, 9999),
            'sku'         => 'SKU-' . strtoupper($this->faker->unique()->bothify('??####')),
            'description' => $this->faker->paragraph(),
            'price'       => $this->faker->randomFloat(2, 10, 5000),
            'category_id' => Category::factory(),
            'brand_id'    => null,
            'is_active'   => true,
        ];
    }
}
