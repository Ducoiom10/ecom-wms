<?php

namespace Modules\Cart\DTOs;

class CartDTO
{
    /** @param CartItemDTO[] $items */
    public function __construct(
        public readonly string  $userId,
        public readonly array   $items,
        public readonly float   $subtotal,
        public readonly float   $tax,
        public readonly float   $shipping,
        public readonly float   $total,
        public readonly ?string $coupon,
        public readonly ?string $expiresAt,
    ) {}

    public static function fromArray(array $data, string $userId): self
    {
        $items = array_map(
            fn($i) => CartItemDTO::fromArray($i),
            $data['items'] ?? []
        );

        return new self(
            userId:    $userId,
            items:     $items,
            subtotal:  $data['subtotal']  ?? 0.0,
            tax:       $data['tax']       ?? 0.0,
            shipping:  $data['shipping']  ?? 0.0,
            total:     $data['total']     ?? 0.0,
            coupon:    $data['coupon']    ?? null,
            expiresAt: $data['expires_at'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'items'      => array_map(fn($i) => $i->toArray(), $this->items),
            'subtotal'   => $this->subtotal,
            'tax'        => $this->tax,
            'shipping'   => $this->shipping,
            'total'      => $this->total,
            'coupon'     => $this->coupon,
            'expires_at' => $this->expiresAt,
        ];
    }

    public function isEmpty(): bool
    {
        return empty($this->items);
    }

    public function itemCount(): int
    {
        return array_sum(array_map(fn($i) => $i->quantity, $this->items));
    }
}
