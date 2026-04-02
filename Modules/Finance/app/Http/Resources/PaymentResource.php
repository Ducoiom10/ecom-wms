<?php

namespace Modules\Finance\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'                     => $this->id,
            'order_id'               => $this->order_id,
            'gateway'                => $this->gateway,
            'gateway_transaction_id' => $this->gateway_transaction_id,
            'amount'                 => $this->amount,
            'status'                 => $this->status,
            'reconciled'             => $this->reconciled,
            'reconciled_at'          => $this->reconciled_at?->toIso8601String(),
            'created_at'             => $this->created_at?->toIso8601String(),
        ];
    }
}
