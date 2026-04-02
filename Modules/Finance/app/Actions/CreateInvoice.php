<?php

namespace Modules\Finance\Actions;

use Modules\Finance\Models\Payment;

class CreateInvoice
{
    public function __invoke(array $data): Payment
    {
        return Payment::create(array_merge($data, ['status' => 'pending', 'reconciled' => false]));
    }
}
