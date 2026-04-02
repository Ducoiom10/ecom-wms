<?php

namespace Modules\OMS\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'               => $this->id,
            'status'           => $this->status,
            'subtotal'         => $this->subtotal,
            'discount'         => $this->discount,
            'tax'              => $this->tax,
            'shipping'         => $this->shipping,
            'total'            => $this->total,
            'region'           => $this->region,
            'coupon_code'      => $this->coupon_code,
            'delivery_address' => $this->delivery_address,
            'approved_at'      => $this->approved_at?->toIso8601String(),
            'shipped_at'       => $this->shipped_at?->toIso8601String(),
            'delivered_at'     => $this->delivered_at?->toIso8601String(),
            'cancelled_at'     => $this->cancelled_at?->toIso8601String(),
            'items'            => OrderItemResource::collection($this->whenLoaded('items')),
            'created_at'       => $this->created_at?->toIso8601String(),
        ];
    }
}
