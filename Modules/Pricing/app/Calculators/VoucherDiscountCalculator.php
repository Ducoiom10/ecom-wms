<?php

namespace Modules\Pricing\Calculators;

class VoucherDiscountCalculator extends PriceCalculator
{
    public function __construct(
        private readonly float  $percentage = 0.0,  // e.g. 10 = 10%
        private readonly float  $fixedAmount = 0.0, // e.g. 5.00
    ) {}

    public function calculate(float $price): float
    {
        $discount = 0.0;

        if ($this->percentage > 0) {
            $discount += $price * ($this->percentage / 100);
        }

        if ($this->fixedAmount > 0) {
            $discount += $this->fixedAmount;
        }

        // Never go below zero
        $discounted = max(0.0, round($price - $discount, 2));
        return $this->executeNext($discounted);
    }
}
