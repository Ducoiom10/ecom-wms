<?php

namespace Modules\TMS\Queries;

use Modules\TMS\Models\Shipment;
use Modules\TMS\Proxies\CarrierProxyFactory;

class GetShipmentStatus
{
    public function __invoke(int $shipmentId): array
    {
        $shipment = Shipment::findOrFail($shipmentId);

        $proxy  = CarrierProxyFactory::create($shipment->carrier);
        $status = $proxy->getStatus($shipment->tracking_id);

        return [
            'shipment_id' => $shipmentId,
            'status'      => $status->status,
            'location'    => $status->location,
        ];
    }
}
