<?php

namespace Modules\Inventory\Queries;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Modules\Inventory\Models\StockMovement;

class GetStockMovementHistory
{
    public function __invoke(array $filters = []): LengthAwarePaginator
    {
        $query = StockMovement::with(['product'])
            ->orderBy('created_at', 'desc');

        if (!empty($filters['product_id'])) {
            $query->where('product_id', $filters['product_id']);
        }

        if (!empty($filters['warehouse_location_id'])) {
            $query->where('warehouse_location_id', $filters['warehouse_location_id']);
        }

        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        $perPage = $filters['per_page'] ?? 20;

        return $query->paginate($perPage);
    }
}
