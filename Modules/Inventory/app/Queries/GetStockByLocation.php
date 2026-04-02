<?php

namespace Modules\Inventory\Queries;

use Illuminate\Database\Eloquent\Collection;
use Modules\Inventory\Models\Stock;

class GetStockByLocation
{
    public function __invoke(int $warehouseLocationId, array $filters = []): Collection
    {
        $query = Stock::where('warehouse_location_id', $warehouseLocationId)
            ->with(['product']);

        if (isset($filters['low_stock'])) {
            $query->where('quantity', '<=', $filters['low_stock_threshold'] ?? 10);
        }

        return $query->get();
    }
}
