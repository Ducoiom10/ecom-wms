<?php

namespace Modules\Finance\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\OMS\Models\Order;

class Payment extends Model
{
    protected $fillable = [
        'order_id', 'gateway', 'gateway_transaction_id',
        'amount', 'status', 'reconciled', 'reconciled_at',
    ];

    protected $casts = [
        'amount'        => 'float',
        'reconciled'    => 'boolean',
        'reconciled_at' => 'datetime',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
