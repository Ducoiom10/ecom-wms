<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

beforeEach(function () {
    $this->admin = User::create([
        'name' => 'Admin', 'email' => 'admin-test-' . uniqid() . '@test.com',
        'password' => Hash::make('password'), 'role' => 'admin', 'is_active' => true,
    ]);

    $this->customer = User::create([
        'name' => 'Customer', 'email' => 'cust-test-' . uniqid() . '@test.com',
        'password' => Hash::make('password'), 'role' => 'customer', 'is_active' => true,
    ]);

    // Create permission and role
    $permission = Permission::firstOrCreate(['name' => 'products.create'], ['group' => 'products']);
    $role = Role::firstOrCreate(['name' => 'admin'], ['display_name' => 'Admin']);
    $role->permissions()->syncWithoutDetaching([$permission->id]);
    $this->admin->roles()->syncWithoutDetaching([$role->id]);
});

test('user with permission passes check.permission middleware', function () {
    $this->admin->loadMissing('roles.permissions');
    expect($this->admin->hasPermission('products.create'))->toBeTrue();
});

test('user without permission fails check.permission middleware', function () {
    $this->customer->loadMissing('roles.permissions');
    expect($this->customer->hasPermission('products.create'))->toBeFalse();
});

test('inactive user is denied access', function () {
    $this->admin->update(['is_active' => false]);
    expect($this->admin->fresh()->isActive())->toBeFalse();
});

test('super_admin has all permissions', function () {
    $superRole = Role::firstOrCreate(['name' => 'super_admin'], ['display_name' => 'Super Admin']);
    $reconcilePerm = Permission::firstOrCreate(['name' => 'payments.reconcile'], ['group' => 'payments']);
    $allPermissions = Permission::pluck('id')->toArray();
    $superRole->permissions()->sync($allPermissions);
    $this->admin->roles()->syncWithoutDetaching([$superRole->id]);

    $this->admin->load('roles.permissions');
    expect($this->admin->hasPermission('products.create'))->toBeTrue();
    expect($this->admin->hasPermission('payments.reconcile'))->toBeTrue();
});

test('role without permission denies access', function () {
    $emptyRole = Role::create(['name' => 'empty-' . uniqid(), 'display_name' => 'Empty']);
    $user = User::create([
        'name' => 'NoPerms', 'email' => 'noperms-' . uniqid() . '@test.com',
        'password' => Hash::make('password'), 'role' => 'customer', 'is_active' => true,
    ]);
    $user->roles()->attach($emptyRole->id);
    $user->load('roles.permissions');

    expect($user->hasPermission('products.create'))->toBeFalse();
});
