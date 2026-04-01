<?php

use Illuminate\Support\Facades\Route;
use Modules\Catalog\Http\Controllers\ProductController;

// Public product endpoints (no auth required for storefront)
Route::prefix('v1')->group(function () {
    Route::get('/products',          [ProductController::class, 'index']);
    Route::get('/products/search',   [ProductController::class, 'search']);
    Route::get('/products/filters',  [ProductController::class, 'filters']);
    Route::get('/products/{id}',     [ProductController::class, 'show']);
    Route::get('/products/{id}/related', [ProductController::class, 'related']);
});
