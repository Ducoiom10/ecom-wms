<?php

namespace Modules\OMS\Actions;

use Modules\OMS\Models\Order;
use Modules\OMS\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class CreateOrder
{
    public function __invoke(array $data): Order
    {
        return DB::transaction(function () use ($data) {
            $items = $data['items'] ?? [];
            unset($data['items']);

            $order = Order::create($data);

            foreach ($items as $item) {
                OrderItem::create(array_merge($item, ['order_id' => $order->id]));
            }

            return $order->load('items');
        });
    }
}
