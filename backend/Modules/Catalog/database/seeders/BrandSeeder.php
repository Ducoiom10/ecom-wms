<?php

namespace Modules\Catalog\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Catalog\Models\Brand;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            ['name' => 'Apple',   'logo_url' => 'https://example.com/logos/apple.png',   'description' => 'Premium technology and consumer electronics company', 'is_active' => true],
            ['name' => 'Samsung', 'logo_url' => 'https://example.com/logos/samsung.png', 'description' => 'Global leader in electronics and technology',          'is_active' => true],
            ['name' => 'Nike',    'logo_url' => 'https://example.com/logos/nike.png',    'description' => 'Sportswear and athletic equipment manufacturer',        'is_active' => true],
            ['name' => 'Adidas',  'logo_url' => 'https://example.com/logos/adidas.png',  'description' => 'Sports apparel and footwear brand',                    'is_active' => true],
            ['name' => 'Sony',    'logo_url' => 'https://example.com/logos/sony.png',    'description' => 'Electronics, gaming and entertainment company',         'is_active' => true],
            ['name' => 'Dell',    'logo_url' => 'https://example.com/logos/dell.png',    'description' => 'Computer hardware and IT solutions provider',           'is_active' => true],
        ];

        foreach ($brands as $brand) {
            Brand::updateOrCreate(['name' => $brand['name']], $brand);
        }
    }
}
