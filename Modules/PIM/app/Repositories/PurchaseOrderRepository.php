<?php

namespace Modules\PIM\app\Repositories;

use App\Core\Repositories\BaseRepository;
use Modules\PIM\app\Models\PurchaseOrder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\Paginator;

class PurchaseOrderRepository extends BaseRepository
{
    /**
     * Constructor
     */
    public function __construct(PurchaseOrder $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all purchase orders with relations
     */
    public function getAllWithRelations(): Collection
    {
        return $this->model
            ->with([
                'supplier',
                'warehouse',
                'purchaseOrderItems',
                'createdByUser',
                'approvedByUser'
            ])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Find purchase order with relations
     */
    public function findWithRelations($id): ?PurchaseOrder
    {
        return $this->model
            ->with([
                'supplier',
                'warehouse',
                'purchaseOrderItems.product',
                'goodsReceiptNotes',
                'createdByUser',
                'approvedByUser'
            ])
            ->find($id);
    }

    /**
     * Get purchase orders by status
     */
    public function findByStatus(string $status): Collection
    {
        return $this->model
            ->where('status', $status)
            ->with(['supplier', 'warehouse'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get pending purchase orders
     */
    public function getPending(): Collection
    {
        return $this->findByStatus('pending');
    }

    /**
     * Get approved purchase orders
     */
    public function getApproved(): Collection
    {
        return $this->findByStatus('approved');
    }

    /**
     * Get partially received orders
     */
    public function getPartiallyReceived(): Collection
    {
        return $this->findByStatus('partial');
    }

    /**
     * Get completed orders
     */
    public function getCompleted(): Collection
    {
        return $this->findByStatus('completed');
    }

    /**
     * Find purchase orders by supplier
     */
    public function findBySupplier(int $supplierId): Collection
    {
        return $this->model
            ->where('supplier_id', $supplierId)
            ->with('purchaseOrderItems')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Find purchase orders by warehouse
     */
    public function findByWarehouse(int $warehouseId): Collection
    {
        return $this->model
            ->where('warehouse_id', $warehouseId)
            ->with(['supplier', 'purchaseOrderItems'])
            ->get();
    }

    /**
     * Find purchase order by code
     */
    public function findByCode(string $code): ?PurchaseOrder
    {
        return $this->model->where('code', $code)->first();
    }

    /**
     * Get paginated purchase orders
     */
    public function paginateWithRelations(int $perPage = 15): Paginator
    {
        return $this->model
            ->with(['supplier', 'warehouse', 'createdByUser'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Search purchase orders by code or supplier name
     */
    public function search(string $query): Collection
    {
        return $this->model
            ->where('code', 'like', "%{$query}%")
            ->orWhereHas('supplier', function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%");
            })
            ->with(['supplier', 'warehouse'])
            ->get();
    }

    /**
     * Get purchase orders by date range
     */
    public function getByDateRange($startDate, $endDate): Collection
    {
        return $this->model
            ->whereBetween('created_at', [$startDate, $endDate])
            ->with(['supplier', 'warehouse'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get total orders by supplier
     */
    public function getTotalBySupplier(int $supplierId): float
    {
        return $this->model
            ->where('supplier_id', $supplierId)
            ->sum('total_amount');
    }

    /**
     * Count purchase orders by status
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
     * Get orders pending approval
     */
    public function getPendingApproval(): Collection
    {
        return $this->model
            ->where('status', 'pending')
            ->whereNull('approved_by')
            ->with(['supplier', 'createdByUser'])
            ->orderBy('created_at', 'asc')
            ->get();
    }
}
