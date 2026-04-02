<?php

namespace Modules\OMS\Queries;

use Modules\OMS\Models\Order;

class GetOrderDetails
{
    public function __invoke(int $orderId): Order
    {
        return Order::with(['items', 'user'])
            ->findOrFail($orderId);
    }
}
