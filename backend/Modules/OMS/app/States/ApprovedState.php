<?php

namespace Modules\OMS\States;

use Illuminate\Support\Facades\DB;
use Modules\OMS\Events\PickListCreated;
use Modules\WMS\Services\PickListGenerator;

class ApprovedState extends OrderState
{
    public function pickItems(): void
    {
        // Wrap in transaction: if generatePickList fails mid-loop,
        // the order status must NOT transition to 'picking'.
        DB::transaction(function () {
            $pickList = app(PickListGenerator::class)->generatePickList($this->order);
            $this->order->update(['status' => 'picking']);
            event(new PickListCreated($pickList));
        });
    }

    public function cancel(): void
    {
        $this->transition('cancelled', ['cancelled_at' => now()]);
    }
}
