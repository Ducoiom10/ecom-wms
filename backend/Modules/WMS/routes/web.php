<?php

use Illuminate\Support\Facades\Route;
use Modules\WMS\Http\Controllers\WMSController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('wms', WMSController::class)->names('wms');
});
