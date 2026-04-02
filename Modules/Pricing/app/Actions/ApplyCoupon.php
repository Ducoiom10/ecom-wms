<?php

namespace Modules\Pricing\Actions;

use Exception;

class ApplyCoupon
{
    private const VALID_COUPONS = [
        'SAVE10'  => ['type' => 'percent',  'value' => 10.0],
        'SAVE20'  => ['type' => 'percent',  'value' => 20.0],
        'FLAT50K' => ['type' => 'fixed',    'value' => 50.0],
    ];

    public function __invoke(string $code, float $subtotal): array
    {
        $code   = strtoupper(trim($code));
        $coupon = self::VALID_COUPONS[$code] ?? null;

        if (!$coupon) {
            throw new Exception("Coupon '{$code}' is invalid or expired.");
        }

        $discount = $coupon['type'] === 'percent'
            ? round($subtotal * $coupon['value'] / 100, 2)
            : $coupon['value'];

        return [
            'code'     => $code,
            'type'     => $coupon['type'],
            'value'    => $coupon['value'],
            'discount' => $discount,
        ];
    }
}
