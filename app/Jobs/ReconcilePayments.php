<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Modules\Finance\Models\Payment;
use Modules\Finance\Services\PaymentGatewayService;

class ReconcilePayments implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 1;
    public int $timeout = 300;

    public function handle(PaymentGatewayService $gateway): void
    {
        $processed = 0;

        // chunk() prevents loading all unreconciled payments into memory
        Payment::where('reconciled', false)
            ->where('created_at', '>=', now()->subDay())
            ->with('order')
            ->chunk(100, function ($payments) use ($gateway, &$processed) {
                foreach ($payments as $payment) {
                    try {
                        $gatewayStatus = $gateway->checkStatus($payment);

                        if ($gatewayStatus === 'successful') {
                            $payment->update([
                                'reconciled'    => true,
                                'reconciled_at' => now(),
                                'status'        => 'paid',
                            ]);
                            $payment->order->update(['status' => 'approved']);
                        } elseif ($gatewayStatus === 'failed') {
                            $payment->update(['status' => 'failed']);
                            $payment->order->update(['status' => 'cancelled']);
                        }

                        $processed++;
                    } catch (\Throwable $e) {
                        Log::error("ReconcilePayments failed for payment #{$payment->id}: {$e->getMessage()}");
                    }
                }
            });

        Log::info("ReconcilePayments completed. {$processed} payments processed.");
    }
}
