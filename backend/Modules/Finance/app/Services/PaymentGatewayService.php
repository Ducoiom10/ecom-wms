<?php

namespace Modules\Finance\Services;

use Modules\Finance\Models\Payment;

class PaymentGatewayService
{
    /**
     * Check payment status from the gateway.
     * Returns: 'successful' | 'failed' | 'pending'
     */
    public function checkStatus(Payment $payment): string
    {
        // Gateway-specific implementation (Stripe, VNPay, MoMo, etc.)
        // Plugged in via config('finance.gateway') and resolved via DI
        return 'pending';
    }
}
