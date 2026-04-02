<?php

namespace Modules\WMS\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GeneratePickListRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'order_id' => ['required', 'integer', 'exists:orders,id'],
        ];
    }
}
