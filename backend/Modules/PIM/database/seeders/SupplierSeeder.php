<?php

namespace Modules\PIM\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\PIM\Models\Supplier;

class SupplierSeeder extends Seeder
{
    public function run(): void
    {
        $suppliers = [
            ['name' => 'TechDistributor Vietnam', 'email' => 'contact@techdist.vn',         'phone' => '+84912345678', 'address' => '123 Nguyen Hue Blvd, District 1, HCMC', 'contact_person' => 'Nguyen Duc Anh', 'is_active' => true],
            ['name' => 'Fashion Wholesale Ltd',   'email' => 'sales@fashionwholesale.com',  'phone' => '+84213456789', 'address' => '456 Dong Khoi St, District 1, HCMC',   'contact_person' => 'Tran Thi Hoa',   'is_active' => true],
            ['name' => 'Electronics Importer Co', 'email' => 'procurement@eimporter.com',   'phone' => '+84234567890', 'address' => '789 Ba Trieu St, Hoan Kiem, Hanoi',    'contact_person' => 'Le Van Tuan',    'is_active' => true],
            ['name' => 'Premium Brands Asia',     'email' => 'ops@premiumbrands.asia',      'phone' => '+65612345678', 'address' => 'Singapore Regional Hub',               'contact_person' => 'David Tan',      'is_active' => true],
            ['name' => 'Direct Manufacturer',     'email' => 'supply@directmfg.com',        'phone' => '+60187654321', 'address' => 'Kuala Lumpur, Malaysia',               'contact_person' => 'Ahmad Hassan',   'is_active' => true],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::updateOrCreate(['email' => $supplier['email']], $supplier);
        }
    }
}
