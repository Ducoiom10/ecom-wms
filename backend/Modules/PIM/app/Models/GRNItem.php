<?php

namespace Modules\PIM\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GRNItem extends Model
{
    use HasFactory;

    protected $table = 'grn_items';

    protected $fillable = [
        'grn_id',
        'po_item_id',
        'quantity_received',
        'quality_check_status',
        'batch_number',
        'expiry_date',
        'location_id',
    ];

    protected $casts = [
        'expiry_date' => 'date',
    ];

    /**
     * Relations
     */
    public function goodsReceiptNote()
    {
        return $this->belongsTo(GoodsReceiptNote::class, 'grn_id');
    }

    public function purchaseOrderItem()
    {
        return $this->belongsTo(PurchaseOrderItem::class, 'po_item_id');
    }

    public function location()
    {
        return $this->belongsTo('Modules\Inventory\Models\WarehouseLocation', 'location_id');
    }
}
