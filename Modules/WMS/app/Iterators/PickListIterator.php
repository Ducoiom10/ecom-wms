<?php

namespace Modules\WMS\Iterators;

use Iterator;
use Modules\WMS\Models\PickList;

class PickListIterator implements Iterator
{
    private int $currentIndex = 0;
    private array $items;

    public function __construct(PickList $pickList)
    {
        $this->items = $pickList->items()
            ->with('location')
            ->get()
            ->sortBy('location.barcode')
            ->values()
            ->toArray();
    }

    public function current(): mixed
    {
        return $this->items[$this->currentIndex];
    }

    public function key(): int
    {
        return $this->currentIndex;
    }

    public function next(): void
    {
        ++$this->currentIndex;
    }

    public function valid(): bool
    {
        return isset($this->items[$this->currentIndex]);
    }

    public function rewind(): void
    {
        $this->currentIndex = 0;
    }

    /**
     * Returns optimized picking route sorted by location barcode.
     */
    public function getRoute(): array
    {
        return array_map(fn($item) => [
            'location'  => $item['location']['barcode'] ?? null,
            'product_id' => $item['product_id'],
            'quantity'  => $item['quantity_required'],
        ], $this->items);
    }
}
