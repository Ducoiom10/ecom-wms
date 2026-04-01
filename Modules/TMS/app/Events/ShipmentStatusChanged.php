<?php

namespace Modules\TMS\Events;

use Modules\TMS\Models\Shipment;

class ShipmentStatusChanged
{
    public function __construct(public readonly Shipment $shipment) {}
}
