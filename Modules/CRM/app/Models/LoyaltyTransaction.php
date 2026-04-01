<?php

namespace Modules\CRM\Models;

use Illuminate\Database\Eloquent\Model;

class LoyaltyTransaction extends Model
{
    protected $fillable = ['loyalty_account_id', 'points', 'type', 'reason', 'reference_id'];

    protected $casts = ['points' => 'integer'];

    public function account() { return $this->belongsTo(LoyaltyAccount::class, 'loyalty_account_id'); }
}
