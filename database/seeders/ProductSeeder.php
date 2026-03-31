<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Catalog\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'MacBook Pro 16"',
                'slug' => 'macbook-pro-16',
                'sku' => 'MBP-16-2024',
                'description' => 'Professional laptop with M4 chip',
                'price' => 3500.00,
                'category_id' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Dell XPS 15',
                'slug' => 'dell-xps-15',
                'sku' => 'DELL-XPS-15',
                'description' => 'High-performance Windows laptop',
                'price' => 2800.00,
                'category_id' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'iPhone 16 Pro',
                'slug' => 'iphone-16-pro',
                'sku' => 'IP16-PRO-256',
                'description' => 'Latest iPhone with A18 processor',
                'price' => 1200.00,
                'category_id' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Samsung Galaxy S24',
                'slug' => 'samsung-galaxy-s24',
                'sku' => 'SGS24-256',
                'description' => 'Premium Android smartphone',
                'price' => 999.00,
                'category_id' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Men T-Shirt',
                'slug' => 'men-tshirt-classic',
                'sku' => 'TSH-MEN-001',
                'description' => 'Classic cotton t-shirt',
                'price' => 25.00,
                'category_id' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Women Jeans',
                'slug' => 'women-jeans-slim',
                'sku' => 'JNS-WMN-001',
                'description' => 'Slim fit denim jeans',
                'price' => 75.00,
                'category_id' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['sku' => $product['sku']],
                $product
            );
        }
    }
}
