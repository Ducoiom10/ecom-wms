<?php

namespace Modules\Pricing\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PricingResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'subtotal'  => $this->resource['subtotal']  ?? 0,
            'discount'  => $this->resource['discount']  ?? 0,
            'tax'       => $this->resource['tax']       ?? 0,
            'shipping'  => $this->resource['shipping']  ?? 0,
            'total'     => $this->resource['total']     ?? 0,
        ];
    }
}
