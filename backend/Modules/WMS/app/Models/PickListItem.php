<?php

namespace Modules\WMS\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Inventory\Models\WarehouseLocation;

class PickListItem extends Model
{
    protected $fillable = [
        'pick_list_id',
        'product_id',
        'quantity_required',
        'quantity_picked',
        'location_id',
        'picked_at',
        'picked_by',
    ];

    protected $casts = [
        'picked_at' => 'datetime',
    ];

    public function pickList()
    {
        return $this->belongsTo(PickList::class);
    }

    public function location()
    {
        return $this->belongsTo(WarehouseLocation::class, 'location_id');
    }

    public function isPicked(): bool
    {
        return $this->quantity_picked >= $this->quantity_required;
    }
}
