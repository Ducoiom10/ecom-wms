<?php

namespace Modules\Pricing\Calculators;

class TaxCalculator extends PriceCalculator
{
    // Region tax rates (ISO country code => rate)
    private const RATES = [
        'VN' => 0.10,
        'US' => 0.08,
        'EU' => 0.20,
    ];

    private float $rate;

    public function __construct(string $region = 'VN')
    {
        $this->rate = self::RATES[$region] ?? self::RATES['VN'];
    }

    public function calculate(float $price): float
    {
        return $this->executeNext(round($price + $price * $this->rate, 2));
    }

    public function getRate(): float
    {
        return $this->rate;
    }
}
