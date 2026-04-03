<?php

namespace Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    protected $fillable = [
        'stock_id',
        'type',
        'quantity',
        'reference_type',
        'reference_id',
        'note',
        'user_id'
    ];

    // Thuộc về 1 bản ghi tồn kho cụ thể
    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }
}
