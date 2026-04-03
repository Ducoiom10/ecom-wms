<?php

namespace Modules\OMS\States;

class PackedState extends OrderState
{
    public function ship(): void
    {
        $this->transition('shipped', ['shipped_at' => now()]);
    }

    public function cancel(): void
    {
        $this->transition('cancelled', ['cancelled_at' => now()]);
    }
}
