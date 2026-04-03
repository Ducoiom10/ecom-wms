<?php

namespace Modules\Pricing\Calculators;

class BasePriceCalculator extends PriceCalculator
{
    public function calculate(float $price): float
    {
        return $this->executeNext($price);
    }
}
