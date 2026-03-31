<?php

namespace Modules\PIM\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class GoodsReceiptNote extends Model
{
    use HasFactory;

    protected $table = 'goods_receipt_notes';

    protected $fillable = [
        'code',
        'po_id',
        'warehouse_id',
        'status',
        'receipt_date',
        'created_by',
        'notes',
    ];

    protected $casts = [
        'receipt_date' => 'date',
    ];

    /**
     * Relations
     */
    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class, 'po_id');
    }

    public function warehouse()
    {
        return $this->belongsTo('Modules\Inventory\Models\Warehouse', 'warehouse_id');
    }

    public function items()
    {
        return $this->hasMany(GRNItem::class, 'grn_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
