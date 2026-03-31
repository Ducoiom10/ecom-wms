<?php

namespace Modules\Pricing\Calculators;

abstract class PriceCalculator
{
    private ?PriceCalculator $next = null;

    public function setNext(PriceCalculator $next): static
    {
        $this->next = $next;
        return $next; // return $next so chaining works: $a->setNext($b)->setNext($c)
    }

    abstract public function calculate(float $price): float;

    protected function executeNext(float $price): float
    {
        return $this->next ? $this->next->calculate($price) : $price;
    }
}
