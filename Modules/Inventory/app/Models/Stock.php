<?php

namespace Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Catalog\Models\Product; // BẮT BUỘC IMPORT: Gọi Model từ Module Catalog sang để thiết lập quan hệ

class Stock extends Model
{
    protected $fillable = ['product_id', 'warehouse_location_id', 'quantity', 'reserved_quantity'];

    // Thuộc về 1 Sản phẩm
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Nằm tại 1 Vị trí kho cụ thể
    public function location()
    {
        return $this->belongsTo(WarehouseLocation::class, 'warehouse_location_id');
    }
}
