<?php

namespace Modules\WMS\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Inventory\Models\Warehouse;

class PickList extends Model
{
    protected $fillable = ['order_id', 'warehouse_id', 'status'];

    const STATUS_PENDING     = 'pending';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_COMPLETED   = 'completed';
    const STATUS_CANCELLED   = 'cancelled';

    public function items()
    {
        return $this->hasMany(PickListItem::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
}
