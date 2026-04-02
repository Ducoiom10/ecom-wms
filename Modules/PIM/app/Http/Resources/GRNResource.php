<?php

namespace Modules\PIM\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GRNResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'           => $this->id,
            'code'         => $this->code,
            'status'       => $this->status,
            'receipt_date' => $this->receipt_date,
            'notes'        => $this->notes,
            'warehouse'    => $this->whenLoaded('warehouse', fn() => [
                'id'   => $this->warehouse->id,
                'name' => $this->warehouse->name,
            ]),
            'purchase_order' => $this->whenLoaded('purchaseOrder', fn() => [
                'id'   => $this->purchaseOrder->id,
                'code' => $this->purchaseOrder->code,
            ]),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
