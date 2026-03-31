<?php

namespace Modules\OMS\Events;

use Modules\WMS\Models\PickList;

class PickListCreated
{
    public function __construct(public readonly PickList $pickList) {}
}
