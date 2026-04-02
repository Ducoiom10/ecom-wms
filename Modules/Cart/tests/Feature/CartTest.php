<?php

use Modules\Cart\Actions\AddToCart;
use Modules\Cart\Actions\RemoveFromCart;
use Modules\Cart\Actions\UpdateCartQuantity;
use Modules\Cart\DTOs\CartDTO;
use Modules\Cart\Queries\GetCart;
use Modules\Catalog\Models\Category;
use Modules\Catalog\Models\Product;
use Illuminate\Support\Facades\Redis;

beforeEach(function () {
    // Use a unique user ID per test to avoid state leakage between tests
    $this->userId = 'test-user-' . uniqid();
});

afterEach(function () {
    Redis::del("cart:{$this->userId}");
});

test('add to cart action adds a product', function () {
    $category = Category::firstOrCreate(
        ['slug' => 'cart-test-cat'],
        ['name' => 'Cart Test Cat']
    );

    $product = Product::create([
        'name'        => 'Cart Item ' . uniqid(),
        'slug'        => 'cart-item-' . uniqid(),
        'sku'         => 'CART-' . uniqid(),
        'price'       => 25.0,
        'category_id' => $category->id,
        'is_active'   => true,
    ]);

    $action = app(AddToCart::class);
    $action($this->userId, $product->id, 2);

    $cart = app(GetCart::class)($this->userId);

    expect($cart)->toBeInstanceOf(CartDTO::class);
    expect(count($cart->items))->toBe(1);
});

test('remove from cart action removes item', function () {
    $category = Category::firstOrCreate(
        ['slug' => 'cart-test-cat'],
        ['name' => 'Cart Test Cat']
    );

    $product = Product::create([
        'name'        => 'Remove Item ' . uniqid(),
        'slug'        => 'remove-item-' . uniqid(),
        'sku'         => 'REM-' . uniqid(),
        'price'       => 15.0,
        'category_id' => $category->id,
        'is_active'   => true,
    ]);

    $add    = app(AddToCart::class);
    $remove = app(RemoveFromCart::class);

    $add($this->userId, $product->id, 1);
    $remove($this->userId, $product->id);

    $cart = app(GetCart::class)($this->userId);
    expect(count($cart->items))->toBe(0);
});

test('update cart quantity changes item count', function () {
    $category = Category::firstOrCreate(
        ['slug' => 'cart-test-cat'],
        ['name' => 'Cart Test Cat']
    );

    $product = Product::create([
        'name'        => 'Update Qty Item ' . uniqid(),
        'slug'        => 'qty-item-' . uniqid(),
        'sku'         => 'QTY-' . uniqid(),
        'price'       => 40.0,
        'category_id' => $category->id,
        'is_active'   => true,
    ]);

    app(AddToCart::class)($this->userId, $product->id, 1);
    app(UpdateCartQuantity::class)($this->userId, $product->id, 5);

    $cart = app(GetCart::class)($this->userId);
    expect($cart->items[0]['quantity'])->toBe(5);
});
