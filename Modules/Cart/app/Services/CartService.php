<?php

namespace Modules\Cart\Services;

use Illuminate\Support\Facades\Redis;
use Modules\Cart\DTOs\CartDTO;
use Modules\Cart\DTOs\CartItemDTO;
use Modules\Catalog\Models\Product;
use Modules\Catalog\Models\ProductVariant;
use Exception;

class CartService
{
    private const TTL     = 86400; // 24 hours
    private const TAX_RATE = 0.08;
    private const SHIPPING = 5.00;

    private function key(string $userId): string
    {
        return "cart:{$userId}";
    }

    private function get(string $userId): array
    {
        $raw = Redis::get($this->key($userId));
        return $raw ? json_decode($raw, true) : ['items' => []];
    }

    private function save(string $userId, array $data): void
    {
        $data = $this->recalculate($data);
        $data['expires_at'] = now()->addSeconds(self::TTL)->toISOString();
        Redis::setex($this->key($userId), self::TTL, json_encode($data));
    }

    private function recalculate(array $data): array
    {
        $subtotal = array_sum(
            array_map(fn($i) => $i['price'] * $i['quantity'], $data['items'])
        );

        $data['subtotal'] = round($subtotal, 2);
        $data['tax']      = round($subtotal * self::TAX_RATE, 2);
        $data['shipping'] = empty($data['items']) ? 0.0 : self::SHIPPING;
        $data['total']    = round($data['subtotal'] + $data['tax'] + $data['shipping'], 2);

        return $data;
    }

    public function addItem(string $userId, int $productId, int $quantity, ?int $variantId = null): void
    {
        if ($quantity <= 0) {
            throw new Exception('Quantity must be greater than 0.');
        }

        // Resolve price from variant or product
        if ($variantId) {
            $variant = ProductVariant::findOrFail($variantId);
            $price   = $variant->price_override ?? Product::findOrFail($productId)->price;
        } else {
            $price = Product::findOrFail($productId)->price;
        }

        $data = $this->get($userId);

        // Find existing item index
        $index = $this->findItemIndex($data['items'], $productId, $variantId);

        if ($index !== null) {
            $data['items'][$index]['quantity'] += $quantity;
        } else {
            $data['items'][] = [
                'product_id' => $productId,
                'variant_id' => $variantId,
                'quantity'   => $quantity,
                'price'      => $price,
                'added_at'   => now()->toISOString(),
            ];
        }

        $this->save($userId, $data);
    }

    public function removeItem(string $userId, int $productId, ?int $variantId = null): void
    {
        $data  = $this->get($userId);
        $index = $this->findItemIndex($data['items'], $productId, $variantId);

        if ($index !== null) {
            array_splice($data['items'], $index, 1);
            $this->save($userId, $data);
        }
    }

    public function updateQuantity(string $userId, int $productId, int $quantity, ?int $variantId = null): void
    {
        if ($quantity <= 0) {
            $this->removeItem($userId, $productId, $variantId);
            return;
        }

        $data  = $this->get($userId);
        $index = $this->findItemIndex($data['items'], $productId, $variantId);

        if ($index === null) {
            throw new Exception("Item not found in cart.");
        }

        $data['items'][$index]['quantity'] = $quantity;
        $this->save($userId, $data);
    }

    public function applyCoupon(string $userId, string $couponCode): void
    {
        // Coupon validation will be handled by PricingModule in Step 2
        // Here we just store the code; actual discount applied at checkout
        $data           = $this->get($userId);
        $data['coupon'] = strtoupper(trim($couponCode));
        $this->save($userId, $data);
    }

    public function removeCoupon(string $userId): void
    {
        $data           = $this->get($userId);
        $data['coupon'] = null;
        $this->save($userId, $data);
    }

    public function getCart(string $userId): CartDTO
    {
        return CartDTO::fromArray($this->get($userId), $userId);
    }

    public function clearCart(string $userId): void
    {
        Redis::del($this->key($userId));
    }

    public function exists(string $userId): bool
    {
        return (bool) Redis::exists($this->key($userId));
    }

    private function findItemIndex(array $items, int $productId, ?int $variantId): ?int
    {
        foreach ($items as $i => $item) {
            if ($item['product_id'] === $productId && $item['variant_id'] === $variantId) {
                return $i;
            }
        }
        return null;
    }
}
