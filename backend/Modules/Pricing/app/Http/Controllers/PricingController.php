<?php

namespace Modules\Pricing\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Modules\Pricing\Services\PricingService;

class PricingController extends Controller
{
    public function __construct(private PricingService $pricing) {}

    // POST /api/v1/pricing/calculate
    public function calculate(Request $request)
    {
        $validated = $request->validate([
            'subtotal'       => 'required|numeric|min:0',
            'region'         => 'nullable|string|max:10',
            'voucher_pct'    => 'nullable|numeric|min:0|max:100',
            'voucher_fixed'  => 'nullable|numeric|min:0',
            'loyalty_points' => 'nullable|integer|min:0',
        ]);

        $result = $this->pricing->calculate(
            subtotal:      $validated['subtotal'],
            region:        $validated['region'] ?? 'VN',
            voucherPct:    ($validated['voucher_pct'] ?? 0) / 100,
            voucherFixed:  $validated['voucher_fixed'] ?? 0,
            loyaltyPoints: $validated['loyalty_points'] ?? 0,
        );

        return ApiResponse::success($result);
    }

    // POST /api/v1/pricing/shipping
    public function shipping(Request $request)
    {
        $validated = $request->validate([
            'subtotal' => 'required|numeric|min:0',
            'region'   => 'nullable|string|max:10',
        ]);

        $shipping = $validated['subtotal'] >= 100.0 ? 0.0 : 5.0;

        return ApiResponse::success(['shipping' => $shipping]);
    }

    // POST /api/v1/pricing/validate-coupon
    public function validateCoupon(Request $request)
    {
        $validated = $request->validate([
            'code'     => 'required|string|max:20',
            'subtotal' => 'required|numeric|min:0',
        ]);

        // Placeholder — real implementation queries a coupons table
        return ApiResponse::success([
            'valid'         => false,
            'message'       => 'Coupon validation not yet implemented.',
            'discount'      => 0,
        ]);
    }
}
