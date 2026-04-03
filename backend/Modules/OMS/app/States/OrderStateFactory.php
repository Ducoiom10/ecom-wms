<?php

namespace Modules\OMS\States;

use Modules\OMS\Exceptions\InvalidOrderStateException;
use Modules\OMS\Models\Order;

class OrderStateFactory
{
    public static function create(Order $order): OrderState
    {
        return match ($order->status) {
            'pending'           => new PendingState($order),
            'approved'          => new ApprovedState($order),
            'picking'           => new PickingState($order),
            'picked'            => new PickedState($order),
            'packed'            => new PackedState($order),
            'shipped'           => new ShippedState($order),
            'delivered'         => new DeliveredState($order),
            'returned'          => new ReturnedState($order),
            default             => throw new InvalidOrderStateException('create', $order->status),
        };
    }
}
