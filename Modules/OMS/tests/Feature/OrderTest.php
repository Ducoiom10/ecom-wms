<?php

use App\Exceptions\InvalidOrderStateException;
use Modules\Inventory\Models\Warehouse;
use Modules\OMS\Actions\ApproveOrder;
use Modules\OMS\Actions\CancelOrder;
use Modules\OMS\Actions\CreateOrder;
use Modules\OMS\Models\Order;
use Modules\OMS\Queries\GetCustomerOrders;
use Modules\OMS\Queries\GetOrderDetails;

function makeTestWarehouse(): Warehouse
{
    return Warehouse::firstOrCreate(
        ['code' => 'WH-OMS-TEST'],
        ['name' => 'OMS Test WH', 'address' => 'Test', 'manager_name' => 'Test']
    );
}

test('create order action creates order with items', function () {
    $warehouse = makeTestWarehouse();

    $action = new CreateOrder();
    $order  = $action([
        'user_id'      => 1,
        'warehouse_id' => $warehouse->id,
        'subtotal'     => 200.0,
        'tax'          => 20.0,
        'shipping'     => 0.0,
        'total'        => 220.0,
        'region'       => 'VN',
    ]);

    expect($order)->toBeInstanceOf(Order::class);
    expect($order->status)->toBe('pending');
    expect($order->total)->toBe(220.0);
});

test('approve order action transitions to approved', function () {
    $warehouse = makeTestWarehouse();
    $order     = Order::create([
        'user_id'      => 1,
        'warehouse_id' => $warehouse->id,
        'subtotal'     => 100.0,
        'total'        => 110.0,
        'region'       => 'VN',
    ]);

    $action  = new ApproveOrder();
    $updated = $action($order);

    expect($updated->status)->toBe('approved');
});

test('cancel order action transitions to cancelled', function () {
    $warehouse = makeTestWarehouse();
    $order     = Order::create([
        'user_id'      => 1,
        'warehouse_id' => $warehouse->id,
        'subtotal'     => 100.0,
        'total'        => 110.0,
        'region'       => 'VN',
    ]);

    $action  = new CancelOrder();
    $updated = $action($order, 'Customer request');

    expect($updated->status)->toBe('cancelled');
});

test('cancel order throws when already cancelled', function () {
    $warehouse = makeTestWarehouse();
    $order     = Order::create([
        'user_id'      => 1,
        'warehouse_id' => $warehouse->id,
        'subtotal'     => 100.0,
        'total'        => 110.0,
        'region'       => 'VN',
    ]);
    $order->forceStatus('cancelled');

    expect(fn() => (new CancelOrder())($order))
        ->toThrow(InvalidOrderStateException::class);
});

test('get customer orders query returns paginated results', function () {
    $query  = new GetCustomerOrders();
    $result = $query(1);

    expect($result)->toBeInstanceOf(\Illuminate\Pagination\LengthAwarePaginator::class);
});

test('get order details query returns order with items', function () {
    $warehouse = makeTestWarehouse();
    $order     = Order::create([
        'user_id'      => 1,
        'warehouse_id' => $warehouse->id,
        'subtotal'     => 50.0,
        'total'        => 55.0,
        'region'       => 'VN',
    ]);

    $query  = new GetOrderDetails();
    $found  = $query($order->id);

    expect($found->id)->toBe($order->id);
    expect($found->relationLoaded('items'))->toBeTrue();
});
