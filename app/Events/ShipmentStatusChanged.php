<?php

namespace App\Events;

use Modules\TMS\Models\Shipment;

class ShipmentStatusChanged
{
    public function __construct(public readonly Shipment $shipment) {}
}
