<?php

namespace Modules\WMS\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PickListResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'           => $this->id,
            'order_id'     => $this->order_id,
            'warehouse_id' => $this->warehouse_id,
            'status'       => $this->status,
            'items_count'  => $this->whenLoaded('items', fn() => $this->items->count()),
            'warehouse'    => $this->whenLoaded('warehouse', fn() => [
                'id'   => $this->warehouse->id,
                'name' => $this->warehouse->name,
            ]),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
