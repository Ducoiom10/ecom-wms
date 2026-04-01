<?php

use Illuminate\Support\Facades\Route;
use Modules\WMS\Http\Controllers\WMSController;
use Modules\WMS\Http\Controllers\ScannerController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('wms', WMSController::class)->names('wms');

    // Barcode scanner — inbound / outbound
    Route::post('/wms/scan', [ScannerController::class, 'scan'])->name('wms.scan');
});
