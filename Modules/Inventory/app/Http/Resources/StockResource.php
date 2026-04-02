<?php

namespace Modules\Inventory\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'                   => $this->id,
            'product_id'           => $this->product_id,
            'warehouse_location_id' => $this->warehouse_location_id,
            'quantity'             => $this->quantity,
            'reserved_quantity'    => $this->reserved_quantity,
            'available_quantity'   => $this->quantity - $this->reserved_quantity,
            'product'              => $this->whenLoaded('product', fn() => [
                'id'   => $this->product->id,
                'name' => $this->product->name,
                'sku'  => $this->product->sku,
            ]),
        ];
    }
}
