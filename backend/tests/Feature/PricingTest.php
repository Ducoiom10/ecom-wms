<?php

use Modules\Pricing\Calculators\LoyaltyPointsCalculator;
use Modules\Pricing\Calculators\TaxCalculator;
use Modules\Pricing\Calculators\VoucherDiscountCalculator;
use Modules\Pricing\Services\PricingService;

test('tax calculator applies correct rate for VN', function () {
    $calc = new TaxCalculator('VN');
    expect($calc->calculate(100.0))->toBe(110.0);
});

test('tax calculator applies correct rate for US', function () {
    $calc = new TaxCalculator('US');
    expect($calc->calculate(100.0))->toBe(108.0);
});

test('voucher discount cannot go below zero', function () {
    $calc = new VoucherDiscountCalculator(percentage: 200.0);
    expect($calc->calculate(100.0))->toBe(0.0);
});

test('voucher percentage is capped at 100', function () {
    $calc = new VoucherDiscountCalculator(percentage: 150.0);
    expect($calc->calculate(100.0))->toBe(0.0); // 100% discount max
});

test('loyalty points calculator caps redemption', function () {
    $calc = new LoyaltyPointsCalculator(points: 10000, maxRedeemPoints: 500);
    // 500 points * 0.01 = $5 discount
    expect($calc->calculate(100.0))->toBe(95.0);
});

test('pricing service full chain calculation', function () {
    $service = new PricingService();
    $result  = $service->calculate(
        subtotal:      100.0,
        region:        'VN',
        voucherPct:    10.0,   // -$10 → $90
        voucherFixed:  0.0,
        loyaltyPoints: 0,
    );

    expect($result['subtotal'])->toBe(100.0);
    expect($result['discount'])->toBe(10.0);
    expect($result['tax'])->toBe(9.0);    // 10% of $90
    expect($result['shipping'])->toBe(5.0); // $90 < $100 threshold
    expect($result['total'])->toBe(104.0); // 90 + 9 + 5
});

test('free shipping applied when subtotal over threshold', function () {
    $service = new PricingService();
    $result  = $service->calculate(subtotal: 150.0, region: 'VN');

    expect($result['shipping'])->toBe(0.0);
});
