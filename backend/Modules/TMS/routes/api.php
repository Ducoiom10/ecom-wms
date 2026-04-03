<?php

use Illuminate\Support\Facades\Route;
use Modules\TMS\Http\Controllers\TMSController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::get('shipments',                    [TMSController::class, 'index'])->name('shipments.index');
    Route::get('shipments/{id}',               [TMSController::class, 'show'])->name('shipments.show');
    Route::post('shipments/{id}/sync-status',  [TMSController::class, 'syncStatus'])->name('shipments.sync-status');
    Route::get('delivery-zones',               [TMSController::class, 'deliveryZones'])->name('delivery-zones.index');
});
