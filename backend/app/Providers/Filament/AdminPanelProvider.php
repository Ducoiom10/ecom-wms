<?php

namespace App\Providers\Filament;

use App\Filament\Pages\FinanceDashboard;
use App\Filament\Pages\OrderKanban;
use App\Filament\Pages\WarehouseMap;
use App\Filament\Resources\BrandResource;
use App\Filament\Resources\CategoryResource;
use App\Filament\Resources\OrderResource;
use App\Filament\Resources\PickListResource;
use App\Filament\Resources\ProductAttributeResource;
use App\Filament\Resources\ProductResource;
use App\Filament\Resources\StockResource;
use App\Filament\Resources\UserResource;
use App\Filament\Resources\LoyaltyAccountResource;
use App\Filament\Resources\ReviewResource;
use App\Filament\Resources\ShipmentResource;
use App\Filament\Resources\SupplierResource;
use App\Filament\Resources\WarehouseLocationResource;
use App\Filament\Resources\WarehouseResource;
use App\Filament\Widgets\CancellationRateWidget;
use App\Filament\Widgets\FinanceStatsWidget;
use App\Filament\Widgets\RevenueChartWidget;
use App\Filament\Widgets\StatsOverviewWidget;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('admin')
            ->path('admin')
            ->colors([
                'primary' => Color::Amber,
            ])
            ->resources([
                // Catalog
                CategoryResource::class,
                ProductResource::class,
                BrandResource::class,
                ProductAttributeResource::class,
                // Inventory & WMS
                WarehouseResource::class,
                WarehouseLocationResource::class,
                StockResource::class,
                PickListResource::class,
                // OMS
                OrderResource::class,
                // IAM
                UserResource::class,
                // PIM
                SupplierResource::class,
                // TMS
                ShipmentResource::class,
                // CRM
                ReviewResource::class,
                LoyaltyAccountResource::class,
            ])
            ->pages([
                Pages\Dashboard::class,
                OrderKanban::class,
                WarehouseMap::class,
                FinanceDashboard::class,
            ])
            ->widgets([
                Widgets\AccountWidget::class,
                StatsOverviewWidget::class,
                RevenueChartWidget::class,
                CancellationRateWidget::class,
                FinanceStatsWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
