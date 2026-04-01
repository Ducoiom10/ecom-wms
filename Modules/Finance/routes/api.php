<?php

use Illuminate\Support\Facades\Route;
use Modules\Finance\Http\Controllers\FinanceController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::get('payments',              [FinanceController::class, 'index'])->name('payments.index');
    Route::get('payments/{id}',         [FinanceController::class, 'show'])->name('payments.show');
    Route::post('payments/{id}/refund', [FinanceController::class, 'refund'])->name('payments.refund');
    Route::get('finance/summary',       [FinanceController::class, 'summary'])->name('finance.summary');
});
