<?php

namespace Modules\Finance\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Modules\Finance\Models\Payment;
use Modules\OMS\Models\Order;

class FinanceController extends Controller
{
    // GET /api/v1/payments
    public function index(Request $request)
    {
        $payments = Payment::with('order')
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->latest()
            ->paginate($request->integer('limit', 20));

        return ApiResponse::success($payments);
    }

    // GET /api/v1/payments/{id}
    public function show(int $id)
    {
        $payment = Payment::with('order')->findOrFail($id);
        return ApiResponse::success($payment);
    }

    // POST /api/v1/payments/{id}/refund
    public function refund(int $id)
    {
        $payment = Payment::findOrFail($id);

        if ($payment->status !== 'paid') {
            return ApiResponse::error('Only paid payments can be refunded.', null, 422);
        }

        $payment->update(['status' => 'refunded']);

        return ApiResponse::success(['message' => 'Payment refunded.']);
    }

    // GET /api/v1/finance/summary
    public function summary()
    {
        return ApiResponse::success([
            'revenue_30d'   => Order::where('status', 'delivered')
                ->where('created_at', '>=', now()->subDays(30))->sum('total'),
            'orders_30d'    => Order::where('created_at', '>=', now()->subDays(30))->count(),
            'cancelled_30d' => Order::where('status', 'cancelled')
                ->where('created_at', '>=', now()->subDays(30))->count(),
            'paid_30d'      => Payment::where('status', 'paid')
                ->where('created_at', '>=', now()->subDays(30))->count(),
        ]);
    }
}
