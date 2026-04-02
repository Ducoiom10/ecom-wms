<?php

namespace Modules\Cart\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'user_id'    => $this->resource->userId ?? null,
            'items'      => $this->resource->items ?? [],
            'subtotal'   => $this->resource->subtotal ?? 0,
            'tax'        => $this->resource->tax ?? 0,
            'shipping'   => $this->resource->shipping ?? 0,
            'total'      => $this->resource->total ?? 0,
            'coupon'     => $this->resource->coupon ?? null,
            'expires_at' => $this->resource->expiresAt ?? null,
        ];
    }
}
