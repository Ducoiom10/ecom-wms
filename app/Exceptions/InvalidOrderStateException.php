<?php

namespace App\Exceptions;

use Exception;

class InvalidOrderStateException extends Exception
{
    public function __construct(string $action, string $currentStatus)
    {
        parent::__construct("Cannot perform '{$action}' on order with status '{$currentStatus}'.");
    }
}
