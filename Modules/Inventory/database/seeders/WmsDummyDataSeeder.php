<?php

namespace Modules\Inventory\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Inventory\Models\Warehouse;
use Modules\Inventory\Models\WarehouseLocation;
use Modules\Inventory\Models\Stock;
use Modules\Catalog\Models\Category;
use Modules\Catalog\Models\Product;

class WmsDummyDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. TẠO KHO HÀNG
        $warehouse = Warehouse::create([
            'code' => 'HN-01',
            'name' => 'Kho Tổng Hà Nội',
            'address' => 'KCN Từ Liêm, Hà Nội',
            'manager_name' => 'Nguyễn Văn A',
        ]);

        // 2. TẠO VỊ TRÍ TRONG KHO (Chia làm 2 ô trên cùng 1 kệ)
        $location1 = WarehouseLocation::create([
            'warehouse_id' => $warehouse->id,
            'aisle' => 'A1',
            'rack' => 'R01',
            'level' => 'L01',
            'bin' => 'B01',
            'barcode' => 'HN01-A1-R01-L01-B01',
        ]);

        $location2 = WarehouseLocation::create([
            'warehouse_id' => $warehouse->id,
            'aisle' => 'A1',
            'rack' => 'R01',
            'level' => 'L01',
            'bin' => 'B02',
            'barcode' => 'HN01-A1-R01-L01-B02',
        ]);

        // 3. TẠO DANH MỤC SẢN PHẨM
        $category = Category::create([
            'name' => 'Điện thoại thông minh',
            'slug' => 'dien-thoai-thong-minh',
        ]);

        // 4. TẠO SẢN PHẨM MỚI
        $product = Product::create([
            'name' => 'iPhone 15 Pro Max 256GB',
            'slug' => 'iphone-15-pro-max-256gb',
            'sku' => 'IP15-PM-256-BLK',
            'description' => 'Điện thoại Apple nguyên seal',
            'price' => 30000000,
            'category_id' => $category->id,
        ]);

        // 5. NHẬP KHO (Đưa sản phẩm vào các vị trí đã tạo)
        Stock::create([
            'product_id' => $product->id,
            'warehouse_location_id' => $location1->id,
            'quantity' => 50,
            'reserved_quantity' => 0,
        ]);

        Stock::create([
            'product_id' => $product->id,
            'warehouse_location_id' => $location2->id,
            'quantity' => 20,
            'reserved_quantity' => 5,
        ]);
    }
}
