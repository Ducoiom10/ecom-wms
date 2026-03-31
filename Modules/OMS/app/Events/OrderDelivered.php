<?php

namespace Modules\OMS\Events;

use Modules\OMS\Models\Order;

class OrderDelivered
{
    public function __construct(public readonly Order $order) {}
}
