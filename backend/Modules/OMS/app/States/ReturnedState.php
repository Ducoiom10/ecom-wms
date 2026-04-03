<?php

namespace Modules\OMS\States;

class ReturnedState extends OrderState
{
    public function processRefund(): void
    {
        $this->transition('refunded');
    }

    public function deny(): void
    {
        $this->transition('delivery_complete');
    }
}
