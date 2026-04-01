<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\CancellationRateWidget;
use App\Filament\Widgets\FinanceStatsWidget;
use App\Filament\Widgets\RevenueChartWidget;
use Filament\Pages\Page;
use Modules\Finance\Models\Payment;
use Modules\OMS\Models\Order;

class FinanceDashboard extends Page
{
    protected static ?string $navigationIcon  = 'heroicon-o-banknotes';
    protected static ?string $navigationGroup = '💳 Finance';
    protected static ?string $navigationLabel = 'Finance Dashboard';
    protected static ?int    $navigationSort  = 1;
    protected static string  $view = 'filament.pages.finance-dashboard';

    public array $stats = [];

    public function mount(): void
    {
        $this->stats = [
            'revenue_30d'   => Order::where('status', 'delivered')->where('created_at', '>=', now()->subDays(30))->sum('total'),
            'orders_30d'    => Order::where('created_at', '>=', now()->subDays(30))->count(),
            'cancelled_30d' => Order::where('status', 'cancelled')->where('created_at', '>=', now()->subDays(30))->count(),
            'payments'      => Payment::with('order')->latest()->limit(20)->get(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [FinanceStatsWidget::class];
    }

    protected function getFooterWidgets(): array
    {
        return [RevenueChartWidget::class, CancellationRateWidget::class];
    }
}
