<?php

namespace Modules\WMS\Actions;

use Modules\OMS\Models\Order;
use Modules\WMS\Models\PickList;
use Modules\WMS\Services\PickListGenerator;

class GeneratePickList
{
    public function __construct(private PickListGenerator $generator) {}

    public function __invoke(Order $order): PickList
    {
        return $this->generator->generatePickList($order);
    }
}
