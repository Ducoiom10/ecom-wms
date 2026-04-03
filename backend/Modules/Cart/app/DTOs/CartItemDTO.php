<?php

namespace Modules\Cart\DTOs;

class CartItemDTO
{
    public function __construct(
        public readonly int    $productId,
        public readonly ?int   $variantId,
        public readonly int    $quantity,
        public readonly float  $price,
        public readonly string $addedAt,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            productId: $data['product_id'],
            variantId: $data['variant_id'] ?? null,
            quantity:  $data['quantity'],
            price:     $data['price'],
            addedAt:   $data['added_at'],
        );
    }

    public function toArray(): array
    {
        return [
            'product_id' => $this->productId,
            'variant_id' => $this->variantId,
            'quantity'   => $this->quantity,
            'price'      => $this->price,
            'added_at'   => $this->addedAt,
        ];
    }

    public function subtotal(): float
    {
        return $this->price * $this->quantity;
    }
}
