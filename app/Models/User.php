<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'is_active'         => 'boolean',
        ];
    }

    // FilamentUser contract — chỉ admin mới vào được panel
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->isAdmin() && $this->isActive();
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    public function addresses()
    {
        return $this->hasMany(\Modules\CRM\Models\Address::class);
    }

    public function loyaltyAccount()
    {
        return $this->hasOne(\Modules\CRM\Models\LoyaltyAccount::class);
    }

    public function hasPermission(string $permission): bool
    {
        return $this->roles->contains(
            fn($role) => $role->hasPermission($permission)
        );
    }

    public function isAdmin(): bool    { return $this->role === 'admin'; }
    public function isCustomer(): bool { return $this->role === 'customer'; }
    public function isActive(): bool   { return (bool) $this->is_active; }
}
