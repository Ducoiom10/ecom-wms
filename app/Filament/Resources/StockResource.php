<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StockResource\Pages;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Modules\Inventory\Models\Stock;

class StockResource extends Resource
{
    protected static ?string $model = Stock::class;
    protected static ?string $navigationIcon = 'heroicon-o-cube';
    protected static ?string $navigationGroup = '📦 Inventory & WMS';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('product_id')
                ->relationship('product', 'name')
                ->searchable()->preload()->required(),
            Select::make('warehouse_location_id')
                ->relationship('location', 'barcode')
                ->searchable()->preload()->required(),
            TextInput::make('quantity')->numeric()->required()->default(0),
            TextInput::make('reserved_quantity')->numeric()->default(0),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('product.name')->searchable()->sortable(),
                TextColumn::make('product.sku')->badge()->color('gray'),
                TextColumn::make('location.barcode')->label('Vị trí')->badge()->color('info'),
                TextColumn::make('location.warehouse.name')->label('Kho'),
                TextColumn::make('quantity')
                    ->label('Tồn kho')
                    ->badge()
                    ->color(fn($state) => $state < 10 ? 'danger' : ($state < 50 ? 'warning' : 'success')),
                TextColumn::make('reserved_quantity')->label('Đã giữ')->badge()->color('warning'),
            ])
            ->filters([
                SelectFilter::make('location.warehouse')
                    ->relationship('location.warehouse', 'name')
                    ->label('Kho'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->defaultSort('quantity', 'asc');
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListStocks::route('/'),
            'create' => Pages\CreateStock::route('/create'),
            'edit'   => Pages\EditStock::route('/{record}/edit'),
        ];
    }
}
