<?php

namespace Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Model;

class BinLocation extends Model
{
    protected $fillable = ['location_id', 'sub_code', 'capacity', 'current_utilization'];

    public function location()
    {
        return $this->belongsTo(WarehouseLocation::class, 'location_id');
    }

    public function getAvailableCapacityAttribute(): int
    {
        return $this->capacity - $this->current_utilization;
    }
}
