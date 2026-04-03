<?php

namespace Modules\TMS\Proxies;

use Illuminate\Support\Facades\Http;
use Modules\OMS\Models\Order;
use Modules\TMS\Contracts\CarrierProxyInterface;
use Modules\TMS\DTOs\ShipmentStatusDTO;
use Exception;

class GHTKCarrierProxy implements CarrierProxyInterface
{
    private string $baseUrl;
    private string $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('tms.carriers.ghtk.base_url', 'https://services.giaohangtietkiem.vn');
        $this->apiKey  = config('tms.carriers.ghtk.api_key', '');
    }

    public function createShipment(Order $order): string
    {
        $response = Http::withToken($this->apiKey)
            ->timeout(10)
            ->retry(2, 500)
            ->post("{$this->baseUrl}/services/shipment/order", [
                'products'         => $this->buildProductPayload($order),
                'order'            => [
                    'id'             => (string) $order->id,
                    'pick_address'   => config('tms.warehouse_address'),
                    'address'        => $order->delivery_address,
                    'value'          => (int) $order->total,
                    'transport'      => 'road',
                    'pick_date'      => now()->addHours(2)->format('d/m/Y'),
                ],
            ]);

        if (!$response->successful()) {
            throw new Exception("GHTK createShipment failed: " . $response->body());
        }

        $trackingId = $response->json('order.label');

        if (empty($trackingId)) {
            throw new Exception("GHTK returned empty tracking ID.");
        }

        return $trackingId;
    }

    public function getStatus(string $trackingId): ShipmentStatusDTO
    {
        $response = Http::withToken($this->apiKey)
            ->timeout(10)
            ->retry(2, 500)
            ->get("{$this->baseUrl}/services/shipment/v2/{$trackingId}");

        if (!$response->successful()) {
            throw new Exception("GHTK getStatus failed: " . $response->body());
        }

        return new ShipmentStatusDTO(
            status:            $response->json('order.status_text') ?? 'unknown',
            location:          $response->json('order.current_transport_handle') ?? null,
            estimatedDelivery: null,
        );
    }

    public function cancelShipment(string $trackingId): bool
    {
        $response = Http::withToken($this->apiKey)
            ->timeout(10)
            ->post("{$this->baseUrl}/services/shipment/cancel/{$trackingId}");

        return $response->successful() && $response->json('success') === true;
    }

    public function calculateFee(Order $order): float
    {
        $response = Http::withToken($this->apiKey)
            ->timeout(10)
            ->get("{$this->baseUrl}/services/shipment/fee", [
                'address'    => $order->delivery_address,
                'service'    => 'LCO',
                'weight'     => 1000, // grams, placeholder
                'value'      => (int) $order->total,
                'transport'  => 'road',
            ]);

        if (!$response->successful()) {
            return 0.0;
        }

        return (float) ($response->json('fee.fee') ?? 0);
    }

    private function buildProductPayload(Order $order): array
    {
        return $order->items->map(fn($item) => [
            'name'     => "Product #{$item->product_id}",
            'weight'   => 0.5,
            'quantity' => $item->quantity,
            'price'    => (int) $item->unit_price,
        ])->toArray();
    }
}
