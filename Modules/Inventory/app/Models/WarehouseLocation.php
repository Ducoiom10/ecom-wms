<?php

namespace Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Modules\Inventory\Models\BinLocation;
use Modules\Inventory\Models\InventoryBatch;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\Warehouse;

class WarehouseLocation extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return \Modules\Inventory\Database\Factories\WarehouseLocationFactory::new();
    }

    protected $fillable = ['warehouse_id', 'aisle', 'rack', 'level', 'bin', 'barcode', 'is_active'];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }

    public function binLocations()
    {
        return $this->hasMany(BinLocation::class, 'location_id');
    }

    public function batches()
    {
        return $this->hasMany(InventoryBatch::class, 'warehouse_location_id');
    }

    public static function generateBarcode(string $warehouseCode, string $aisle, string $rack, string $level, string $bin): string
    {
        return implode('-', [$warehouseCode, $aisle, str_pad($rack, 2, '0', STR_PAD_LEFT), str_pad($level, 2, '0', STR_PAD_LEFT), str_pad($bin, 2, '0', STR_PAD_LEFT)]);
    }
}
