<?php

namespace Modules\OMS\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Modules\OMS\Models\Order;

class OrderController extends Controller
{
    // GET /api/oms/v1/orders
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with(['items.product'])
            ->orderBy('created_at', 'desc')
            ->paginate($request->integer('limit', 10));

        return ApiResponse::success($orders);
    }

    // GET /api/oms/v1/orders/{id}
    public function show(Request $request, int $id)
    {
        $order = Order::where('user_id', $request->user()->id)
            ->with(['items.product.productImages'])
            ->findOrFail($id);

        return ApiResponse::success($order);
    }

    // POST /api/oms/v1/orders
    public function store(Request $request)
    {
        $validated = $request->validate([
            'warehouse_id'      => 'required|integer|exists:warehouses,id',
            'delivery_address'  => 'required|string',
            'region'            => 'required|string',
            'coupon_code'       => 'nullable|string',
            'items'             => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.price'      => 'required|numeric|min:0',
        ]);

        $subtotal = collect($validated['items'])->sum(fn($i) => $i['price'] * $i['quantity']);
        $tax      = $subtotal * 0.08;
        $shipping = 5.00;
        $total    = $subtotal + $tax + $shipping;

        $order = Order::create([
            'user_id'          => $request->user()->id,
            'warehouse_id'     => $validated['warehouse_id'],
            'delivery_address' => $validated['delivery_address'],
            'region'           => $validated['region'],
            'coupon_code'      => $validated['coupon_code'] ?? null,
            'subtotal'         => $subtotal,
            'tax'              => $tax,
            'shipping'         => $shipping,
            'discount'         => 0,
            'total'            => $total,
            'status'           => 'pending',
        ]);

        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['product_id'],
                'quantity'   => $item['quantity'],
                'unit_price' => $item['price'],
                'subtotal'   => $item['price'] * $item['quantity'],
            ]);
        }

        return ApiResponse::success($order->load('items'), 201);
    }

    // POST /api/oms/v1/orders/{id}/cancel
    public function cancel(Request $request, int $id)
    {
        $order = Order::where('user_id', $request->user()->id)->findOrFail($id);

        if (!$order->isCancellable()) {
            return ApiResponse::error('Không thể hủy đơn hàng ở trạng thái: ' . $order->status, null, 400);
        }

        $order->cancel();

        return ApiResponse::success(['message' => 'Đơn hàng đã được hủy']);
    }

    // GET /api/oms/v1/orders/{id}/tracking
    public function tracking(Request $request, int $id)
    {
        $order = Order::where('user_id', $request->user()->id)->findOrFail($id);

        return ApiResponse::success([
            'order_id'     => $order->id,
            'status'       => $order->status,
            'approved_at'  => $order->approved_at,
            'shipped_at'   => $order->shipped_at,
            'delivered_at' => $order->delivered_at,
        ]);
    }
}
