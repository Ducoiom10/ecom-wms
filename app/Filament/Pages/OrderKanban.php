<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Modules\OMS\Models\Order;

class OrderKanban extends Page
{
    protected static ?string $navigationIcon  = 'heroicon-o-view-columns';
    protected static ?string $navigationGroup = '📋 Orders (OMS)';
    protected static ?string $navigationLabel = 'Kanban';
    protected static ?int    $navigationSort  = 2;
    protected static string  $view = 'filament.pages.order-kanban';

    public array $columns = [];

    public function mount(): void
    {
        $this->loadOrders();
    }

    public function loadOrders(): void
    {
        $statuses = ['pending', 'approved', 'picking', 'packed', 'shipped', 'delivered'];

        $orders = Order::with('user')
            ->whereIn('status', $statuses)
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('status');

        $this->columns = collect($statuses)->mapWithKeys(fn($s) => [
            $s => $orders->get($s, collect())->map(fn($o) => [
                'id'         => $o->id,
                'customer'   => $o->user?->name ?? 'Guest',
                'total'      => number_format($o->total, 0, ',', '.') . '₫',
                'created_at' => $o->created_at->format('d/m H:i'),
            ])->values()->toArray(),
        ])->toArray();
    }

    public function moveOrder(int $orderId, string $newStatus): void
    {
        $allowed = ['pending', 'approved', 'picking', 'packed', 'shipped', 'delivered', 'cancelled'];

        if (!in_array($newStatus, $allowed)) return;

        Order::where('id', $orderId)->update(['status' => $newStatus]);
        $this->loadOrders();
    }
}
