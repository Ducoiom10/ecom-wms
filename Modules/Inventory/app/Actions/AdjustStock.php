<?php

namespace Modules\Inventory\Actions;

use Illuminate\Support\Facades\DB;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\StockMovement;

class AdjustStock
{
    public function __invoke(int $stockId, int $delta, string $reason): Stock
    {
        return DB::transaction(function () use ($stockId, $delta, $reason) {
            $stock = Stock::lockForUpdate()->findOrFail($stockId);

            $stock->increment('quantity', $delta);

            StockMovement::create([
                'product_id'           => $stock->product_id,
                'warehouse_location_id' => $stock->warehouse_location_id,
                'quantity'             => $delta,
                'type'                 => $delta >= 0 ? 'adjustment_in' : 'adjustment_out',
                'reference_type'       => 'manual',
                'notes'                => $reason,
            ]);

            return $stock->fresh();
        });
    }
}
