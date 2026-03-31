<?php

namespace Modules\OMS\States;

use Modules\OMS\Events\PickListCreated;
use Modules\WMS\Services\PickListGenerator;

class ApprovedState extends OrderState
{
    public function pickItems(): void
    {
        $pickList = app(PickListGenerator::class)->generatePickList($this->order);
        $this->transition('picking');
        event(new PickListCreated($pickList));
    }

    public function cancel(): void
    {
        $this->transition('cancelled', ['cancelled_at' => now()]);
    }
}
