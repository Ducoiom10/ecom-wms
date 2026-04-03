<?php

use Illuminate\Support\Facades\Route;
use Modules\Inventory\Http\Controllers\InventoryController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::get('stocks',                        [InventoryController::class, 'index'])->name('stocks.index');
    Route::get('stocks/{id}',                   [InventoryController::class, 'show'])->name('stocks.show');
    Route::post('stocks/adjust',                [InventoryController::class, 'adjust'])->name('stocks.adjust');
    Route::get('warehouses',                    [InventoryController::class, 'warehouses'])->name('warehouses.index');
    Route::get('warehouses/{id}/locations',     [InventoryController::class, 'locations'])->name('warehouses.locations');
});
