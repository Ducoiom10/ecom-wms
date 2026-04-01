<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\Catalog\Database\Seeders\CatalogDatabaseSeeder;
use Modules\Inventory\Database\Seeders\InventoryDatabaseSeeder;
use Modules\PIM\Database\Seeders\PIMDatabaseSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@ecom-wms.local'],
            ['name' => 'Admin User', 'password' => Hash::make('password'), 'role' => 'admin', 'is_active' => true]
        );

        User::updateOrCreate(
            ['email' => 'customer@ecom-wms.local'],
            ['name' => 'Customer User', 'password' => Hash::make('password'), 'role' => 'customer', 'is_active' => true]
        );

        $this->call([
            CatalogDatabaseSeeder::class,
            InventoryDatabaseSeeder::class,
            PIMDatabaseSeeder::class,
            RBACSeeder::class,
        ]);
    }
}
