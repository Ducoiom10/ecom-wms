<?php

namespace Modules\Pricing\Calculators;

class ShippingCalculator extends PriceCalculator
{
    private const FLAT_RATE          = 5.00;
    private const FREE_THRESHOLD     = 100.00;

    private float $originalSubtotal;

    public function __construct(float $originalSubtotal)
    {
        // We need the original subtotal (before tax) to decide free shipping,
        // not the already-taxed price passed into calculate().
        $this->originalSubtotal = $originalSubtotal;
    }

    public function calculate(float $price): float
    {
        $shipping = $this->originalSubtotal >= self::FREE_THRESHOLD ? 0.0 : self::FLAT_RATE;
        return $this->executeNext(round($price + $shipping, 2));
    }
}
