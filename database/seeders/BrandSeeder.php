<?php

namespace Database\Seeders;

use Modules\Catalog\app\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeders
     */
    public function run(): void
    {
        $brands = [
            [
                'name' => 'Apple',
                'logo_url' => 'https://example.com/logos/apple.png',
                'description' => 'Premium technology and consumer electronics company',
                'is_active' => true
            ],
            [
                'name' => 'Samsung',
                'logo_url' => 'https://example.com/logos/samsung.png',
                'description' => 'Global leader in electronics and technology',
                'is_active' => true
            ],
            [
                'name' => 'Nike',
                'logo_url' => 'https://example.com/logos/nike.png',
                'description' => 'Sportswear and athletic equipment manufacturer',
                'is_active' => true
            ],
            [
                'name' => 'Adidas',
                'logo_url' => 'https://example.com/logos/adidas.png',
                'description' => 'Sports apparel and footwear brand',
                'is_active' => true
            ],
            [
                'name' => 'Sony',
                'logo_url' => 'https://example.com/logos/sony.png',
                'description' => 'Electronics, gaming and entertainment company',
                'is_active' => true
            ],
            [
                'name' => 'LG',
                'logo_url' => 'https://example.com/logos/lg.png',
                'description' => 'Electronics and home appliances manufacturer',
                'is_active' => true
            ],
            [
                'name' => 'Dell',
                'logo_url' => 'https://example.com/logos/dell.png',
                'description' => 'Computer hardware and IT solutions provider',
                'is_active' => true
            ],
            [
                'name' => 'HP',
                'logo_url' => 'https://example.com/logos/hp.png',
                'description' => 'Computing and printing technology company',
                'is_active' => true
            ],
            [
                'name' => 'Canon',
                'logo_url' => 'https://example.com/logos/canon.png',
                'description' => 'Photography and imaging equipment manufacturer',
                'is_active' => true
            ],
            [
                'name' => 'Nikon',
                'logo_url' => 'https://example.com/logos/nikon.png',
                'description' => 'Precision optics and imaging products',
                'is_active' => true
            ]
        ];

        foreach ($brands as $brand) {
            Brand::updateOrCreate(
                ['name' => $brand['name']],
                $brand
            );
        }

        $this->command->info('✅ ' . count($brands) . ' brands seeded successfully');
    }
}
