<?php

namespace App\Exceptions;

use Exception;

class UnsupportedCarrierException extends Exception
{
    public function __construct(string $carrier)
    {
        parent::__construct("Carrier '{$carrier}' is not supported.");
    }
}
