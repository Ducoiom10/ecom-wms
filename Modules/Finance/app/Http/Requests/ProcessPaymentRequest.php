<?php

namespace Modules\Finance\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProcessPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'order_id' => ['required', 'integer', 'exists:orders,id'],
            'gateway'  => ['required', 'string', 'in:momo,vnpay,stripe,cod'],
            'amount'   => ['required', 'numeric', 'min:0'],
        ];
    }
}
