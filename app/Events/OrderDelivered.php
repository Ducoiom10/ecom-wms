<?php

namespace App\Events;

use Modules\OMS\Models\Order;

class OrderDelivered
{
    public function __construct(public readonly Order $order) {}
}
