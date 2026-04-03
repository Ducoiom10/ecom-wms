<?php

use Illuminate\Support\Facades\Route;
use Modules\Cart\Http\Controllers\CartController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::get('/cart',                  [CartController::class, 'index']);
    Route::post('/cart/items',           [CartController::class, 'addItem']);
    Route::put('/cart/items/{productId}', [CartController::class, 'updateItem']);
    Route::delete('/cart/items/{productId}', [CartController::class, 'removeItem']);
    Route::post('/cart/coupon',          [CartController::class, 'applyCoupon']);
    Route::delete('/cart/coupon',        [CartController::class, 'removeCoupon']);
});
