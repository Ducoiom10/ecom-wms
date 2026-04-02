<?php

namespace Modules\Inventory\Actions;

use Modules\Inventory\Services\InventoryFIFOService;

class DeductStock
{
    public function __construct(private InventoryFIFOService $fifo) {}

    public function __invoke(int $productId, int $quantity, string $referenceType, int $referenceId, ?int $warehouseId = null): void
    {
        $this->fifo->deductStock($productId, $quantity, $referenceType, $referenceId, $warehouseId);
    }
}
