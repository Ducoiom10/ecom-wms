<?php

namespace Modules\PIM\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Modules\PIM\Models\PurchaseOrder;
use Modules\PIM\Models\Supplier;
use Modules\PIM\Services\GoodsReceiptService;
use Modules\PIM\Services\PurchaseOrderService;

class PIMController extends Controller
{
    public function __construct(
        private PurchaseOrderService $poService,
        private GoodsReceiptService  $grnService,
    ) {}

    // GET /api/v1/purchase-orders
    public function index(Request $request)
    {
        $orders = PurchaseOrder::with(['supplier', 'items'])
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->latest()
            ->paginate($request->integer('limit', 20));

        return ApiResponse::success($orders);
    }

    // GET /api/v1/purchase-orders/{id}
    public function show(int $id)
    {
        $order = PurchaseOrder::with(['supplier', 'items'])->findOrFail($id);
        return ApiResponse::success($order);
    }

    // POST /api/v1/purchase-orders
    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id'        => 'required|integer|exists:suppliers,id',
            'warehouse_id'       => 'required|integer|exists:warehouses,id',
            'expected_date'      => 'required|date',
            'items'              => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.unit_cost'  => 'required|numeric|min:0',
        ]);

        $po = $this->poService->createPurchaseOrder(
            $validated['supplier_id'],
            $validated['warehouse_id'],
            array_map(fn($i) => [
                'product_id' => $i['product_id'],
                'quantity'   => $i['quantity'],
                'unit_price' => $i['unit_cost'],
            ], $validated['items']),
            ['expected_delivery_date' => $validated['expected_date']]
        );
        return ApiResponse::success($po->load('items'), 201);
    }

    // PUT /api/v1/purchase-orders/{id}
    public function update(Request $request, int $id)
    {
        $po = PurchaseOrder::findOrFail($id);
        $po->update($request->only(['expected_date', 'notes']));
        return ApiResponse::success($po);
    }

    // POST /api/v1/purchase-orders/{id}/receive
    public function receive(Request $request, int $id)
    {
        $validated = $request->validate([
            'items'               => 'required|array|min:1',
            'items.*.po_item_id'  => 'required|integer',
            'items.*.quantity'    => 'required|integer|min:1',
            'items.*.location_id' => 'required|integer|exists:warehouse_locations,id',
        ]);

        $po  = PurchaseOrder::with('items')->findOrFail($id);
        $grn = $this->grnService->createGoodsReceiptNote($po->id);

        foreach ($validated['items'] as $item) {
            $grnItem = $grn->grnItems()->whereHas('purchaseOrderItem', fn($q) =>
                $q->where('id', $item['po_item_id'])
            )->first();

            if ($grnItem) {
                $this->grnService->receiveItem(
                    $grnItem->id,
                    $item['quantity'],
                    null,
                    $item['location_id']
                );
            }
        }

        return ApiResponse::success($grn->load('items'), 201);
    }

    // GET /api/v1/suppliers
    public function suppliers(Request $request)
    {
        return ApiResponse::success(
            Supplier::where('is_active', true)->get()
        );
    }
}
