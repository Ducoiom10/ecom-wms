<?php

namespace Modules\PIM\Repositories;

use App\Core\Repositories\BaseRepository;
use Modules\PIM\Models\GoodsReceiptNote;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\Paginator;

class GoodsReceiptNoteRepository extends BaseRepository
{
    /**
     * Constructor
     */
    public function __construct(GoodsReceiptNote $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all goods receipt notes with relations
     */
    public function getAllWithRelations(): Collection
    {
        return $this->model
            ->with([
                'purchaseOrder',
                'warehouse',
                'grnItems',
                'createdByUser'
            ])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Find GRN with all relations
     */
    public function findWithRelations($id): ?GoodsReceiptNote
    {
        return $this->model
            ->with([
                'purchaseOrder.supplier',
                'purchaseOrder.purchaseOrderItems',
                'warehouse',
                'grnItems.purchaseOrderItem.product',
                'grnItems.location',
                'createdByUser'
            ])
            ->find($id);
    }

    /**
     * Find GRN by code
     */
    public function findByCode(string $code): ?GoodsReceiptNote
    {
        return $this->model->where('code', $code)->first();
    }

    /**
     * Get GRNs by status
     */
    public function findByStatus(string $status): Collection
    {
        return $this->model
            ->where('status', $status)
            ->with(['purchaseOrder', 'warehouse'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get pending GRNs
     */
    public function getPending(): Collection
    {
        return $this->findByStatus('pending');
    }

    /**
     * Get partially received GRNs
     */
    public function getPartiallyReceived(): Collection
    {
        return $this->findByStatus('partial');
    }

    /**
     * Get completed GRNs
     */
    public function getCompleted(): Collection
    {
        return $this->findByStatus('completed');
    }

    /**
     * Get GRNs for a specific purchase order
     */
    public function findByPurchaseOrder(int $poId): Collection
    {
        return $this->model
            ->where('po_id', $poId)
            ->with(['grnItems'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get GRNs for a specific warehouse
     */
    public function findByWarehouse(int $warehouseId): Collection
    {
        return $this->model
            ->where('warehouse_id', $warehouseId)
            ->with(['purchaseOrder', 'grnItems'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get GRNs by supplier
     */
    public function findBySupplier(int $supplierId): Collection
    {
        return $this->model
            ->with(['purchaseOrder'])
            ->whereHas('purchaseOrder', function ($query) use ($supplierId) {
                $query->where('supplier_id', $supplierId);
            })
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get paginated GRNs
     */
    public function paginateWithRelations(int $perPage = 15): Paginator
    {
        return $this->model
            ->with([
                'purchaseOrder.supplier',
                'warehouse',
                'createdByUser'
            ])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Search GRNs by code or supplier name
     */
    public function search(string $query): Collection
    {
        return $this->model
            ->where('code', 'like', "%{$query}%")
            ->orWhereHas('purchaseOrder.supplier', function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%");
            })
            ->with(['purchaseOrder', 'warehouse'])
            ->get();
    }

    /**
     * Get GRNs by date range
     */
    public function getByDateRange($startDate, $endDate): Collection
    {
        return $this->model
            ->whereBetween('receipt_date', [$startDate, $endDate])
            ->with(['purchaseOrder', 'warehouse'])
            ->orderBy('receipt_date', 'desc')
            ->get();
    }

    /**
     * Get GRNs with discrepancies (items with failed quality check)
     */
    public function getWithDiscrepancies(): Collection
    {
        return $this->model
            ->with('grnItems')
            ->whereHas('grnItems', function ($query) {
                $query->where('quality_check_status', 'failed');
            })
            ->get();
    }

    /**
     * Count GRNs by status
     */
    public function countByStatus(): array
    {
        return $this->model
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();
    }

    /**
     * Get GRNs pending quality check
     */
    public function getPendingQualityCheck(): Collection
    {
        return $this->model
            ->with('grnItems')
            ->whereHas('grnItems', function ($query) {
                $query->where('quality_check_status', 'pending_check');
            })
            ->get();
    }

    /**
     * Get GRNs with pending items allocation
     */
    public function getPendingAllocation(): Collection
    {
        return $this->model
            ->with('grnItems')
            ->whereHas('grnItems', function ($query) {
                $query->whereNull('location_id');
            })
            ->get();
    }

    /**
     * Get recent GRNs
     */
    public function getRecent(int $days = 7): Collection
    {
        return $this->model
            ->where('created_at', '>=', now()->subDays($days))
            ->with(['purchaseOrder', 'warehouse'])
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
