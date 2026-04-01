<?php

use Illuminate\Support\Facades\Route;
use Modules\CRM\Http\Controllers\CRMController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    // Reviews
    Route::post('reviews',                  [CRMController::class, 'submitReview']);
    Route::post('reviews/{review}/flag',    [CRMController::class, 'flagReview']);
    Route::get('recommendations',           [CRMController::class, 'recommendations']);

    // Address book
    Route::get('addresses',                 [CRMController::class, 'listAddresses']);
    Route::post('addresses',                [CRMController::class, 'addAddress']);

    // Loyalty
    Route::get('loyalty/benefits',          [CRMController::class, 'loyaltyBenefits']);
    Route::post('loyalty/redeem',           [CRMController::class, 'redeemPoints']);
});
