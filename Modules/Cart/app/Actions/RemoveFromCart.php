<?php

namespace Modules\Cart\Actions;

use Modules\Cart\Services\CartService;

class RemoveFromCart
{
    public function __construct(private CartService $cart) {}

    public function __invoke(string $userId, int $productId, ?int $variantId = null): void
    {
        $this->cart->removeItem($userId, $productId, $variantId);
    }
}
