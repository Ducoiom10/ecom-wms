<?php

namespace Modules\OMS\Actions;

use Modules\OMS\Models\Order;

class ApproveOrder
{
    public function __invoke(Order $order): Order
    {
        $order->approve();

        return $order->fresh();
    }
}
