<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class RBACSeeder extends Seeder
{
    private const PERMISSIONS = [
        'products'  => ['create', 'read', 'update', 'delete'],
        'orders'    => ['view', 'approve', 'cancel'],
        'inventory' => ['view', 'adjust'],
        'payments'  => ['view', 'reconcile'],
        'reports'   => ['view'],
        'settings'  => ['manage'],
        'users'     => ['manage'],
        'roles'     => ['manage'],
    ];

    private const ROLES = [
        'super_admin'   => ['display_name' => 'Super Admin',        'permissions' => '*'],
        'admin'         => ['display_name' => 'Admin',              'permissions' => ['products.create', 'products.read', 'products.update', 'products.delete', 'orders.view', 'users.manage', 'reports.view']],
        'warehouse_mgr' => ['display_name' => 'Warehouse Manager',  'permissions' => ['inventory.view', 'inventory.adjust', 'orders.view', 'orders.approve']],
        'staff'         => ['display_name' => 'Staff',              'permissions' => ['products.read', 'orders.view', 'inventory.view']],
        'finance'       => ['display_name' => 'Finance',            'permissions' => ['payments.view', 'payments.reconcile', 'reports.view', 'orders.view']],
        'customer'      => ['display_name' => 'Customer',           'permissions' => ['orders.view']],
    ];

    public function run(): void
    {
        // Create all permissions
        $allPermissions = [];
        foreach (self::PERMISSIONS as $group => $actions) {
            foreach ($actions as $action) {
                $perm = Permission::firstOrCreate(
                    ['name' => "{$group}.{$action}"],
                    ['group' => $group]
                );
                $allPermissions["{$group}.{$action}"] = $perm->id;
            }
        }

        // Create roles and attach permissions
        foreach (self::ROLES as $roleName => $config) {
            $role = Role::firstOrCreate(
                ['name' => $roleName],
                ['display_name' => $config['display_name']]
            );

            if ($config['permissions'] === '*') {
                $role->permissions()->sync(array_values($allPermissions));
            } else {
                $ids = array_filter(
                    array_map(fn($p) => $allPermissions[$p] ?? null, $config['permissions'])
                );
                $role->permissions()->sync($ids);
            }
        }

        // Assign super_admin role to admin user
        $admin     = User::where('email', 'admin@ecom-wms.local')->first();
        $superRole = Role::where('name', 'super_admin')->first();
        if ($admin && $superRole) {
            $admin->roles()->syncWithoutDetaching([$superRole->id]);
        }

        // Assign customer role to customer user
        $customer     = User::where('email', 'customer@ecom-wms.local')->first();
        $customerRole = Role::where('name', 'customer')->first();
        if ($customer && $customerRole) {
            $customer->roles()->syncWithoutDetaching([$customerRole->id]);
        }
    }
}
