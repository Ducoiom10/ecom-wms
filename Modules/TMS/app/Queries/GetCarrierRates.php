<?php

namespace Modules\TMS\Queries;

use Modules\TMS\Models\DeliveryZone;
use Modules\TMS\Proxies\CarrierProxyFactory;

class GetCarrierRates
{
    public function __invoke(array $filters = []): array
    {
        $zones    = DeliveryZone::all();
        $carriers = CarrierProxyFactory::supported();

        return [
            'carriers'       => $carriers,
            'delivery_zones' => $zones->map(fn($z) => ['id' => $z->id, 'name' => $z->name]),
        ];
    }
}
