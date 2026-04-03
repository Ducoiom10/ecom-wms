<?php

namespace Modules\TMS\Proxies;

use Illuminate\Support\Facades\Http;
use Modules\OMS\Models\Order;
use Modules\TMS\Contracts\CarrierProxyInterface;
use Modules\TMS\DTOs\ShipmentStatusDTO;
use Exception;

class ViettelPostCarrierProxy implements CarrierProxyInterface
{
    private string $baseUrl;
    private string $token;

    public function __construct()
    {
        $this->baseUrl = config('tms.carriers.viettel.base_url', 'https://partner.viettelpost.vn/v2');
        $this->token   = config('tms.carriers.viettel.token', '');
    }

    public function createShipment(Order $order): string
    {
        $response = Http::withToken($this->token)
            ->timeout(10)
            ->retry(2, 500)
            ->post("{$this->baseUrl}/order/createOrder", [
                'ORDER_NUMBER'   => (string) $order->id,
                'RECEIVER_ADDRESS' => $order->delivery_address,
                'PRODUCT_PRICE'  => (int) $order->total,
                'PRODUCT_WEIGHT' => 500,
                'ORDER_SERVICE'  => 'SCOD',
            ]);

        if (!$response->successful()) {
            throw new Exception("ViettelPost createShipment failed: " . $response->body());
        }

        $trackingId = $response->json('data.ORDER_NUMBER');

        if (empty($trackingId)) {
            throw new Exception("ViettelPost returned empty tracking ID.");
        }

        return $trackingId;
    }

    public function getStatus(string $trackingId): ShipmentStatusDTO
    {
        $response = Http::withToken($this->token)
            ->timeout(10)
            ->get("{$this->baseUrl}/order/getOrderByOrderNumber", [
                'ORDER_NUMBER' => $trackingId,
            ]);

        if (!$response->successful()) {
            throw new Exception("ViettelPost getStatus failed: " . $response->body());
        }

        return new ShipmentStatusDTO(
            status:            $response->json('data.ORDER_STATUS') ?? 'unknown',
            location:          $response->json('data.LOCALION_CURRENTLY') ?? null,
            estimatedDelivery: null,
        );
    }

    public function cancelShipment(string $trackingId): bool
    {
        $response = Http::withToken($this->token)
            ->timeout(10)
            ->delete("{$this->baseUrl}/order/deleteOrder", [
                'TYPE'         => 4,
                'ORDER_NUMBER' => $trackingId,
            ]);

        return $response->successful();
    }

    public function calculateFee(Order $order): float
    {
        $response = Http::withToken($this->token)
            ->timeout(10)
            ->post("{$this->baseUrl}/order/getPriceAll", [
                'SENDER_PROVINCE'   => 1,
                'RECEIVER_PROVINCE' => 2,
                'PRODUCT_WEIGHT'    => 500,
                'PRODUCT_PRICE'     => (int) $order->total,
                'ORDER_SERVICE_ADD' => '',
                'ORDER_SERVICE'     => 'SCOD',
            ]);

        return (float) ($response->json('data.MONEY_TOTAL') ?? 0);
    }
}
