<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Modules\Catalog\Models\Product;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\Warehouse;

class StatsOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        return [
            Stat::make('Tổng sản phẩm', Product::where('is_active', true)->count())
                ->description('Sản phẩm đang hoạt động')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('success'),

            Stat::make('Kho hàng', Warehouse::where('is_active', true)->count())
                ->description('Kho đang vận hành')
                ->descriptionIcon('heroicon-m-building-storefront')
                ->color('info'),

            Stat::make('Tổng tồn kho', number_format(Stock::sum('quantity')))
                ->description('Đơn vị hàng hóa')
                ->descriptionIcon('heroicon-m-cube')
                ->color('warning'),
        ];
    }
}
