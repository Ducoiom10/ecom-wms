<?php

namespace Modules\PIM\Queries;

use Illuminate\Database\Eloquent\Collection;
use Modules\PIM\Models\GoodsReceiptNote;

class GetPendingGRNs
{
    public function __invoke(array $filters = []): Collection
    {
        $query = GoodsReceiptNote::where('status', 'pending')
            ->with(['purchaseOrder', 'warehouse']);

        if (!empty($filters['warehouse_id'])) {
            $query->where('warehouse_id', $filters['warehouse_id']);
        }

        return $query->orderBy('created_at')->get();
    }
}
