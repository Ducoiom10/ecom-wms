<?php

namespace Modules\Cart\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Modules\Cart\Services\CartService;

class CartController extends Controller
{
    public function __construct(private CartService $cart) {}

    // GET /api/cart/v1/cart
    public function index(Request $request)
    {
        $cart = $this->cart->getCart((string) $request->user()->id);
        return ApiResponse::success($cart->toArray());
    }

    // POST /api/cart/v1/cart/items
    public function addItem(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity'   => 'required|integer|min:1',
            'variant_id' => 'nullable|integer|exists:product_variants,id',
        ]);

        $this->cart->addItem(
            (string) $request->user()->id,
            $validated['product_id'],
            $validated['quantity'],
            $validated['variant_id'] ?? null
        );

        $cart = $this->cart->getCart((string) $request->user()->id);
        return ApiResponse::success($cart->toArray());
    }

    // PUT /api/cart/v1/cart/items/{productId}
    public function updateItem(Request $request, int $productId)
    {
        $validated = $request->validate([
            'quantity'   => 'required|integer|min:0',
            'variant_id' => 'nullable|integer',
        ]);

        $this->cart->updateQuantity(
            (string) $request->user()->id,
            $productId,
            $validated['quantity'],
            $validated['variant_id'] ?? null
        );

        $cart = $this->cart->getCart((string) $request->user()->id);
        return ApiResponse::success($cart->toArray());
    }

    // DELETE /api/cart/v1/cart/items/{productId}
    public function removeItem(Request $request, int $productId)
    {
        $variantId = $request->integer('variant_id') ?: null;

        $this->cart->removeItem((string) $request->user()->id, $productId, $variantId);

        $cart = $this->cart->getCart((string) $request->user()->id);
        return ApiResponse::success($cart->toArray());
    }

    // POST /api/cart/v1/cart/coupon
    public function applyCoupon(Request $request)
    {
        $validated = $request->validate(['code' => 'required|string|max:20']);

        $this->cart->applyCoupon((string) $request->user()->id, $validated['code']);

        $cart = $this->cart->getCart((string) $request->user()->id);
        return ApiResponse::success($cart->toArray());
    }

    // DELETE /api/cart/v1/cart/coupon
    public function removeCoupon(Request $request)
    {
        $this->cart->removeCoupon((string) $request->user()->id);

        $cart = $this->cart->getCart((string) $request->user()->id);
        return ApiResponse::success($cart->toArray());
    }
}
