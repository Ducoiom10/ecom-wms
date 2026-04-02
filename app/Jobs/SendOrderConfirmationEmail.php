<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Modules\OMS\Models\Order;

class SendOrderConfirmationEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 3;
    public int $timeout = 30;

    public function __construct(public readonly Order $order) {}

    public function handle(): void
    {
        Mail::to($this->order->user->email)->send(
            new \Modules\OMS\Mail\OrderConfirmationMail($this->order)
        );

        Log::info("Order #{$this->order->id} confirmation email sent.");
    }

    public function failed(\Throwable $e): void
    {
        Log::error("Failed to send confirmation email for order #{$this->order->id}: {$e->getMessage()}");
    }
}
