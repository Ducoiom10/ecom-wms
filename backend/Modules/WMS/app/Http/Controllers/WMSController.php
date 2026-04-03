<?php

namespace Modules\WMS\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Modules\WMS\Models\PickList;
use Modules\WMS\Services\PickListGenerator;

class WMSController extends Controller
{
    public function __construct(private PickListGenerator $generator) {}

    // GET /api/v1/wms
    public function index(Request $request)
    {
        $lists = PickList::with(['warehouse', 'items'])
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->orderBy('created_at', 'desc')
            ->paginate($request->integer('limit', 20));

        return ApiResponse::success($lists);
    }

    // GET /api/v1/wms/{id}
    public function show(int $id)
    {
        $pickList = PickList::with(['warehouse', 'items.location'])->findOrFail($id);
        $route    = $this->generator->getPickingRoute($pickList);

        return ApiResponse::success(['pick_list' => $pickList, 'route' => $route]);
    }

    // POST /api/v1/wms/{id}/items/{itemId}/pick
    public function markPicked(Request $request, int $id, int $itemId)
    {
        $validated = $request->validate([
            'quantity_picked' => 'required|integer|min:1',
        ]);

        $pickList = PickList::findOrFail($id);
        $item     = $pickList->items()->findOrFail($itemId);

        $this->generator->markItemPicked($item, $validated['quantity_picked'], auth()->id());

        return ApiResponse::success(['message' => 'Item marked as picked.']);
    }
}
