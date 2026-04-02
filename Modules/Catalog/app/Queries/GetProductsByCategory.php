<?php

namespace Modules\Catalog\Queries;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Modules\Catalog\Models\Product;

class GetProductsByCategory
{
    public function __invoke(int $categoryId, array $filters = []): LengthAwarePaginator
    {
        $query = Product::where('category_id', $categoryId)
            ->where('is_active', true)
            ->with(['brand', 'productImages']);

        if (!empty($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }

        if (!empty($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        $perPage = $filters['per_page'] ?? 12;

        return $query->paginate($perPage);
    }
}
