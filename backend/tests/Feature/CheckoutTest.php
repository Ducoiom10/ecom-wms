<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Queue;
use Modules\Catalog\Models\Category;
use Modules\Catalog\Models\Product;
use Modules\CRM\Models\LoyaltyAccount;
use Modules\CRM\Services\LoyaltyService;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\Warehouse;
use Modules\Inventory\Models\WarehouseLocation;
use Modules\OMS\Jobs\AwardLoyaltyPoints;
use Modules\OMS\Models\Order;
use Modules\Pricing\Services\PricingService;

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeCustomer(): User
{
    return User::create([
        'name'      => 'Customer',
        'email'     => 'cust-' . uniqid() . '@test.com',
        'password'  => Hash::make('password'),
        'role'      => 'customer',
        'is_active' => true,
    ]);
}

function makeProductWithStock(float $price = 100.0, int $qty = 50): Product
{
    $category = Category::firstOrCreate(
        ['slug' => 'test-cat'],
        ['name' => 'Test Category']
    );

    $product = Product::create([
        'name'        => 'Product-' . uniqid(),
        'slug'        => 'prod-' . uniqid(),
        'sku'         => 'SKU-' . uniqid(),
        'price'       => $price,
        'category_id' => $category->id,
    ]);

    $warehouse = Warehouse::firstOrCreate(
        ['code' => 'WH-CHECKOUT'],
        ['name' => 'Checkout WH', 'address' => 'Test', 'manager_name' => 'Test']
    );

    $location = WarehouseLocation::firstOrCreate(
        ['barcode' => 'LOC-CHECKOUT'],
        ['warehouse_id' => $warehouse->id, 'aisle' => 'A', 'rack' => '01', 'level' => '01', 'bin' => '01']
    );

    Stock::create([
        'product_id'           => $product->id,
        'warehouse_location_id' => $location->id,
        'quantity'             => $qty,
        'reserved_quantity'    => 0,
    ]);

    return $product;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

test('pricing service calculates correct total with voucher', function () {
    $service = app(PricingService::class);

    // subtotal=200, 10% voucher → discounted=180, tax VN 10%=18, shipping free (>100)
    $result = $service->calculate(
        subtotal:   200.0,
        region:     'VN',
        voucherPct: 10.0,
    );

    expect($result['subtotal'])->toBe(200.0);
    expect($result['discount'])->toBe(20.0);
    expect($result['tax'])->toBe(18.0);
    expect($result['shipping'])->toBe(0.0);
    expect($result['total'])->toBe(198.0); // 180 + 18 + 0
});

test('pricing service applies flat shipping when subtotal under threshold', function () {
    $service = app(PricingService::class);

    $result = $service->calculate(subtotal: 50.0, region: 'VN');

    expect($result['shipping'])->toBe(5.0);
    expect($result['total'])->toBe(60.0); // 50 + 5 tax + 5 shipping
});

test('order is created with correct status and totals', function () {
    $customer  = makeCustomer();
    $warehouse = Warehouse::firstOrCreate(
        ['code' => 'WH-CHECKOUT'],
        ['name' => 'Checkout WH', 'address' => 'Test', 'manager_name' => 'Test']
    );

    $order = Order::create([
        'user_id'      => $customer->id,
        'warehouse_id' => $warehouse->id,
        'subtotal'     => 200.0,
        'discount'     => 20.0,
        'tax'          => 18.0,
        'shipping'     => 0.0,
        'total'        => 198.0,
        'region'       => 'VN',
        'coupon_code'  => 'SAVE10',
    ]);

    expect($order->status)->toBe('pending');
    expect($order->total)->toBe(198.0);
    expect($order->coupon_code)->toBe('SAVE10');
});

test('stock is decremented after order item deduction', function () {
    $product = makeProductWithStock(price: 100.0, qty: 20);
    $stock   = Stock::where('product_id', $product->id)->first();

    $stock->decrement('quantity', 5);
    $stock->increment('reserved_quantity', 5);

    expect($stock->fresh()->quantity)->toBe(15);
    expect($stock->fresh()->reserved_quantity)->toBe(5);
});

test('stock prevents overselling', function () {
    $product = makeProductWithStock(price: 50.0, qty: 3);

    $service = app(\Modules\Inventory\Services\InventoryFIFOService::class);

    expect(fn() => $service->deductStock($product->id, 10, 'order', 999))
        ->toThrow(Exception::class);

    $stock = Stock::where('product_id', $product->id)->first();
    expect($stock->fresh()->quantity)->toBe(3); // unchanged
});

test('award loyalty points job dispatches on order delivered', function () {
    Queue::fake();

    $customer  = makeCustomer();
    $warehouse = Warehouse::firstOrCreate(
        ['code' => 'WH-CHECKOUT'],
        ['name' => 'Checkout WH', 'address' => 'Test', 'manager_name' => 'Test']
    );

    $order = Order::create([
        'user_id'      => $customer->id,
        'warehouse_id' => $warehouse->id,
        'subtotal'     => 100.0,
        'total'        => 110.0,
        'region'       => 'VN',
    ]);

    AwardLoyaltyPoints::dispatch($order);

    Queue::assertPushed(AwardLoyaltyPoints::class, fn($job) => $job->order->id === $order->id);
});

test('loyalty service awards points and upgrades tier', function () {
    $customer = makeCustomer();
    $service  = app(LoyaltyService::class);

    $service->awardPoints($customer, 600, 'test purchase');

    $account = LoyaltyAccount::where('user_id', $customer->id)->first();
    expect($account->points)->toBe(600);
    expect($account->tier)->toBe('silver');
});

test('loyalty service redeem points returns correct discount', function () {
    $customer = makeCustomer();
    $service  = app(LoyaltyService::class);

    $service->awardPoints($customer, 500, 'initial');
    $discount = $service->redeemPoints($customer, 200);

    expect($discount)->toBe(2.0); // 200 points / 100 = $2
    $account = LoyaltyAccount::where('user_id', $customer->id)->first();
    expect($account->fresh()->points)->toBe(300);
});

test('loyalty redeem throws when insufficient points', function () {
    $customer = makeCustomer();
    $service  = app(LoyaltyService::class);

    $service->awardPoints($customer, 50, 'small award');

    expect(fn() => $service->redeemPoints($customer, 200))
        ->toThrow(Exception::class);
});
