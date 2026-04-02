<?php

namespace Modules\Cart\Queries;

use Modules\Cart\DTOs\CartDTO;
use Modules\Cart\Services\CartService;

class GetCart
{
    public function __construct(private CartService $cart) {}

    public function __invoke(string $userId): CartDTO
    {
        return $this->cart->getCart($userId);
    }
}
