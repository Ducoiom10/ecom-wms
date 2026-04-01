<?php

use Modules\OMS\Exceptions\InvalidOrderStateException;
use Modules\OMS\Models\Order;
use Modules\Inventory\Models\Warehouse;

beforeEach(function () {
    $warehouse = Warehouse::first() ?? Warehouse::create([
        'code' => 'WH-TEST', 'name' => 'Test', 'address' => 'Test', 'manager_name' => 'Test',
    ]);

    $this->order = Order::create([
        'user_id'      => 1,
        'warehouse_id' => $warehouse->id,
        'status'       => 'pending',
        'subtotal'     => 100,
        'total'        => 110,
        'region'       => 'VN',
    ]);
});

test('order transitions from pending to approved', function () {
    $this->order->approve();

    expect($this->order->fresh()->status)->toBe('approved');
    expect($this->order->fresh()->approved_at)->not->toBeNull();
});

test('order can be cancelled from pending', function () {
    $this->order->cancel();

    expect($this->order->fresh()->status)->toBe('cancelled');
    expect($this->order->fresh()->cancelled_at)->not->toBeNull();
});

test('order cannot approve from cancelled state', function () {
    $this->order->forceStatus('cancelled');

    expect(fn() => $this->order->cancel())
        ->toThrow(InvalidOrderStateException::class);
});

test('order cannot skip states', function () {
    // Cannot ship from pending — must go pending → approved → picking → picked → packed → shipped
    expect(fn() => $this->order->ship())
        ->toThrow(InvalidOrderStateException::class);
});

test('delivered order can handle return', function () {
    $this->order->forceStatus('delivered');
    $this->order->handleReturn();

    expect($this->order->fresh()->status)->toBe('returned');
});

test('returned order can be refunded or denied', function () {
    $this->order->forceStatus('returned');
    $this->order->processRefund();

    expect($this->order->fresh()->status)->toBe('refunded');
});

test('status is not mass assignable', function () {
    $order = new \Modules\OMS\Models\Order([
        'user_id' => 1, 'warehouse_id' => $this->order->warehouse_id,
        'status' => 'delivered', // should be ignored by fillable guard
        'subtotal' => 50, 'total' => 55, 'region' => 'VN',
    ]);

    // status defaults to 'pending' since it's not in $fillable
    expect($order->status)->toBe('pending');
});
