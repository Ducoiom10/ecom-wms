<?php

use Illuminate\Support\Facades\Route;
use Modules\PIM\Http\Controllers\PIMController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::get('suppliers',                              [PIMController::class, 'suppliers'])->name('suppliers.index');
    Route::get('purchase-orders',                        [PIMController::class, 'index'])->name('purchase-orders.index');
    Route::post('purchase-orders',                       [PIMController::class, 'store'])->name('purchase-orders.store');
    Route::get('purchase-orders/{id}',                   [PIMController::class, 'show'])->name('purchase-orders.show');
    Route::put('purchase-orders/{id}',                   [PIMController::class, 'update'])->name('purchase-orders.update');
    Route::post('purchase-orders/{id}/receive',          [PIMController::class, 'receive'])->name('purchase-orders.receive');
});
