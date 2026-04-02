<?php

namespace Modules\OMS\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id'          => ['required', 'integer', 'exists:users,id'],
            'warehouse_id'     => ['required', 'integer', 'exists:warehouses,id'],
            'region'           => ['required', 'string', 'max:10'],
            'subtotal'         => ['required', 'numeric', 'min:0'],
            'discount'         => ['nullable', 'numeric', 'min:0'],
            'tax'              => ['nullable', 'numeric', 'min:0'],
            'shipping'         => ['nullable', 'numeric', 'min:0'],
            'total'            => ['required', 'numeric', 'min:0'],
            'coupon_code'      => ['nullable', 'string', 'max:50'],
            'delivery_address' => ['nullable', 'string'],
            'items'            => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity'   => ['required', 'integer', 'min:1'],
            'items.*.unit_price' => ['required', 'numeric', 'min:0'],
            'items.*.subtotal'   => ['required', 'numeric', 'min:0'],
        ];
    }
}
