<?php

namespace Modules\Finance\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'       => $this->id,
            'order_id' => $this->order_id,
            'amount'   => $this->amount,
            'status'   => $this->status,
            'gateway'  => $this->gateway,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
