<?php

namespace Modules\Pricing\Actions;

use Modules\Pricing\Services\PricingService;

class CalculatePrice
{
    public function __construct(private PricingService $pricing) {}

    public function __invoke(
        float  $subtotal,
        string $region        = 'VN',
        float  $voucherPct    = 0.0,
        float  $voucherFixed  = 0.0,
        int    $loyaltyPoints = 0,
    ): array {
        return $this->pricing->calculate(
            subtotal:      $subtotal,
            region:        $region,
            voucherPct:    $voucherPct,
            voucherFixed:  $voucherFixed,
            loyaltyPoints: $loyaltyPoints,
        );
    }
}
