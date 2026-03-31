<?php

namespace Modules\Catalog\Repositories;

use App\Core\Repositories\BaseRepository;
use Modules\Catalog\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\Paginator;

class ProductRepository extends BaseRepository
{
    /**
     * Constructor
     */
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all active products with relations
     */
    public function getAllActive(?int $limit = null): Collection
    {
        $query = $this->model
            ->where('is_active', true)
            ->with(['category', 'brand', 'variants', 'images']);

        if ($limit) {
            $query->limit($limit);
        }

        return $query->get();
    }

    /**
     * Find product with all relations
     */
    public function findWithRelations($id): ?Product
    {
        return $this->model
            ->with([
                'category',
                'brand',
                'productVariants',
                'productImages',
                'productAttributeValues.attribute',
                'stocks'
            ])
            ->find($id);
    }

    /**
     * Find products by category
     */
    public function findByCategory(int $categoryId): Collection
    {
        return $this->model
            ->where('category_id', $categoryId)
            ->where('is_active', true)
            ->with(['brand', 'category'])
            ->get();
    }

    /**
     * Find product by SKU
     */
    public function findBySku(string $sku): ?Product
    {
        return $this->model->where('sku', $sku)->first();
    }

    /**
     * Find products by brand
     */
    public function findByBrand(int $brandId): Collection
    {
        return $this->model
            ->where('brand_id', $brandId)
            ->where('is_active', true)
            ->get();
    }

    /**
     * Search products by name, description, or SKU
     */
    public function search(string $query): Collection
    {
        return $this->model
            ->where('name', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->orWhere('sku', 'like', "%{$query}%")
            ->where('is_active', true)
            ->with(['category', 'brand'])
            ->get();
    }

    /**
     * Get paginated active products
     */
    public function paginateActive(int $perPage = 15): Paginator
    {
        return $this->model
            ->where('is_active', true)
            ->with(['category', 'brand', 'productImages'])
            ->paginate($perPage);
    }

    /**
     * Get products with low stock
     */
    public function getLowStock(int $threshold = 10): Collection
    {
        return $this->model
            ->with('stocks')
            ->whereHas('stocks', function ($query) use ($threshold) {
                $query->where('quantity', '<', $threshold);
            })
            ->get();
    }

    /**
     * Get products with specific attribute value
     */
    public function findByAttributeValue(int $attributeId, $value): Collection
    {
        return $this->model
            ->with(['productAttributeValues'])
            ->whereHas('productAttributeValues', function ($query) use ($attributeId, $value) {
                $query->where('attribute_id', $attributeId)
                    ->whereJsonContains('value', $value);
            })
            ->get();
    }

    /**
     * Get products with variants
     */
    public function getWithVariants(): Collection
    {
        return $this->model
            ->with(['productVariants', 'brand', 'category'])
            ->where('is_active', true)
            ->get();
    }

    /**
     * Count products by category
     */
    public function countByCategory(int $categoryId): int
    {
        return $this->model
            ->where('category_id', $categoryId)
            ->where('is_active', true)
            ->count();
    }
}
