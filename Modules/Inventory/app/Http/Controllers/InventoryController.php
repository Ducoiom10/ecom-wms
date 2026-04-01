<?php

namespace Modules\Inventory\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\Warehouse;
use Modules\Inventory\Models\WarehouseLocation;
use Modules\Inventory\Services\InventoryFIFOService;

class InventoryController extends Controller
{
    public function __construct(private InventoryFIFOService $fifo) {}

    // GET /api/v1/stocks
    public function index(Request $request)
    {
        $stocks = Stock::with(['product', 'location.warehouse'])
            ->when($request->warehouse_id, fn($q) =>
                $q->whereHas('location', fn($q2) => $q2->where('warehouse_id', $request->warehouse_id))
            )
            ->paginate($request->integer('limit', 20));

        return ApiResponse::success($stocks);
    }

    // GET /api/v1/stocks/{id}
    public function show(int $id)
    {
        $stock = Stock::with(['product', 'location.warehouse'])->findOrFail($id);
        return ApiResponse::success($stock);
    }

    // POST /api/v1/stocks/adjust
    public function adjust(Request $request)
    {
        $validated = $request->validate([
            'product_id'  => 'required|integer|exists:products,id',
            'quantity'    => 'required|integer|not_in:0',
            'note'        => 'nullable|string|max:255',
        ]);

        $type = $validated['quantity'] > 0 ? 'in' : 'out';
        $qty  = abs($validated['quantity']);

        if ($type === 'out') {
            $this->fifo->deductStock(
                $validated['product_id'], $qty, 'manual_adjust', auth()->id()
            );
        } else {
            $stock = Stock::where('product_id', $validated['product_id'])->firstOrFail();
            $stock->increment('quantity', $qty);
        }

        return ApiResponse::success(['message' => 'Stock adjusted.']);
    }

    // GET /api/v1/warehouses
    public function warehouses()
    {
        return ApiResponse::success(Warehouse::where('is_active', true)->get());
    }

    // GET /api/v1/warehouses/{id}/locations
    public function locations(int $id)
    {
        $locations = WarehouseLocation::where('warehouse_id', $id)
            ->where('is_active', true)
            ->withCount('stocks')
            ->get();

        return ApiResponse::success($locations);
    }
}
