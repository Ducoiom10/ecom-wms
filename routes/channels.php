<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Inventory updates — public channel
Broadcast::channel('inventory', function () {
    return true;
});

// Warehouse-specific updates — requires admin role
Broadcast::channel('warehouse.{warehouseId}', function ($user, $warehouseId) {
    return $user->isAdmin();
});
