<?php

namespace Modules\Pricing\Services;

use Modules\Pricing\Calculators\BasePriceCalculator;
use Modules\Pricing\Calculators\LoyaltyPointsCalculator;
use Modules\Pricing\Calculators\ShippingCalculator;
use Modules\Pricing\Calculators\TaxCalculator;
use Modules\Pricing\Calculators\VoucherDiscountCalculator;

class PricingService
{
    /**
     * Calculate final order total using the full decorator chain.
     *
     * Chain order: Voucher discount → Loyalty discount → Tax → Shipping
     * Discounts applied on subtotal BEFORE tax (correct accounting practice).
     *
     * @return array{subtotal: float, discount: float, tax: float, shipping: float, total: float}
     */
    public function calculate(
        float  $subtotal,
        string $region        = 'VN',
        float  $voucherPct    = 0.0,
        float  $voucherFixed  = 0.0,
        int    $loyaltyPoints = 0,
    ): array {
        // Phase 1: apply discounts on raw subtotal
        $voucher  = new VoucherDiscountCalculator($voucherPct, $voucherFixed);
        $loyalty  = new LoyaltyPointsCalculator($loyaltyPoints);
        $voucher->setNext($loyalty);
        $discountedSubtotal = $voucher->calculate($subtotal);
        $discount = round($subtotal - $discountedSubtotal, 2);

        // Phase 2: tax then shipping on discounted subtotal
        // Reuse the same TaxCalculator instance to avoid rate divergence.
        $taxCalc = new TaxCalculator($region);
        $ship    = new ShippingCalculator($discountedSubtotal);
        $taxCalc->setNext($ship);
        $total = $taxCalc->calculate($discountedSubtotal);

        $taxAmount      = round($discountedSubtotal * $taxCalc->getRate(), 2);
        $shippingAmount = $discountedSubtotal >= 100.0 ? 0.0 : 5.0;

        return [
            'subtotal'  => round($subtotal, 2),
            'discount'  => $discount,
            'tax'       => $taxAmount,
            'shipping'  => $shippingAmount,
            'total'     => round($total, 2),
        ];
    }
}
