<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = ['name', 'email', 'password', 'role', 'is_active'];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'is_active'         => 'boolean',
        ];
    }

    // Filament: chỉ admin/staff vào được panel
    public function canAccessPanel(Panel $panel): bool
    {
        return in_array($this->role, ['admin', 'warehouse_mgr', 'staff', 'finance'])
            && $this->is_active;
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

    // Check permission via RBAC roles
    public function hasPermission(string $permission): bool
    {
        if ($this->role === 'admin') return true;

        return $this->roles->contains(
            fn($role) => $role->hasPermission($permission)
        );
    }

    // Filament Shield-compatible
    public function can($abilities, $arguments = []): bool
    {
        if ($this->role === 'admin') return true;
        if (is_string($abilities)) return $this->hasPermission($abilities);
        return parent::can($abilities, $arguments);
    }

    public function isAdmin(): bool    { return $this->role === 'admin'; }
    public function isCustomer(): bool { return $this->role === 'customer'; }
    public function isActive(): bool   { return (bool) $this->is_active; }
}
