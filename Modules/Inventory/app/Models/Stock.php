<?php

namespace Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Modules\Catalog\Models\Product;

class Stock extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return \Modules\Inventory\Database\Factories\StockFactory::new();
    }

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
