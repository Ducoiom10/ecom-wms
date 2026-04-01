<?php

namespace Modules\OMS\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Modules\CRM\Services\LoyaltyService;
use Modules\OMS\Models\Order;

class AwardLoyaltyPoints implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 3;
    public int $timeout = 30;

    public function __construct(public readonly Order $order) {}

    public function handle(LoyaltyService $loyaltyService): void
    {
        $account    = $loyaltyService->getOrCreateAccount($this->order->user);
        $tier       = \Modules\CRM\Models\LoyaltyAccount::TIERS[$account->tier];
        $points     = (int) floor($this->order->total * $tier['multiplier']);

        if ($points <= 0) return;

        $loyaltyService->awardPoints(
            $this->order->user,
            $points,
            'Order #' . $this->order->id,
            $this->order->id,
        );

        Log::info("Awarded {$points} loyalty points to user #{$this->order->user_id} for order #{$this->order->id}.");
    }

    public function failed(\Throwable $e): void
    {
        Log::error("AwardLoyaltyPoints failed for order #{$this->order->id}: {$e->getMessage()}");
    }
}
