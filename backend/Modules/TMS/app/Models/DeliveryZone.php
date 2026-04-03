<?php

namespace Modules\TMS\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryZone extends Model
{
    protected $fillable = ['name', 'province_code', 'base_shipping_fee', 'is_active'];

    protected $casts = [
        'base_shipping_fee' => 'float',
        'is_active'         => 'boolean',
    ];

    public function shipments()
    {
        return $this->hasMany(Shipment::class, 'zone_id');
    }
}
