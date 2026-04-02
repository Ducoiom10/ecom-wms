<?php

namespace Modules\Inventory\Actions;

use Modules\Inventory\Services\InventoryFIFOService;

class ReserveStock
{
    public function __construct(private InventoryFIFOService $fifo) {}

    public function __invoke(int $productId, int $quantity, ?int $warehouseId = null): array
    {
        return $this->fifo->reserveStock($productId, $quantity, $warehouseId);
    }
}
