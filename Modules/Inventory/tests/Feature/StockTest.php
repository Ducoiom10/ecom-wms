<?php

use Modules\Inventory\Actions\AdjustStock;
use Modules\Inventory\Actions\DeductStock;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\Warehouse;
use Modules\Inventory\Models\WarehouseLocation;
use Modules\Catalog\Models\Category;
use Modules\Catalog\Models\Product;

function makeStockFixture(int $qty = 100): Stock
{
    $category = Category::firstOrCreate(
        ['slug' => 'inv-test-cat'],
        ['name' => 'Inventory Test Cat']
    );

    $product = Product::create([
        'name'        => 'Inv Product ' . uniqid(),
        'slug'        => 'inv-prod-' . uniqid(),
        'sku'         => 'INV-' . uniqid(),
        'price'       => 10.0,
        'category_id' => $category->id,
        'is_active'   => true,
    ]);

    $warehouse = Warehouse::firstOrCreate(
        ['code' => 'WH-INV-TEST'],
        ['name' => 'Inv Test WH', 'address' => 'Test', 'manager_name' => 'Test']
    );

    $location = WarehouseLocation::firstOrCreate(
        ['barcode' => 'LOC-INV-TEST'],
        ['warehouse_id' => $warehouse->id, 'aisle' => 'B', 'rack' => '01', 'level' => '01', 'bin' => '01']
    );

    return Stock::create([
        'product_id'            => $product->id,
        'warehouse_location_id' => $location->id,
        'quantity'              => $qty,
        'reserved_quantity'     => 0,
    ]);
}

test('adjust stock action increases quantity', function () {
    $stock  = makeStockFixture(50);
    $action = new AdjustStock();

    $updated = $action($stock->id, 20, 'manual restock');

    expect($updated->quantity)->toBe(70);
});

test('adjust stock action decreases quantity', function () {
    $stock  = makeStockFixture(50);
    $action = new AdjustStock();

    $updated = $action($stock->id, -10, 'damaged goods');

    expect($updated->quantity)->toBe(40);
});

test('deduct stock action wraps fifo service', function () {
    $category = Category::firstOrCreate(
        ['slug' => 'inv-test-cat'],
        ['name' => 'Inventory Test Cat']
    );

    $product = Product::create([
        'name'        => 'Deduct Product ' . uniqid(),
        'slug'        => 'deduct-' . uniqid(),
        'sku'         => 'DEDUCT-' . uniqid(),
        'price'       => 15.0,
        'category_id' => $category->id,
        'is_active'   => true,
    ]);

    $warehouse = Warehouse::firstOrCreate(
        ['code' => 'WH-INV-TEST'],
        ['name' => 'Inv Test WH', 'address' => 'Test', 'manager_name' => 'Test']
    );

    $location = WarehouseLocation::firstOrCreate(
        ['barcode' => 'LOC-INV-TEST'],
        ['warehouse_id' => $warehouse->id, 'aisle' => 'B', 'rack' => '01', 'level' => '01', 'bin' => '01']
    );

    Stock::create([
        'product_id'            => $product->id,
        'warehouse_location_id' => $location->id,
        'quantity'              => 30,
        'reserved_quantity'     => 0,
    ]);

    $action = app(DeductStock::class);

    expect(fn() => $action($product->id, 5, 'order', 999))
        ->not->toThrow(\Exception::class);
});
