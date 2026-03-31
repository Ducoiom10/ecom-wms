<?php

use Illuminate\Support\Facades\Route;
use Modules\TMS\Http\Controllers\TMSController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('tms', TMSController::class)->names('tms');
});
