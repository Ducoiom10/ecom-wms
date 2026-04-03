<?php

namespace Modules\CRM\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class LoyaltyAccount extends Model
{
    protected $fillable = ['user_id', 'points', 'tier', 'total_redeemed'];

    protected $casts = ['points' => 'integer', 'total_redeemed' => 'integer'];

    const TIERS = [
        'bronze'   => ['min' => 0,    'max' => 499,  'multiplier' => 1.0, 'discount' => 0,    'birthday_bonus' => 50],
        'silver'   => ['min' => 500,  'max' => 1499, 'multiplier' => 1.5, 'discount' => 0,    'birthday_bonus' => 100],
        'gold'     => ['min' => 1500, 'max' => 4999, 'multiplier' => 2.0, 'discount' => 0.05, 'birthday_bonus' => 200],
        'platinum' => ['min' => 5000, 'max' => PHP_INT_MAX, 'multiplier' => 3.0, 'discount' => 0.10, 'birthday_bonus' => 500],
    ];

    public function user()         { return $this->belongsTo(User::class); }
    public function transactions() { return $this->hasMany(LoyaltyTransaction::class); }

    public function resolveTier(): string
    {
        foreach (array_reverse(self::TIERS) as $tier => $config) {
            if ($this->points >= $config['min']) {
                return $tier;
            }
        }
        return 'bronze';
    }
}
