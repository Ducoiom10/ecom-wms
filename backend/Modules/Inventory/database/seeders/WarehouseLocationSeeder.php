<?php

namespace Modules\Inventory\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Inventory\Models\WarehouseLocation;

class WarehouseLocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            ['warehouse_id' => 1, 'aisle' => 'A', 'rack' => '01', 'level' => '01', 'bin' => '01', 'barcode' => 'HN01-A-01-01-01', 'is_active' => true],
            ['warehouse_id' => 1, 'aisle' => 'A', 'rack' => '01', 'level' => '02', 'bin' => '01', 'barcode' => 'HN01-A-01-02-01', 'is_active' => true],
            ['warehouse_id' => 1, 'aisle' => 'A', 'rack' => '02', 'level' => '01', 'bin' => '01', 'barcode' => 'HN01-A-02-01-01', 'is_active' => true],
            ['warehouse_id' => 1, 'aisle' => 'B', 'rack' => '01', 'level' => '01', 'bin' => '01', 'barcode' => 'HN01-B-01-01-01', 'is_active' => true],
            ['warehouse_id' => 2, 'aisle' => 'A', 'rack' => '01', 'level' => '01', 'bin' => '01', 'barcode' => 'SG01-A-01-01-01', 'is_active' => true],
            ['warehouse_id' => 2, 'aisle' => 'A', 'rack' => '01', 'level' => '02', 'bin' => '01', 'barcode' => 'SG01-A-01-02-01', 'is_active' => true],
            ['warehouse_id' => 2, 'aisle' => 'C', 'rack' => '01', 'level' => '01', 'bin' => '01', 'barcode' => 'SG01-C-01-01-01', 'is_active' => true],
            ['warehouse_id' => 3, 'aisle' => 'R', 'rack' => '01', 'level' => '01', 'bin' => '01', 'barcode' => 'HCB-R-01-01-01',  'is_active' => true],
            ['warehouse_id' => 3, 'aisle' => 'R', 'rack' => '02', 'level' => '01', 'bin' => '01', 'barcode' => 'HCB-R-02-01-01',  'is_active' => true],
        ];

        foreach ($locations as $location) {
            WarehouseLocation::updateOrCreate(
                ['barcode' => $location['barcode']],
                $location
            );
        }
    }
}
