<?php

namespace Modules\TMS\Services;

use App\Core\Services\BaseService;
use Illuminate\Support\Facades\DB;
use Modules\OMS\Models\Order;
use Modules\TMS\Models\Shipment;

class ShipmentService extends BaseService
{
    /**
     * Consolidate orders into shipments grouped by delivery zone.
     * Orders without a zone are grouped together under zone_id = null.
     *
     * @param  int[]  $orderIds
     * @return Shipment[]
     */
    public function consolidateOrders(array $orderIds, string $carrier): array
    {
        return DB::transaction(function () use ($orderIds, $carrier) {
            // Validate carrier against allowlist before any DB work
            $allowed = ['ghtk', 'viettel', 'grab', 'ahamove'];
            if (!in_array($carrier, $allowed, true)) {
                throw new \InvalidArgumentException("Unsupported carrier: {$carrier}");
            }

            $orders = Order::with('items')
                ->whereIn('id', $orderIds)
                ->where('status', 'packed') // only packed orders can be shipped
                ->get();

            if ($orders->isEmpty()) {
                throw new \Exception('No packed orders found for the given IDs.');
            }

            // Group by delivery_zone_id (null-safe)
            $byZone = $orders->groupBy(fn($o) => $o->delivery_zone_id ?? 'unzoned');

            $shipments = [];

            foreach ($byZone as $zoneKey => $zoneOrders) {
                $shipment = Shipment::create([
                    'zone_id'      => $zoneKey === 'unzoned' ? null : $zoneKey,
                    'carrier'      => $carrier,
                    'status'       => 'pending',
                    'total_weight' => $zoneOrders->sum('weight'),
                ]);

                foreach ($zoneOrders as $order) {
                    $shipment->addOrder($order);
                }

                $shipments[] = $shipment->load('orders');
            }

            return $shipments;
        });
    }

    /**
     * Update shipment status and location from carrier sync.
     */
    public function updateStatus(Shipment $shipment, string $status, ?string $location = null): void
    {
        $shipment->update([
            'status'           => $status,
            'current_location' => $location,
        ]);
    }
}
