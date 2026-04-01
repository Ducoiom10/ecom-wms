<?php

use Illuminate\Support\Facades\Route;
use App\Livewire\BarcodeScanner;



// WMS Scanner — mobile-first, protected by admin auth
Route::middleware(['auth', 'is.admin'])->group(function () {
    Route::get('/wms/scanner', BarcodeScanner::class)->name('wms.scanner');
});
