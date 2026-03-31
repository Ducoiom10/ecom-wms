<?php
require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Http\Kernel');

use Illuminate\Support\Facades\DB;

// Check users
echo "=== USERS IN DATABASE ===\n";
$users = DB::table('users')->select('id', 'name', 'email', 'role', 'is_active')->get();
foreach ($users as $user) {
    $status = $user->is_active ? 'Active' : 'Inactive';
    echo "ID: {$user->id} | Name: {$user->name} | Email: {$user->email} | Role: {$user->role} | Status: {$status}\n";
}

// Check table counts
echo "\n=== DATABASE TABLES ===\n";
$tables = [
    'users' => 'Users',
    'categories' => 'Categories',
    'products' => 'Products',
    'warehouses' => 'Warehouses',
    'warehouse_locations' => 'Locations',
    'stocks' => 'Stocks',
    'stock_movements' => 'Stock Movements',
];

foreach ($tables as $table => $name) {
    $count = DB::table($table)->count();
    echo "{$name}: {$count} records\n";
}
