<?php

namespace Modules\Pricing\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalculatePriceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'subtotal'       => ['required', 'numeric', 'min:0'],
            'region'         => ['nullable', 'string', 'max:10'],
            'voucher_pct'    => ['nullable', 'numeric', 'min:0', 'max:100'],
            'voucher_fixed'  => ['nullable', 'numeric', 'min:0'],
            'loyalty_points' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
