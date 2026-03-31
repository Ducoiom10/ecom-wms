<?php

namespace Modules\Catalog\Services;

use App\Core\Services\BaseService;
use Modules\Catalog\Models\Product;
use Modules\Catalog\Models\ProductVariant;
use Modules\Catalog\Models\ProductImage;
use Modules\Catalog\Repositories\ProductRepository;
use Modules\Catalog\Repositories\BrandRepository;
use Modules\Catalog\Repositories\ProductAttributeRepository;
use Illuminate\Http\UploadedFile;
use Exception;

class ProductService extends BaseService
{
    protected ProductRepository $productRepository;
    protected BrandRepository $brandRepository;
    protected ProductAttributeRepository $attributeRepository;

    /**
     * Constructor
     */
    public function __construct(
        ProductRepository $productRepository,
        BrandRepository $brandRepository,
        ProductAttributeRepository $attributeRepository
    ) {
        $this->productRepository = $productRepository;
        $this->brandRepository = $brandRepository;
        $this->attributeRepository = $attributeRepository;
    }

    /**
     * Create a new product
     */
    public function createProduct(array $data): Product
    {
        return $this->executeInTransaction(function () use ($data) {
            // Validate brand exists
            if (isset($data['brand_id'])) {
                $brand = $this->brandRepository->findById($data['brand_id']);
                if (!$brand) {
                    throw new Exception("Brand with ID {$data['brand_id']} not found");
                }
            }

            $product = $this->productRepository->create($data);

            $this->logSuccess('Product created', [
                'product_id' => $product->id,
                'product_name' => $product->name,
                'sku' => $product->sku
            ]);

            return $product;
        });
    }

    /**
     * Update existing product
     */
    public function updateProduct(int $id, array $data): Product
    {
        return $this->executeInTransaction(function () use ($id, $data) {
            $product = $this->productRepository->findById($id);

            if (!$product) {
                throw new Exception("Product with ID {$id} not found");
            }

            // Validate brand if updating
            if (isset($data['brand_id'])) {
                $brand = $this->brandRepository->findById($data['brand_id']);
                if (!$brand) {
                    throw new Exception("Brand with ID {$data['brand_id']} not found");
                }
            }

            $this->productRepository->update($id, $data);

            $this->logSuccess('Product updated', [
                'product_id' => $id,
                'updated_fields' => array_keys($data)
            ]);

            return $this->productRepository->findById($id);
        });
    }

    /**
     * Add product variant
     */
    public function addProductVariant(int $productId, array $data): ProductVariant
    {
        return $this->executeInTransaction(function () use ($productId, $data) {
            $product = $this->productRepository->findById($productId);

            if (!$product) {
                throw new Exception("Product with ID {$productId} not found");
            }

            // Check if SKU is unique
            $existingSku = ProductVariant::where('sku', $data['sku'])->first();
            if ($existingSku) {
                throw new Exception("SKU {$data['sku']} already exists");
            }

            $data['product_id'] = $productId;
            $variant = ProductVariant::create($data);

            $this->logSuccess('Product variant created', [
                'variant_id' => $variant->id,
                'product_id' => $productId,
                'sku' => $variant->sku
            ]);

            return $variant;
        });
    }

    /**
     * Upload product image
     */
    public function uploadProductImage(int $productId, UploadedFile $file, array $data = []): ProductImage
    {
        return $this->executeInTransaction(function () use ($productId, $file, $data) {
            $product = $this->productRepository->findById($productId);

            if (!$product) {
                throw new Exception("Product with ID {$productId} not found");
            }

            // Store file
            $path = $file->store('products/' . $productId, 'public');
            $imageUrl = asset('storage/' . $path);

            // Create image record
            $imageData = array_merge([
                'product_id' => $productId,
                'image_url' => $imageUrl,
                'alt_text' => $data['alt_text'] ?? $product->name,
                'is_primary' => $data['is_primary'] ?? false,
                'sort_order' => $data['sort_order'] ?? 0
            ]);

            // If primary, unset other primary images
            if ($imageData['is_primary']) {
                ProductImage::where('product_id', $productId)
                    ->update(['is_primary' => false]);
            }

            $image = ProductImage::create($imageData);

            $this->logSuccess('Product image uploaded', [
                'image_id' => $image->id,
                'product_id' => $productId,
                'path' => $path
            ]);

            return $image;
        });
    }

    /**
     * Set product attributes
     */
    public function setProductAttributes(int $productId, array $attributes): void
    {
        $this->executeInTransaction(function () use ($productId, $attributes) {
            $product = $this->productRepository->findById($productId);

            if (!$product) {
                throw new Exception("Product with ID {$productId} not found");
            }

            // Clear existing attributes
            $product->productAttributeValues()->delete();

            // Add new attributes
            foreach ($attributes as $attributeId => $value) {
                $attribute = $this->attributeRepository->findById($attributeId);

                if (!$attribute) {
                    throw new Exception("Attribute with ID {$attributeId} not found");
                }

                $product->productAttributeValues()->create([
                    'attribute_id' => $attributeId,
                    'value' => is_array($value) ? json_encode($value) : $value
                ]);
            }

            $this->logSuccess('Product attributes set', [
                'product_id' => $productId,
                'attributes_count' => count($attributes)
            ]);
        });
    }

    /**
     * Delete product
     */
    public function deleteProduct(int $id): bool
    {
        return $this->executeInTransaction(function () use ($id) {
            $product = $this->productRepository->findById($id);

            if (!$product) {
                throw new Exception("Product with ID {$id} not found");
            }

            // Delete related data
            $product->productVariants()->delete();
            $product->productImages()->delete();
            $product->productAttributeValues()->delete();

            $deleted = $this->productRepository->delete($id);

            if ($deleted) {
                $this->logSuccess('Product deleted', ['product_id' => $id]);
            }

            return $deleted;
        });
    }

    /**
     * Get product with all details
     */
    public function getProductDetails(int $id): ?Product
    {
        return $this->productRepository->findWithRelations($id);
    }

    /**
     * Activate product
     */
    public function activateProduct(int $id): bool
    {
        return $this->executeInTransaction(function () use ($id) {
            $updated = $this->productRepository->update($id, ['is_active' => true]);

            if ($updated) {
                $this->logSuccess('Product activated', ['product_id' => $id]);
            }

            return $updated;
        });
    }

    /**
     * Deactivate product
     */
    public function deactivateProduct(int $id): bool
    {
        return $this->executeInTransaction(function () use ($id) {
            $updated = $this->productRepository->update($id, ['is_active' => false]);

            if ($updated) {
                $this->logSuccess('Product deactivated', ['product_id' => $id]);
            }

            return $updated;
        });
    }
}
