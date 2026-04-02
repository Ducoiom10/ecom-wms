<?php

namespace Modules\PIM\Actions;

use Modules\PIM\Models\GoodsReceiptNote;
use Modules\PIM\Events\GoodsReceiptCompleted;

class CompleteGRN
{
    public function __invoke(GoodsReceiptNote $grn): GoodsReceiptNote
    {
        $grn->update(['status' => 'completed']);

        event(new GoodsReceiptCompleted($grn));

        return $grn->fresh();
    }
}
