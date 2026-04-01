<?php

namespace Modules\Pricing\Calculators;

class VoucherDiscountCalculator extends PriceCalculator
{
    private float $percentage;
    private float $fixedAmount;

    public function __construct(
        float $percentage = 0.0,
        float $fixedAmount = 0.0,
    ) {
        // Cap percentage to valid range to prevent free-order exploit
        $this->percentage  = min(100.0, max(0.0, $percentage));
        $this->fixedAmount = max(0.0, $fixedAmount);
    }

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
