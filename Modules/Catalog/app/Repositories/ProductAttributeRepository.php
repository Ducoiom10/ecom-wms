<?php

namespace Modules\Catalog\app\Repositories;

use App\Core\Repositories\BaseRepository;
use Modules\Catalog\app\Models\ProductAttribute;
use Illuminate\Database\Eloquent\Collection;

class ProductAttributeRepository extends BaseRepository
{
    /**
     * Constructor
     */
    public function __construct(ProductAttribute $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all attributes with values count
     */
    public function getAllWithCount(): Collection
    {
        return $this->model
            ->withCount('productAttributeValues')
            ->get();
    }

    /**
     * Find attribute by name
     */
    public function findByName(string $name): ?ProductAttribute
    {
        return $this->model->where('name', $name)->first();
    }

    /**
     * Filter attributes by data type
     */
    public function filterByType(string $dataType): Collection
    {
        return $this->model
            ->where('data_type', $dataType)
            ->get();
    }

    /**
     * Get required attributes
     */
    public function getRequired(): Collection
    {
        return $this->model
            ->where('is_required', true)
            ->get();
    }

    /**
     * Get optional attributes
     */
    public function getOptional(): Collection
    {
        return $this->model
            ->where('is_required', false)
            ->get();
    }

    /**
     * Search attributes by name
     */
    public function search(string $query): Collection
    {
        return $this->model
            ->where('name', 'like', "%{$query}%")
            ->get();
    }

    /**
     * Get attributes with their values for a product
     */
    public function getProductAttributes(int $productId): Collection
    {
        return $this->model
            ->with(['productAttributeValues' => function ($query) use ($productId) {
                $query->where('product_id', $productId);
            }])
            ->get();
    }

    /**
     * Get available data types
     */
    public function getAvailableDataTypes(): array
    {
        return ['string', 'integer', 'boolean', 'json', 'enum'];
    }

    /**
     * Count attributes by type
     */
    public function countByType(): array
    {
        return $this->model
            ->selectRaw('data_type, COUNT(*) as count')
            ->groupBy('data_type')
            ->pluck('count', 'data_type')
            ->toArray();
    }
}
