<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationGroup;
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
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandName('EcomWMS Admin')
            ->brandLogo(asset('images/logo-admin.png'))
            ->favicon(asset('images/favicon.png'))
            ->colors([
                'primary'   => Color::Indigo,
                'secondary' => Color::Slate,
                'success'   => Color::Emerald,
                'warning'   => Color::Amber,
                'danger'    => Color::Rose,
                'info'      => Color::Sky,
            ])
            ->font('Inter', 'https://fonts.bunny.net/css?family=inter:400,500,600,700')
            ->navigationGroups([
                NavigationGroup::make('🏪 Catalog')
                    ->label('🏪 Catalog')
                    ->collapsed(false),
                NavigationGroup::make('📦 Inventory & WMS')
                    ->label('📦 Inventory & WMS')
                    ->collapsed(false),
                NavigationGroup::make('📋 Orders (OMS)')
                    ->label('📋 Orders (OMS)')
                    ->collapsed(false),
                NavigationGroup::make('🚚 Shipping (TMS)')
                    ->label('🚚 Shipping (TMS)')
                    ->collapsed(true),
                NavigationGroup::make('💰 Pricing')
                    ->label('💰 Pricing')
                    ->collapsed(true),
                NavigationGroup::make('💳 Finance')
                    ->label('💳 Finance')
                    ->collapsed(true),
                NavigationGroup::make('👥 IAM')
                    ->label('👥 IAM')
                    ->collapsed(true),
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([
                Widgets\AccountWidget::class,
                \App\Filament\Widgets\StatsOverviewWidget::class,
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
            ])
            ->sidebarCollapsibleOnDesktop()
            ->globalSearchKeyBindings(['command+k', 'ctrl+k'])
            ->databaseNotifications();
    }
}
