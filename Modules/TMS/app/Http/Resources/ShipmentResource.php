<?php

namespace Modules\TMS\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShipmentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'                 => $this->id,
            'carrier'            => $this->carrier,
            'status'             => $this->status,
            'tracking_id'        => $this->tracking_id,
            'total_weight'       => $this->total_weight,
            'shipping_fee'       => $this->shipping_fee,
            'current_location'   => $this->current_location,
            'estimated_delivery' => $this->estimated_delivery?->toIso8601String(),
            'zone'               => $this->whenLoaded('zone', fn() => [
                'id'   => $this->zone->id,
                'name' => $this->zone->name,
            ]),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
