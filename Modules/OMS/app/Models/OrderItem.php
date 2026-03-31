<?php

namespace Modules\OMS\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id', 'product_id', 'variant_id',
        'quantity', 'unit_price', 'subtotal',
    ];

    protected $casts = [
        'unit_price' => 'float',
        'subtotal'   => 'float',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
