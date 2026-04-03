<?php

namespace Modules\Inventory\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Inventory\Models\Warehouse;

class WarehouseSeeder extends Seeder
{
    public function run(): void
    {
        $warehouses = [
            ['code' => 'WH-HN-001',      'name' => 'Hanoi Main Warehouse',      'address' => '123 Le Loi Street, Hanoi',       'manager_name' => 'Nguyen Van A', 'is_active' => true],
            ['code' => 'WH-SG-001',      'name' => 'Ho Chi Minh City Warehouse', 'address' => '456 Nguyen Hue Blvd, HCMC',     'manager_name' => 'Tran Thi B',   'is_active' => true],
            ['code' => 'WH-HCM-BACKUP',  'name' => 'HCM Backup Warehouse',      'address' => '789 District 7, HCMC',           'manager_name' => 'Le Van C',     'is_active' => true],
        ];

        foreach ($warehouses as $warehouse) {
            Warehouse::updateOrCreate(['code' => $warehouse['code']], $warehouse);
        }
    }
}
