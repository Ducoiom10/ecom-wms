<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use Modules\OMS\Models\Order;

class RevenueChartWidget extends ChartWidget
{
    protected static ?string $heading = 'Doanh thu 30 ngày';
    protected static ?int    $sort    = 2;
    protected int | string | array $columnSpan = 2;

    protected function getData(): array
    {
        $rows = Order::where('status', 'delivered')
            ->where('created_at', '>=', now()->subDays(30))
            ->selectRaw('DATE(created_at) as date, SUM(total) as revenue')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return [
            'datasets' => [[
                'label'           => 'Doanh thu (₫)',
                'data'            => $rows->pluck('revenue')->toArray(),
                'borderColor'     => '#6366f1',
                'backgroundColor' => 'rgba(99,102,241,0.1)',
                'fill'            => true,
                'tension'         => 0.4,
            ]],
            'labels' => $rows->pluck('date')->toArray(),
        ];
    }

    protected function getType(): string { return 'line'; }
}
