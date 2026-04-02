<?php

namespace Modules\PIM\Actions;

use Modules\PIM\Models\GoodsReceiptNote;

class CreateGRN
{
    public function __invoke(array $data): GoodsReceiptNote
    {
        return GoodsReceiptNote::create($data);
    }
}
