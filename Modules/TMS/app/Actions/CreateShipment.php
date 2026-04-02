<?php

namespace Modules\TMS\Actions;

use Modules\TMS\Models\Shipment;
use Modules\TMS\Services\ShipmentService;

class CreateShipment
{
    public function __construct(private ShipmentService $service) {}

    public function __invoke(array $data): Shipment
    {
        $orderIds = $data['order_ids'] ?? [];
        $carrier  = $data['carrier'];

        $result = $this->service->consolidateOrders($orderIds, $carrier);

        return $result['shipment'];
    }
}
