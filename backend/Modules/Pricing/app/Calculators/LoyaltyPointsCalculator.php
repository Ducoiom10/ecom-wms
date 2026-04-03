<?php

namespace Modules\Pricing\Calculators;

class LoyaltyPointsCalculator extends PriceCalculator
{
    private const POINT_VALUE = 0.01; // 1 point = $0.01 discount

    public function __construct(
        private readonly int $points,
        private readonly int $maxRedeemPoints = 500, // cap to prevent full discount
    ) {}

    public function calculate(float $price): float
    {
        $redeemable = min($this->points, $this->maxRedeemPoints);
        $discount   = round($redeemable * self::POINT_VALUE, 2);
        $discounted = max(0.0, round($price - $discount, 2));

        return $this->executeNext($discounted);
    }
}
