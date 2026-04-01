<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use Modules\OMS\Models\Order;

class CancellationRateWidget extends ChartWidget
{
    protected static ?string $heading = 'Tỷ lệ hủy đơn (30 ngày)';
    protected static ?int    $sort    = 3;

    protected function getData(): array
    {
        $total     = Order::where('created_at', '>=', now()->subDays(30))->count();
        $cancelled = Order::where('status', 'cancelled')
            ->where('created_at', '>=', now()->subDays(30))->count();
        $completed = $total - $cancelled;

        return [
            'datasets' => [[
                'data'            => [$cancelled, $completed],
                'backgroundColor' => ['#ef4444', '#10b981'],
            ]],
            'labels' => ['Đã hủy', 'Hoàn thành'],
        ];
    }

    protected function getType(): string { return 'doughnut'; }
}
