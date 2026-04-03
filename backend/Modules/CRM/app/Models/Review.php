<?php

namespace Modules\CRM\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Catalog\Models\Product;
use App\Models\User;

class Review extends Model
{
    protected $fillable = [
        'product_id', 'user_id', 'rating', 'title',
        'content', 'images', 'helpful_count', 'is_flagged', 'is_visible',
    ];

    protected $casts = [
        'images'     => 'array',
        'is_flagged' => 'boolean',
        'is_visible' => 'boolean',
        'rating'     => 'integer',
    ];

    public function product()  { return $this->belongsTo(Product::class); }
    public function user()     { return $this->belongsTo(User::class); }
}
