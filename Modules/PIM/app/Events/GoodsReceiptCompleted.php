<?php

namespace Modules\PIM\Events;

use Modules\PIM\Models\GoodsReceiptNote;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GoodsReceiptCompleted
{
    use Dispatchable, SerializesModels;

    public function __construct(public readonly GoodsReceiptNote $grn) {}
}
