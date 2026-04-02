<?php

namespace Modules\Cart\Actions;

use Modules\Cart\Services\CartService;

class UpdateCartQuantity
{
    public function __construct(private CartService $cart) {}

    public function __invoke(string $userId, int $productId, int $quantity, ?int $variantId = null): void
    {
        $this->cart->updateQuantity($userId, $productId, $quantity, $variantId);
    }
}
