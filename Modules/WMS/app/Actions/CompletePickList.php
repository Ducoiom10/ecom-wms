<?php

namespace Modules\WMS\Actions;

use Modules\WMS\Models\PickList;
use Modules\WMS\Services\PickListGenerator;

class CompletePickList
{
    public function __construct(private PickListGenerator $generator) {}

    public function __invoke(PickList $pickList, int $pickedBy): PickList
    {
        foreach ($pickList->items as $item) {
            if (!$item->isPicked()) {
                $this->generator->markItemPicked($item->id, $item->quantity_required, $pickedBy);
            }
        }

        return $pickList->fresh();
    }
}
