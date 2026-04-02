<?php

use Modules\Catalog\Actions\CreateProduct;
use Modules\Catalog\Actions\DeleteProduct;
use Modules\Catalog\Actions\UpdateProduct;
use Modules\Catalog\Models\Category;
use Modules\Catalog\Models\Product;
use Modules\Catalog\Queries\GetAllProducts;
use Modules\Catalog\Queries\GetProductsByCategory;

test('create product action creates a product', function () {
    $category = Category::firstOrCreate(
        ['slug' => 'test-catalog'],
        ['name' => 'Test Catalog']
    );

    $action  = new CreateProduct();
    $product = $action([
        'name'        => 'Test Product',
        'slug'        => 'test-product-' . uniqid(),
        'sku'         => 'SKU-' . uniqid(),
        'price'       => 99.99,
        'category_id' => $category->id,
        'is_active'   => true,
    ]);

    expect($product)->toBeInstanceOf(Product::class);
    expect($product->name)->toBe('Test Product');
    expect($product->price)->toBe(99.99);
});

test('update product action updates fields', function () {
    $category = Category::firstOrCreate(
        ['slug' => 'test-catalog'],
        ['name' => 'Test Catalog']
    );

    $product = Product::create([
        'name'        => 'Original Name',
        'slug'        => 'original-slug-' . uniqid(),
        'sku'         => 'SKU-' . uniqid(),
        'price'       => 50.0,
        'category_id' => $category->id,
    ]);

    $action  = new UpdateProduct();
    $updated = $action($product, ['name' => 'Updated Name', 'price' => 75.0]);

    expect($updated->name)->toBe('Updated Name');
    expect($updated->price)->toBe(75.0);
});

test('delete product action removes the product', function () {
    $category = Category::firstOrCreate(
        ['slug' => 'test-catalog'],
        ['name' => 'Test Catalog']
    );

    $product = Product::create([
        'name'        => 'To Delete',
        'slug'        => 'to-delete-' . uniqid(),
        'sku'         => 'SKU-DEL-' . uniqid(),
        'price'       => 20.0,
        'category_id' => $category->id,
    ]);

    $id     = $product->id;
    $action = new DeleteProduct();
    $action($product);

    expect(Product::find($id))->toBeNull();
});

test('get all products query returns paginated results', function () {
    $query  = new GetAllProducts();
    $result = $query(['per_page' => 5]);

    expect($result->perPage())->toBe(5);
    expect($result)->toBeInstanceOf(\Illuminate\Pagination\LengthAwarePaginator::class);
});

test('get products by category query filters correctly', function () {
    $category = Category::firstOrCreate(
        ['slug' => 'filter-cat-test'],
        ['name' => 'Filter Category Test']
    );

    Product::create([
        'name'        => 'Cat Product',
        'slug'        => 'cat-prod-' . uniqid(),
        'sku'         => 'SKU-CAT-' . uniqid(),
        'price'       => 30.0,
        'category_id' => $category->id,
        'is_active'   => true,
    ]);

    $query  = new GetProductsByCategory();
    $result = $query($category->id);

    expect($result->total())->toBeGreaterThanOrEqual(1);
    expect($result->items()[0]->category_id)->toBe($category->id);
});
