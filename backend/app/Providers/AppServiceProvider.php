<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register RBAC migrations from subfolder so RefreshDatabase picks them up.
        $this->loadMigrationsFrom(database_path('migrations/rbac'));
    }
}
