<?php

namespace Modules\CRM\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Address extends Model
{
    protected $fillable = [
        'user_id', 'type', 'street', 'city',
        'state', 'postal_code', 'country', 'is_default',
    ];

    protected $casts = ['is_default' => 'boolean'];

    public function user() { return $this->belongsTo(User::class); }
}
