<?php

namespace Modules\PIM\app\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class PurchaseOrder extends Model
{
    use HasFactory;

    protected $table = 'purchase_orders';

    protected $fillable = [
        'code',
        'supplier_id',
        'warehouse_id',
        'status',
        'total_amount',
        'expected_delivery_date',
        'actual_delivery_date',
        'created_by',
        'approved_by',
        'notes',
    ];

    protected $casts = [
        'total_amount' => 'float',
        'expected_delivery_date' => 'date',
        'actual_delivery_date' => 'date',
    ];

    /**
     * Relations
     */
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function warehouse()
    {
        return $this->belongsTo('Modules\Inventory\app\Models\Warehouse', 'warehouse_id');
    }

    public function items()
    {
        return $this->hasMany(PurchaseOrderItem::class, 'po_id');
    }

    public function grns()
    {
        return $this->hasMany(GoodsReceiptNote::class, 'po_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
