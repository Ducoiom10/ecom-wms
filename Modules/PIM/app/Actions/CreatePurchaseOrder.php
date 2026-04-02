<?php

namespace Modules\PIM\Actions;

use Modules\PIM\Models\PurchaseOrder;

class CreatePurchaseOrder
{
    public function __invoke(array $data): PurchaseOrder
    {
        return PurchaseOrder::create($data);
    }
}
