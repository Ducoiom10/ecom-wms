<?php

use Illuminate\Support\Facades\Route;
use Modules\TMS\Http\Controllers\TMSController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('tms', TMSController::class)->names('tms');
});
