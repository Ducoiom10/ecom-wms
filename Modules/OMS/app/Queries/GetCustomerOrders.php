<?php

namespace Modules\OMS\Queries;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Modules\OMS\Models\Order;

class GetCustomerOrders
{
    public function __invoke(int $userId, array $filters = []): LengthAwarePaginator
    {
        $query = Order::where('user_id', $userId)
            ->with(['items']);

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        $perPage = $filters['per_page'] ?? 15;

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }
}
