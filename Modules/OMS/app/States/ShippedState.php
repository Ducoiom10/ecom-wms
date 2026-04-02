<?php

namespace Modules\OMS\States;

use App\Events\OrderDelivered;

class ShippedState extends OrderState
{
    public function deliver(): void
    {
        $this->transition('delivered', ['delivered_at' => now()]);
        event(new OrderDelivered($this->order));
    }

    public function cancel(): void
    {
        $this->transition('cancelled', ['cancelled_at' => now()]);
    }
}
