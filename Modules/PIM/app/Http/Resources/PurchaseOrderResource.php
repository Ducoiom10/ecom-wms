<?php

namespace Modules\PIM\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseOrderResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'                    => $this->id,
            'code'                  => $this->code,
            'status'                => $this->status,
            'total_amount'          => $this->total_amount,
            'expected_delivery_date' => $this->expected_delivery_date,
            'actual_delivery_date'  => $this->actual_delivery_date,
            'notes'                 => $this->notes,
            'supplier'              => $this->whenLoaded('supplier', fn() => [
                'id'   => $this->supplier->id,
                'name' => $this->supplier->name,
            ]),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
