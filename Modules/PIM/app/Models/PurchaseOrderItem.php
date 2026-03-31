<?php

namespace Modules\PIM\app\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PurchaseOrderItem extends Model
{
    use HasFactory;

    protected $table = 'purchase_order_items';

    protected $fillable = [
        'po_id',
        'product_id',
        'quantity',
        'unit_price',
        'received_quantity',
    ];

    protected $casts = [
        'unit_price' => 'float',
    ];

    /**
     * Relations
     */
    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class, 'po_id');
    }

    public function product()
    {
        return $this->belongsTo('Modules\Catalog\app\Models\Product', 'product_id');
    }

    public function grnItems()
    {
        return $this->hasMany(GRNItem::class, 'po_item_id');
    }
}
