<?php

namespace Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Model;
// use Modules\Inventory\Database\Factories\WarehouseLocationFactory;

class WarehouseLocation extends Model
{

    protected $fillable = ['warehouse_id', 'aisle', 'rack', 'level', 'bin', 'barcode', 'is_active'];

    // Thuộc về 1 Kho
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    // Có nhiều dữ liệu tồn kho tại vị trí này
    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }
}
