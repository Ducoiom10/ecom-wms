<?php

namespace Modules\Finance\Actions;

use App\Jobs\ReconcilePayments;

class Reconcile
{
    public function __invoke(): void
    {
        ReconcilePayments::dispatch();
    }
}
