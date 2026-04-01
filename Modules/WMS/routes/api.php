<?php

use Illuminate\Support\Facades\Route;
use Modules\WMS\Http\Controllers\WMSController;
use Modules\WMS\Http\Controllers\ScannerController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::get('wms',                                    [WMSController::class, 'index'])->name('wms.index');
    Route::get('wms/{id}',                               [WMSController::class, 'show'])->name('wms.show');
    Route::post('wms/{id}/items/{itemId}/pick',          [WMSController::class, 'markPicked'])->name('wms.items.pick');
    Route::post('wms/scan',                              [ScannerController::class, 'scan'])->name('wms.scan');
});
