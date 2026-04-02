<?php

namespace Modules\Cart\Actions;

use Modules\Cart\Services\CartService;

class AddToCart
{
    public function __construct(private CartService $cart) {}

    public function __invoke(string $userId, int $productId, int $quantity, ?int $variantId = null): void
    {
        $this->cart->addItem($userId, $productId, $quantity, $variantId);
    }
}
