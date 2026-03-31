<?php

use Illuminate\Support\Facades\Route;
use Modules\OMS\Http\Controllers\OMSController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('oms', OMSController::class)->names('oms');
});
