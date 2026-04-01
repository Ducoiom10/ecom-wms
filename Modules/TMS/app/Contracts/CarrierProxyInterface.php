<?php

namespace Modules\TMS\Contracts;

use Modules\OMS\Models\Order;
use Modules\TMS\DTOs\ShipmentStatusDTO;

interface CarrierProxyInterface
{
    public function createShipment(Order $order): string;           // returns tracking_id
    public function getStatus(string $trackingId): ShipmentStatusDTO;
    public function cancelShipment(string $trackingId): bool;
    public function calculateFee(Order $order): float;
}
