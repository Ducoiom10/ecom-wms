<?php

namespace Modules\Catalog\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductVariant extends Model
{
    use HasFactory;

    protected $table = 'product_variants';

    protected $fillable = [
        'product_id',
        'sku',
        'variant_name',
        'price_override',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price_override' => 'float',
    ];

    /**
     * Relations
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function stocks()
    {
        return $this->hasManyThrough(
            'Modules\Inventory\app\Models\Stock',
            Product::class,
            'id',
            'product_id',
            'product_id',
            'id'
        );
    }
}
