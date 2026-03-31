<?php

namespace Modules\Catalog\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'parent_id', 'is_active'];

    // Quan hệ đệ quy: 1 Category có thể có nhiều Subcategories
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    // Quan hệ ngược: 1 Category có thể thuộc về 1 Parent Category
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // Một Category có nhiều Products
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
