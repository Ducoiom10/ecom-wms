<?php

namespace Modules\OMS\States;

use Modules\OMS\Events\OrderApproved;

class PendingState extends OrderState
{
    public function approve(): void
    {
        $this->transition('approved', ['approved_at' => now()]);
        event(new OrderApproved($this->order));
    }

    public function cancel(): void
    {
        $this->transition('cancelled', ['cancelled_at' => now()]);
    }
}
