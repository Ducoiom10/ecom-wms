<?php

namespace Modules\OMS\Events;

use Modules\OMS\Models\Order;

class OrderApproved
{
    public function __construct(public readonly Order $order) {}
}
