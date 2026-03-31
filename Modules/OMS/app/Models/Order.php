<?php

namespace Modules\OMS\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\OMS\States\OrderStateFactory;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'warehouse_id', 'status',
        'subtotal', 'discount', 'tax', 'shipping', 'total',
        'region', 'coupon_code', 'delivery_address',
        'approved_at', 'shipped_at', 'delivered_at',
        'cancelled_at', 'cancel_reason',
    ];

    protected $casts = [
        'approved_at'  => 'datetime',
        'shipped_at'   => 'datetime',
        'delivered_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'subtotal'     => 'float',
        'discount'     => 'float',
        'tax'          => 'float',
        'shipping'     => 'float',
        'total'        => 'float',
    ];

    // ── Relations ──────────────────────────────────────────────
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    // ── State Machine delegation ────────────────────────────────
    public function approve(): void    { OrderStateFactory::create($this)->approve(); }
    public function cancel(): void     { OrderStateFactory::create($this)->cancel(); }
    public function pickItems(): void  { OrderStateFactory::create($this)->pickItems(); }
    public function itemsPicked(): void{ OrderStateFactory::create($this)->itemsPicked(); }
    public function pack(): void       { OrderStateFactory::create($this)->pack(); }
    public function ship(): void       { OrderStateFactory::create($this)->ship(); }
    public function deliver(): void    { OrderStateFactory::create($this)->deliver(); }
    public function handleReturn(): void  { OrderStateFactory::create($this)->handleReturn(); }
    public function processRefund(): void { OrderStateFactory::create($this)->processRefund(); }
    public function deny(): void       { OrderStateFactory::create($this)->deny(); }

    // ── Helpers ─────────────────────────────────────────────────
    public function isCancellable(): bool
    {
        return in_array($this->status, ['pending', 'approved', 'picking', 'picked', 'packed', 'shipped']);
    }

    public function isCompleted(): bool
    {
        return in_array($this->status, ['delivered', 'refunded', 'delivery_complete']);
    }
}
