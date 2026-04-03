<?php

namespace Modules\TMS\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\OMS\Models\Order;

class Shipment extends Model
{
    protected $fillable = [
        'zone_id', 'carrier', 'status', 'tracking_id',
        'total_weight', 'shipping_fee', 'current_location', 'estimated_delivery',
    ];

    protected $casts = [
        'estimated_delivery' => 'datetime',
        'total_weight'       => 'float',
        'shipping_fee'       => 'float',
    ];

    public function zone()
    {
        return $this->belongsTo(DeliveryZone::class, 'zone_id');
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'shipment_orders');
    }

    public function addOrder(Order $order): void
    {
        $this->orders()->syncWithoutDetaching([$order->id]);
    }

    public function isActive(): bool
    {
        return !in_array($this->status, ['delivered', 'cancelled']);
    }
}
