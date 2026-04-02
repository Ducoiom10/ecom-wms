<?php

namespace Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Modules\Inventory\Database\Factories\WarehouseFactory;

class Warehouse extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return \Modules\Inventory\Database\Factories\WarehouseFactory::new();
    }

    protected $fillable = ['code', 'name', 'address', 'manager_name', 'is_active'];

    // 1 Kho có nhiều Vị trí
    public function locations()
    {
        return $this->hasMany(WarehouseLocation::class);
    }
}
