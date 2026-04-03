<?php

use Illuminate\Support\Facades\Route;
use Modules\Pricing\Http\Controllers\PricingController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::post('pricing/calculate',  [PricingController::class, 'calculate'])->name('pricing.calculate');
    Route::post('pricing/shipping',   [PricingController::class, 'shipping'])->name('pricing.shipping');
    Route::post('pricing/validate-coupon', [PricingController::class, 'validateCoupon'])->name('pricing.validate-coupon');
});
