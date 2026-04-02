<?php

namespace Modules\OMS\Actions;

use Modules\OMS\Models\Order;

class CancelOrder
{
    public function __invoke(Order $order, ?string $reason = null): Order
    {
        if ($reason) {
            // Set cancel_reason directly then let cancel() handle the DB transition
            \Illuminate\Support\Facades\DB::table('orders')
                ->where('id', $order->id)
                ->update(['cancel_reason' => $reason]);

            $order->cancel_reason = $reason;
        }

        $order->cancel();

        return $order->fresh();
    }
}
