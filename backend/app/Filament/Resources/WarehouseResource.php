<?php

namespace App\Filament\Resources;

use App\Filament\Resources\WarehouseResource\Pages;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Modules\Inventory\Models\Warehouse;

class WarehouseResource extends Resource
{
    protected static ?string $model = Warehouse::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-storefront';
    protected static ?string $navigationGroup = '📦 Inventory & WMS';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('code')->required()->unique(ignoreRecord: true)->maxLength(20),
            TextInput::make('name')->required()->maxLength(255),
            TextInput::make('address')->maxLength(500),
            TextInput::make('manager_name')->maxLength(255),
            Toggle::make('is_active')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('code')->badge()->color('primary')->searchable(),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('address')->limit(40),
                TextColumn::make('manager_name')->label('Quản lý'),
                TextColumn::make('locations_count')
                    ->label('Vị trí')
                    ->counts('locations')
                    ->badge()->color('info'),
                ToggleColumn::make('is_active')->label('Active'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListWarehouses::route('/'),
            'create' => Pages\CreateWarehouse::route('/create'),
            'edit'   => Pages\EditWarehouse::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('is_active', true)->count();
    }
}
