<?php

namespace Modules\TMS\Actions;

use App\Events\ShipmentStatusChanged;
use Modules\TMS\Models\Shipment;

class UpdateShipmentStatus
{
    public function __invoke(Shipment $shipment, string $status, ?string $location = null): Shipment
    {
        $shipment->update(array_filter([
            'status'           => $status,
            'current_location' => $location,
        ]));

        event(new ShipmentStatusChanged($shipment->fresh()));

        return $shipment->fresh();
    }
}
