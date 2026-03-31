<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Catalog\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Electronics', 'slug' => 'electronics', 'parent_id' => null],
            ['name' => 'Laptops', 'slug' => 'laptops', 'parent_id' => 1],
            ['name' => 'Smartphones', 'slug' => 'smartphones', 'parent_id' => 1],
            ['name' => 'Fashion', 'slug' => 'fashion', 'parent_id' => null],
            ['name' => 'Men Clothing', 'slug' => 'men-clothing', 'parent_id' => 4],
            ['name' => 'Women Clothing', 'slug' => 'women-clothing', 'parent_id' => 4],
            ['name' => 'Home & Garden', 'slug' => 'home-garden', 'parent_id' => null],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
