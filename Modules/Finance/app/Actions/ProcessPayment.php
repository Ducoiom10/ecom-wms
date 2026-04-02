<?php

namespace Modules\Finance\Actions;

use Modules\Finance\Models\Payment;
use Modules\Finance\Services\PaymentGatewayService;

class ProcessPayment
{
    public function __construct(private PaymentGatewayService $gateway) {}

    public function __invoke(Payment $payment): Payment
    {
        $result = $this->gateway->charge($payment);

        $payment->update([
            'gateway_transaction_id' => $result['transaction_id'] ?? null,
            'status'                 => $result['status'] ?? 'pending',
        ]);

        return $payment->fresh();
    }
}
