<?php

namespace Modules\TMS\DTOs;

class ShipmentStatusDTO
{
    public function __construct(
        public readonly string  $status,
        public readonly ?string $location,
        public readonly ?string $estimatedDelivery,
    ) {}
}
