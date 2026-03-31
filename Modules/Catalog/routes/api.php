<?php

use Illuminate\Support\Facades\Route;
use Modules\Catalog\Http\Controllers\CatalogController;
use Modules\Catalog\Http\Controllers\ProductController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('catalogs', CatalogController::class)->names('catalog');
});

Route::prefix('v1')->group(function () {
    // Đường dẫn thực tế sẽ là: GET /api/catalog/v1/products/{id}
    Route::get('/products/{id}', [ProductController::class, 'show']);
});
