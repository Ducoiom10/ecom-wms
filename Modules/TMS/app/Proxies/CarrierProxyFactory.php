<?php

namespace Modules\TMS\Proxies;

use Modules\TMS\Contracts\CarrierProxyInterface;
use App\Exceptions\UnsupportedCarrierException;

class CarrierProxyFactory
{
    private const ALLOWED = ['ghtk', 'viettel'];

    public static function create(string $carrier): CarrierProxyInterface
    {
        // Validate against allowlist before resolving
        if (!in_array($carrier, self::ALLOWED, true)) {
            throw new UnsupportedCarrierException($carrier);
        }

        return match ($carrier) {
            'ghtk'    => new GHTKCarrierProxy(),
            'viettel' => new ViettelPostCarrierProxy(),
        };
    }

    public static function supported(): array
    {
        return self::ALLOWED;
    }
}
