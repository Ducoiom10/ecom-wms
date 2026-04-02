<?php

namespace Modules\Pricing\Queries;

use Modules\Pricing\Services\PricingService;

class GetPricing
{
    public function __construct(private PricingService $pricing) {}

    public function __invoke(float $subtotal, array $options = []): array
    {
        return $this->pricing->calculate(
            subtotal:      $subtotal,
            region:        $options['region']         ?? 'VN',
            voucherPct:    $options['voucher_pct']    ?? 0.0,
            voucherFixed:  $options['voucher_fixed']  ?? 0.0,
            loyaltyPoints: $options['loyalty_points'] ?? 0,
        );
    }
}
