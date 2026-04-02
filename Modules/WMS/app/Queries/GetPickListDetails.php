<?php

namespace Modules\WMS\Queries;

use Modules\WMS\Models\PickList;

class GetPickListDetails
{
    public function __invoke(int $pickListId): PickList
    {
        return PickList::with(['items.product', 'warehouse'])
            ->findOrFail($pickListId);
    }
}
