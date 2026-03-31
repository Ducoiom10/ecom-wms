<?php

use Illuminate\Support\Facades\Route;
use Modules\PIM\Http\Controllers\PIMController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('pims', PIMController::class)->names('pim');
});
