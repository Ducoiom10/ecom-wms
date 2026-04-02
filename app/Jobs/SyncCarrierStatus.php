<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use App\Events\ShipmentStatusChanged;
use Modules\TMS\Models\Shipment;
use Modules\TMS\Proxies\CarrierProxyFactory;

class SyncCarrierStatus implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 1;
    public int $timeout = 120;

    public function handle(): void
    {
        // cursor() avoids loading all active shipments into memory at once
        Shipment::whereNotIn('status', ['delivered', 'cancelled'])
            ->whereNotNull('tracking_id')
            ->cursor()
            ->each(function (Shipment $shipment) {
                try {
                    $proxy  = CarrierProxyFactory::create($shipment->carrier);
                    $status = $proxy->getStatus($shipment->tracking_id);

                    $shipment->update([
                        'status'           => $status->status,
                        'current_location' => $status->location,
                    ]);

                    event(new ShipmentStatusChanged($shipment));
                } catch (\Throwable $e) {
                    Log::warning("SyncCarrierStatus failed for shipment #{$shipment->id}: {$e->getMessage()}");
                }
            });
    }
}
