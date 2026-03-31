<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default admin user
        User::updateOrCreate(
            ['email' => 'admin@ecom-wms.local'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'is_active' => true,
            ]
        );

        // Create test customer user
        User::updateOrCreate(
            ['email' => 'customer@ecom-wms.local'],
            [
                'name' => 'Customer User',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'is_active' => true,
            ]
        );

        // Seed Catalog module
        $this->call(CategorySeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(BrandSeeder::class);

        // Seed Inventory module
        $this->call(WarehouseSeeder::class);
        $this->call(WarehouseLocationSeeder::class);
        $this->call(StockSeeder::class);

        // Seed PIM & Procurement module (Phase 2)
        $this->call(SupplierSeeder::class);
        $this->call(PurchaseOrderSeeder::class);
        $this->call(GoodsReceiptNoteSeeder::class);
    }
}
