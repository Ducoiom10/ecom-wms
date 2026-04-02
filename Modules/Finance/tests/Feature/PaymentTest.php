<?php

use Modules\Finance\Actions\CreateInvoice;
use Modules\Finance\Models\Payment;
use Modules\Finance\Queries\GetPaymentHistory;
use Modules\Inventory\Models\Warehouse;
use Modules\OMS\Models\Order;

function makeFinanceOrder(): Order
{
    $warehouse = Warehouse::firstOrCreate(
        ['code' => 'WH-FIN-TEST'],
        ['name' => 'Finance Test WH', 'address' => 'Test', 'manager_name' => 'Test']
    );

    return Order::create([
        'user_id'      => 1,
        'warehouse_id' => $warehouse->id,
        'subtotal'     => 300.0,
        'total'        => 330.0,
        'region'       => 'VN',
    ]);
}

test('create invoice action creates payment record', function () {
    $order  = makeFinanceOrder();
    $action = new CreateInvoice();

    $payment = $action([
        'order_id' => $order->id,
        'gateway'  => 'vnpay',
        'amount'   => 330.0,
    ]);

    expect($payment)->toBeInstanceOf(Payment::class);
    expect($payment->status)->toBe('pending');
    expect($payment->reconciled)->toBe(false);
});

test('get payment history query returns paginated results', function () {
    $order   = makeFinanceOrder();

    Payment::create([
        'order_id'  => $order->id,
        'gateway'   => 'momo',
        'amount'    => 330.0,
        'status'    => 'paid',
        'reconciled' => true,
        'reconciled_at' => now(),
    ]);

    $query  = new GetPaymentHistory();
    $result = $query(['order_id' => $order->id]);

    expect($result)->toBeInstanceOf(\Illuminate\Pagination\LengthAwarePaginator::class);
    expect($result->total())->toBeGreaterThanOrEqual(1);
});

test('get payment history filters by status', function () {
    $order = makeFinanceOrder();

    Payment::create([
        'order_id'  => $order->id,
        'gateway'   => 'stripe',
        'amount'    => 100.0,
        'status'    => 'failed',
        'reconciled' => false,
    ]);

    $query  = new GetPaymentHistory();
    $result = $query(['status' => 'failed']);

    expect($result->total())->toBeGreaterThanOrEqual(1);
});
