<?php

namespace Modules\OMS\Actions;

use Modules\OMS\Models\Order;

class CancelOrder
{
    public function __invoke(Order $order, ?string $reason = null): Order
    {
        if ($reason) {
            $order->cancel_reason = $reason;
            $order->save();
        }

        $order->cancel();

        return $order->fresh();
    }
}
