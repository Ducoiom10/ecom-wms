<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Modules\Inventory\Models\Stock;

class StockUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Stock $stock) {}

    public function broadcastOn(): array
    {
        return [new Channel('inventory')];
    }

    public function broadcastWith(): array
    {
        return [
            'stock_id'    => $this->stock->id,
            'product_id'  => $this->stock->product_id,
            'product'     => $this->stock->product?->name,
            'quantity'    => $this->stock->quantity,
            'reserved'    => $this->stock->reserved_quantity,
            'location'    => $this->stock->location?->barcode,
            'is_low'      => $this->stock->quantity < 10,
            'updated_at'  => now()->toIso8601String(),
        ];
    }

    public function broadcastAs(): string
    {
        return 'stock.updated';
    }
}
