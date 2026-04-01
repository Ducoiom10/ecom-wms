<?php

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Modules\Inventory\Models\InventoryBatch;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\StockMovement;
use Modules\Inventory\Models\Warehouse;
use Modules\Inventory\Models\WarehouseLocation;
use Modules\Inventory\Services\InventoryFIFOService;
use Modules\Catalog\Models\Product;
use Modules\Catalog\Models\Category;

beforeEach(function () {
    $this->service = app(InventoryFIFOService::class);

    $category = Category::create(['name' => 'Test', 'slug' => 'test-' . uniqid()]);
    $this->product = Product::create([
        'name' => 'Test Product', 'slug' => 'test-prod-' . uniqid(),
        'sku' => 'SKU-' . uniqid(), 'price' => 100, 'category_id' => $category->id,
    ]);

    $warehouse = Warehouse::create(['code' => 'WH-' . uniqid(), 'name' => 'Test WH', 'address' => 'Test', 'manager_name' => 'Test']);
    $this->location = WarehouseLocation::create([
        'warehouse_id' => $warehouse->id, 'aisle' => 'A', 'rack' => '01',
        'level' => '01', 'bin' => '01', 'barcode' => 'TEST-' . uniqid(),
    ]);

    $this->stock = Stock::create([
        'product_id' => $this->product->id,
        'warehouse_location_id' => $this->location->id,
        'quantity' => 100, 'reserved_quantity' => 0,
    ]);
});

test('fifo algorithm picks oldest batch first', function () {
    $old = InventoryBatch::create([
        'product_id' => $this->product->id,
        'warehouse_location_id' => $this->location->id,
        'batch_number' => 'OLD-' . uniqid(),
        'quantity' => 10,
        'received_date' => now()->subDays(10),
        'fifo_sequence' => now()->subDays(10),
    ]);

    $new = InventoryBatch::create([
        'product_id' => $this->product->id,
        'warehouse_location_id' => $this->location->id,
        'batch_number' => 'NEW-' . uniqid(),
        'quantity' => 10,
        'received_date' => now()->subDays(1),
        'fifo_sequence' => now()->subDays(1),
    ]);

    $reserved = $this->service->reserveStock($this->product->id, 5);

    expect($reserved[0]['batch_id'])->toBe($old->id);
    expect($old->fresh()->quantity)->toBe(5);
    expect($new->fresh()->quantity)->toBe(10);
});

test('stock deduction is atomic and logs movement', function () {
    $this->service->deductStock($this->product->id, 10, 'order', 1);

    expect($this->stock->fresh()->quantity)->toBe(90);
    expect($this->stock->fresh()->reserved_quantity)->toBe(10);

    $movement = StockMovement::where('stock_id', $this->stock->id)->latest()->first();
    expect($movement)->not->toBeNull();
    expect($movement->type)->toBe('out');
    expect($movement->quantity)->toBe(10);
});

test('deductStockBatch sorts by product_id to prevent deadlock', function () {
    $category = Category::first();
    $product2 = Product::create([
        'name' => 'Product 2', 'slug' => 'prod2-' . uniqid(),
        'sku' => 'SKU2-' . uniqid(), 'price' => 50, 'category_id' => $category->id,
    ]);
    Stock::create([
        'product_id' => $product2->id,
        'warehouse_location_id' => $this->location->id,
        'quantity' => 50, 'reserved_quantity' => 0,
    ]);

    // Pass items in reverse order — service must sort them
    $items = [
        ['product_id' => $product2->id, 'quantity' => 5],
        ['product_id' => $this->product->id, 'quantity' => 10],
    ];

    $results = $this->service->deductStockBatch($items, 'order', 1);

    expect($results)->toHaveCount(2);
    expect($this->stock->fresh()->quantity)->toBe(90);
});

test('insufficient stock throws exception and rolls back', function () {
    expect(fn() => $this->service->deductStock($this->product->id, 999, 'order', 1))
        ->toThrow(Exception::class);

    // Stock must be unchanged
    expect($this->stock->fresh()->quantity)->toBe(100);
    expect(StockMovement::where('stock_id', $this->stock->id)->count())->toBe(0);
});

test('expired batches are skipped in fifo', function () {
    InventoryBatch::create([
        'product_id' => $this->product->id,
        'warehouse_location_id' => $this->location->id,
        'batch_number' => 'EXP-' . uniqid(),
        'quantity' => 10,
        'expiry_date' => now()->subDay(),
        'received_date' => now()->subDays(5),
        'fifo_sequence' => now()->subDays(5),
    ]);

    $valid = InventoryBatch::create([
        'product_id' => $this->product->id,
        'warehouse_location_id' => $this->location->id,
        'batch_number' => 'VALID-' . uniqid(),
        'quantity' => 10,
        'expiry_date' => now()->addDays(30),
        'received_date' => now()->subDays(1),
        'fifo_sequence' => now()->subDays(1),
    ]);

    $reserved = $this->service->reserveStock($this->product->id, 5);

    expect($reserved[0]['batch_id'])->toBe($valid->id);
});
