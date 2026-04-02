<?php

namespace Modules\Inventory\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WarehouseResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'           => $this->id,
            'code'         => $this->code,
            'name'         => $this->name,
            'address'      => $this->address,
            'manager_name' => $this->manager_name,
            'is_active'    => $this->is_active ?? true,
        ];
    }
}
