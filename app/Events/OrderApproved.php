<?php

namespace App\Events;

use Modules\OMS\Models\Order;

class OrderApproved
{
    public function __construct(public readonly Order $order) {}
}
