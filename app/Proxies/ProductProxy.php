<?php

namespace App\Proxies;

use App\Core\DTOs\BaseDTO;
use Modules\Catalog\Models\Product;
use Illuminate\Support\Facades\Cache;
use Exception;

class ProductDTO extends BaseDTO
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public string $sku,
        public float $price,
        public ?string $description = null,
        public ?string $category = null,
        public ?string $brand = null,
        public array $images = [],
        public array $attributes = [],
        public array $variants = [],
        public int $totalStock = 0
    ) {}
}

class ProductProxy
{
    private const CACHE_TTL = 3600; // 1 hour
    private const CACHE_KEY_PREFIX = 'product:';

    /**
     * Get product details with caching
     */
    public function getDetails(int $productId): ?ProductDTO
    {
        $cacheKey = self::CACHE_KEY_PREFIX . $productId;

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($productId) {
            $product = Product::with([
                'category',
                'brand',
                'productVariants',
                'productImages',
                'productAttributeValues.attribute',
                'stocks'
            ])->find($productId);

            if (!$product) {
                return null;
            }

            return $this->mapProductToDTO($product);
        });
    }

    /**
     * Get multiple products details — single bulk query, then populate per-item cache.
     * Avoids N+1: one WITH() query instead of N separate getDetails() calls.
     */
    public function getMultipleDetails(array $productIds): array
    {
        // Serve cached items first, collect uncached ids
        $result    = [];
        $uncached  = [];

        foreach ($productIds as $id) {
            $cached = Cache::get(self::CACHE_KEY_PREFIX . $id);
            if ($cached) {
                $result[$id] = $cached;
            } else {
                $uncached[] = $id;
            }
        }

        if (empty($uncached)) {
            return $result;
        }

        // Single query for all uncached products
        $models = Product::with([
            'category',
            'brand',
            'productVariants',
            'productImages',
            'productAttributeValues.attribute',
            'stocks',
        ])->findMany($uncached);

        foreach ($models as $product) {
            $dto = $this->mapProductToDTO($product);
            Cache::put(self::CACHE_KEY_PREFIX . $product->id, $dto, self::CACHE_TTL);
            $result[$product->id] = $dto;
        }

        return $result;
    }

    /**
     * Get product with fresh data (bypass cache)
     */
    public function getFresh(int $productId): ?ProductDTO
    {
        $this->invalidateCache($productId);

        return $this->getDetails($productId);
    }

    /**
     * Map Product model to DTO
     */
    private function mapProductToDTO(Product $product): ProductDTO
    {
        // Get total stock across all warehouses
        $totalStock = $product->stocks->sum('quantity');

        // Map images
        $images = $product->productImages->map(fn($img) => [
            'id' => $img->id,
            'url' => $img->image_url,
            'alt_text' => $img->alt_text,
            'is_primary' => $img->is_primary,
            'sort_order' => $img->sort_order
        ])->values()->toArray();

        // Map attributes
        $attributes = $product->productAttributeValues->map(fn($attr) => [
            'id' => $attr->id,
            'name' => $attr->attribute->name,
            'data_type' => $attr->attribute->data_type,
            'value' => $attr->value,
            'is_required' => $attr->attribute->is_required
        ])->values()->toArray();

        // Map variants
        $variants = $product->productVariants->map(fn($v) => [
            'id' => $v->id,
            'sku' => $v->sku,
            'name' => $v->variant_name,
            'price' => $v->price_override ?? $product->price,
            'is_active' => $v->is_active
        ])->values()->toArray();

        return new ProductDTO(
            id: $product->id,
            name: $product->name,
            slug: $product->slug,
            sku: $product->sku,
            price: $product->price,
            description: $product->description,
            category: $product->category?->name,
            brand: $product->brand?->name,
            images: $images,
            attributes: $attributes,
            variants: $variants,
            totalStock: $totalStock
        );
    }

    /**
     * Invalidate cache for a product
     */
    public function invalidateCache(int $productId): bool
    {
        $cacheKey = self::CACHE_KEY_PREFIX . $productId;
        return Cache::forget($cacheKey);
    }

    /**
     * Invalidate cache for multiple products
     */
    public function invalidateMultiple(array $productIds): bool
    {
        foreach ($productIds as $productId) {
            $this->invalidateCache($productId);
        }
        return true;
    }

    /**
     * Invalidate all product cache
     */
    public function invalidateAll(): bool
    {
        return Cache::flush();
    }

    /**
     * Get cache statistics
     */
    public function getCacheStats(): array
    {
        // This would require Redis KEYS command which isn't ideal for production
        // Better to use a separate tracking mechanism
        return [
            'cache_prefix' => self::CACHE_KEY_PREFIX,
            'ttl_seconds' => self::CACHE_TTL,
            'ttl_minutes' => self::CACHE_TTL / 60
        ];
    }

    /**
     * Warm up cache for frequently accessed products.
     * Delegates to getMultipleDetails to avoid N+1.
     */
    public function warmupCache(array $productIds): array
    {
        $result = $this->getMultipleDetails($productIds);
        return array_keys($result);
    }

    /**
     * Check if product is cached
     */
    public function isCached(int $productId): bool
    {
        $cacheKey = self::CACHE_KEY_PREFIX . $productId;
        return Cache::has($cacheKey);
    }
}
