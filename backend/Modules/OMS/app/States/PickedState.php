<?php

namespace Modules\OMS\States;

class PickedState extends OrderState
{
    public function pack(): void
    {
        $this->transition('packed');
    }

    public function cancel(): void
    {
        $this->transition('cancelled', ['cancelled_at' => now()]);
    }
}
