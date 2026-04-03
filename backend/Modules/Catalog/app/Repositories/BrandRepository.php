<?php

namespace Modules\Catalog\Repositories;

use App\Core\Repositories\BaseRepository;
use Modules\Catalog\Models\Brand;
use Illuminate\Database\Eloquent\Collection;

class BrandRepository extends BaseRepository
{
    /**
     * Constructor
     */
    public function __construct(Brand $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all active brands
     */
    public function getActive(?int $limit = null): Collection
    {
        $query = $this->model->where('is_active', true);

        if ($limit) {
            $query->limit($limit);
        }

        return $query->get();
    }

    /**
     * Find brand by name
     */
    public function findByName(string $name): ?Brand
    {
        return $this->model->where('name', $name)->first();
    }

    /**
     * Search brands by name
     */
    public function search(string $query): Collection
    {
        return $this->model
            ->where('name', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->get();
    }

    /**
     * Get brands with product count
     */
    public function withProductCount(): Collection
    {
        return $this->model
            ->withCount('products')
            ->get();
    }

    /**
     * Get all inactive brands
     */
    public function getInactive(): Collection
    {
        return $this->model
            ->where('is_active', false)
            ->get();
    }
}
