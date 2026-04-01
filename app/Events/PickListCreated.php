<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PickListCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public int $pickListId,
        public int $orderId,
        public int $warehouseId,
        public int $itemsCount
    ) {}

    public function broadcastOn(): array
    {
        return [new Channel("warehouse.{$this->warehouseId}")];
    }

    public function broadcastWith(): array
    {
        return [
            'pick_list_id'  => $this->pickListId,
            'order_id'      => $this->orderId,
            'warehouse_id'  => $this->warehouseId,
            'items_count'   => $this->itemsCount,
            'created_at'    => now()->toIso8601String(),
        ];
    }

    public function broadcastAs(): string
    {
        return 'picklist.created';
    }
}
