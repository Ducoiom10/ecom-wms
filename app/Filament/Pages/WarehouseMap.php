<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Modules\Inventory\Models\Warehouse;
use Modules\Inventory\Models\WarehouseLocation;
use Modules\Inventory\Models\Stock;

class WarehouseMap extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-map';
    protected static ?string $navigationGroup = '📦 Inventory & WMS';
    protected static ?string $navigationLabel = 'Bản đồ kho';
    protected static ?int $navigationSort = 4;
    protected static string $view = 'filament.pages.warehouse-map';

    public ?int $selectedWarehouseId = null;

    public function mount(): void
    {
        $this->selectedWarehouseId = Warehouse::where('is_active', true)->first()?->id;
    }

    public function getWarehousesProperty()
    {
        return Warehouse::where('is_active', true)->get();
    }

    public function getMapDataProperty(): array
    {
        if (!$this->selectedWarehouseId) return [];

        $locations = WarehouseLocation::where('warehouse_id', $this->selectedWarehouseId)
            ->where('is_active', true)
            ->with('stocks')
            ->get();

        $map = [];
        foreach ($locations as $loc) {
            $totalQty    = $loc->stocks->sum('quantity');
            $reservedQty = $loc->stocks->sum('reserved_quantity');
            $map[$loc->aisle][$loc->rack][] = [
                'id'          => $loc->id,
                'barcode'     => $loc->barcode,
                'level'       => $loc->level,
                'bin'         => $loc->bin,
                'quantity'    => $totalQty,
                'reserved'    => $reservedQty,
                'utilization' => $totalQty > 0 ? min(100, round(($totalQty / 100) * 100)) : 0,
            ];
        }

        return $map;
    }
}
