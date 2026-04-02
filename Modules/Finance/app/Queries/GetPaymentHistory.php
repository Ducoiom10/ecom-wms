<?php

namespace Modules\Finance\Queries;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Modules\Finance\Models\Payment;

class GetPaymentHistory
{
    public function __invoke(array $filters = []): LengthAwarePaginator
    {
        $query = Payment::with(['order'])
            ->orderBy('created_at', 'desc');

        if (!empty($filters['order_id'])) {
            $query->where('order_id', $filters['order_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['gateway'])) {
            $query->where('gateway', $filters['gateway']);
        }

        $perPage = $filters['per_page'] ?? 20;

        return $query->paginate($perPage);
    }
}
