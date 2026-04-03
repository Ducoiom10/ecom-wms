<?php

namespace Modules\OMS\States;

class PickingState extends OrderState
{
    public function itemsPicked(): void
    {
        $this->transition('picked');
    }

    public function cancel(): void
    {
        $this->transition('cancelled', ['cancelled_at' => now()]);
    }
}
