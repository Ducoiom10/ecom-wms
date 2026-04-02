<?php

namespace Modules\WMS\Queries;

use Illuminate\Database\Eloquent\Collection;
use Modules\WMS\Models\PickList;

class GetPendingPickLists
{
    public function __invoke(array $filters = []): Collection
    {
        $query = PickList::where('status', PickList::STATUS_PENDING)
            ->with(['warehouse']);

        if (!empty($filters['warehouse_id'])) {
            $query->where('warehouse_id', $filters['warehouse_id']);
        }

        return $query->orderBy('created_at')->get();
    }
}
