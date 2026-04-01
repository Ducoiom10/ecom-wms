<?php

namespace Modules\Pricing\Calculators;

abstract class PriceCalculator
{
    private ?PriceCalculator $next = null;

    public function setNext(PriceCalculator $next): PriceCalculator
    {
        $this->next = $next;
        // Returns $next (not $this) to enable forward-chaining:
        // $a->setNext($b)->setNext($c)  means chain is a → b → c
        return $next;
    }

    abstract public function calculate(float $price): float;

    protected function executeNext(float $price): float
    {
        return $this->next ? $this->next->calculate($price) : $price;
    }
}
