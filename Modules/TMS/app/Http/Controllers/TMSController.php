<?php

namespace Modules\TMS\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use App\Jobs\SyncCarrierStatus;
use Modules\TMS\Models\DeliveryZone;
use Modules\TMS\Models\Shipment;
use Modules\TMS\Services\ShipmentService;

class TMSController extends Controller
{
    public function __construct(private ShipmentService $shipmentService) {}

    // GET /api/v1/shipments
    public function index(Request $request)
    {
        $shipments = Shipment::with(['zone', 'orders'])
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->orderBy('created_at', 'desc')
            ->paginate($request->integer('limit', 20));

        return ApiResponse::success($shipments);
    }

    // GET /api/v1/shipments/{id}
    public function show(int $id)
    {
        $shipment = Shipment::with(['zone', 'orders.items'])->findOrFail($id);
        return ApiResponse::success($shipment);
    }

    // POST /api/v1/shipments/{id}/sync-status
    public function syncStatus(int $id)
    {
        $shipment = Shipment::findOrFail($id);
        SyncCarrierStatus::dispatch($shipment);

        return ApiResponse::success(['message' => 'Status sync queued.']);
    }

    // GET /api/v1/delivery-zones
    public function deliveryZones()
    {
        return ApiResponse::success(DeliveryZone::all());
    }
}
