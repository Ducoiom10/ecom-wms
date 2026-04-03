<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Modules\Finance\Models\Payment;
use Modules\OMS\Models\Order;

class FinanceStatsWidget extends BaseWidget
{
    protected static ?int $sort = 4;

    protected function getStats(): array
    {
        $revenue   = Order::where('status', 'delivered')
            ->where('created_at', '>=', now()->subDays(30))
            ->sum('total');

        $paid      = Payment::where('status', 'paid')
            ->where('created_at', '>=', now()->subDays(30))
            ->count();

        $cancelled = Order::where('status', 'cancelled')
            ->where('created_at', '>=', now()->subDays(30))
            ->count();

        return [
            Stat::make('Doanh thu (30 ngày)', number_format($revenue, 0, ',', '.') . '₫')
                ->description('Đơn đã giao')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('success'),

            Stat::make('Thanh toán thành công', $paid)
                ->description('30 ngày qua')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('info'),

            Stat::make('Đơn hủy', $cancelled)
                ->description('30 ngày qua')
                ->descriptionIcon('heroicon-m-x-circle')
                ->color('danger'),
        ];
    }
}
