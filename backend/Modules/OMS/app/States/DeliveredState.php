<?php

namespace Modules\OMS\States;

class DeliveredState extends OrderState
{
    public function handleReturn(): void
    {
        $this->transition('returned');
    }
}
