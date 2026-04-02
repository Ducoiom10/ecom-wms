<?php

namespace Modules\TMS\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateShipmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'zone_id'           => ['required', 'integer', 'exists:delivery_zones,id'],
            'carrier'           => ['required', 'string', 'in:ghtk,viettel'],
            'total_weight'      => ['required', 'numeric', 'min:0'],
            'shipping_fee'      => ['required', 'numeric', 'min:0'],
            'estimated_delivery' => ['nullable', 'date'],
            'order_ids'         => ['required', 'array', 'min:1'],
            'order_ids.*'       => ['integer', 'exists:orders,id'],
        ];
    }
}
