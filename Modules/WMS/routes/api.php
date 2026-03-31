<?php

use Illuminate\Support\Facades\Route;
use Modules\WMS\Http\Controllers\WMSController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('wms', WMSController::class)->names('wms');
});
