<?php

namespace Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Catalog\Models\Product;

class InventoryBatch extends Model
{
    protected $fillable = [
        'product_id',
        'warehouse_location_id',
        'batch_number',
        'purchase_order_id',
        'grn_id',
        'quantity',
        'expiry_date',
        'received_date',
        'fifo_sequence',
    ];

    protected $casts = [
        'expiry_date'    => 'date',
        'received_date'  => 'datetime',
        'fifo_sequence'  => 'datetime',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function location()
    {
        return $this->belongsTo(WarehouseLocation::class, 'warehouse_location_id');
    }
}
