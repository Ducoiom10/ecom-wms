<?php

namespace Modules\OMS\States;

use App\Exceptions\InvalidOrderStateException;
use Modules\OMS\Models\Order;

abstract class OrderState
{
    public function __construct(protected Order $order) {}

    public function approve(): void    { $this->invalid('approve'); }
    public function cancel(): void     { $this->invalid('cancel'); }
    public function pickItems(): void  { $this->invalid('pickItems'); }
    public function itemsPicked(): void{ $this->invalid('itemsPicked'); }
    public function pack(): void       { $this->invalid('pack'); }
    public function ship(): void       { $this->invalid('ship'); }
    public function deliver(): void    { $this->invalid('deliver'); }
    public function handleReturn(): void { $this->invalid('handleReturn'); }
    public function processRefund(): void{ $this->invalid('processRefund'); }
    public function deny(): void       { $this->invalid('deny'); }

    protected function transition(string $status, array $extra = []): void
    {
        // Bypass $fillable guard: status is intentionally excluded from fillable
        // to prevent mass-assignment, but state machine must be able to set it.
        $payload = array_merge(['status' => $status], $extra);
        \Illuminate\Support\Facades\DB::table('orders')
            ->where('id', $this->order->id)
            ->update($payload);

        // Sync in-memory model so callers see the new state immediately.
        foreach ($payload as $key => $value) {
            $this->order->$key = $value;
        }
    }

    private function invalid(string $action): void
    {
        throw new InvalidOrderStateException($action, $this->order->status);
    }
}
