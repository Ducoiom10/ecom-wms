<?php

use Illuminate\Support\Facades\Route;
use Modules\OMS\Http\Controllers\OrderController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::get('/orders',                [OrderController::class, 'index']);
    Route::post('/orders',               [OrderController::class, 'store']);
    Route::get('/orders/{id}',           [OrderController::class, 'show']);
    Route::post('/orders/{id}/cancel',   [OrderController::class, 'cancel']);
    Route::get('/orders/{id}/tracking',  [OrderController::class, 'tracking']);
});
