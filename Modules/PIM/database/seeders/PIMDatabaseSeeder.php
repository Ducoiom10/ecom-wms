<?php

namespace Modules\PIM\Database\Seeders;

use Illuminate\Database\Seeder;

class PIMDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SupplierSeeder::class,
            PurchaseOrderSeeder::class,
            GoodsReceiptNoteSeeder::class,
        ]);
    }
}
