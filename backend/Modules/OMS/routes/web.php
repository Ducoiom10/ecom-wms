<?php

use Illuminate\Support\Facades\Route;
use Modules\OMS\Http\Controllers\OMSController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('oms', OMSController::class)->names('oms');
});
