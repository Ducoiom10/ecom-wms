<?php

namespace Modules\PIM\Queries;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Modules\PIM\Models\PurchaseOrder;

class GetSupplierOrders
{
    public function __invoke(int $supplierId, array $filters = []): LengthAwarePaginator
    {
        $query = PurchaseOrder::where('supplier_id', $supplierId)
            ->with(['supplier', 'items']);

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        $perPage = $filters['per_page'] ?? 15;

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }
}
