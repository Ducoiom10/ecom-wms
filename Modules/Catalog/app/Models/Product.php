<?php

namespace Modules\Catalog\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Modules\Inventory\Models\Stock;
use Modules\Catalog\Models\Brand;
use Modules\Catalog\Models\Category;
use Modules\Catalog\Models\ProductVariant;
use Modules\Catalog\Models\ProductImage;
use Modules\Catalog\Models\ProductAttributeValue;

class Product extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return \Modules\Catalog\Database\Factories\ProductFactory::new();
    }

    protected $fillable = ['name', 'slug', 'sku', 'description', 'price', 'category_id', 'brand_id', 'is_active'];

    /**
     * Relations
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function productVariants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function attributeValues()
    {
        return $this->hasMany(ProductAttributeValue::class);
    }

    public function productAttributeValues()
    {
        return $this->hasMany(ProductAttributeValue::class);
    }

    // 1 Sản phẩm có nhiều dòng tồn kho (nằm rải rác ở nhiều vị trí)
    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }

    // Hàm tiện ích: Tính tổng tồn kho khả dụng của sản phẩm này trên toàn quốc
    public function getAvailableStockAttribute()
    {
        // Lấy tổng quantity trừ đi những đơn hàng đã giữ chỗ (reserved_quantity)
        return $this->stocks()->sum('quantity') - $this->stocks()->sum('reserved_quantity');
    }
}
