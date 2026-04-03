<?php

namespace App\Filament\Resources;

use App\Filament\Resources\WarehouseLocationResource\Pages;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Modules\Inventory\Models\WarehouseLocation;

class WarehouseLocationResource extends Resource
{
    protected static ?string $model = WarehouseLocation::class;
    protected static ?string $navigationIcon = 'heroicon-o-map-pin';
    protected static ?string $navigationGroup = '📦 Inventory & WMS';
    protected static ?int $navigationSort = 2;
    protected static ?string $navigationLabel = 'Vị trí kho';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('warehouse_id')
                ->relationship('warehouse', 'name')
                ->searchable()->preload()->required(),
            TextInput::make('aisle')->label('Dãy (Aisle)')->required()->maxLength(20),
            TextInput::make('rack')->label('Kệ (Rack)')->required()->maxLength(20),
            TextInput::make('level')->label('Tầng (Level)')->required()->maxLength(20),
            TextInput::make('bin')->label('Ô (Bin)')->required()->maxLength(20),
            TextInput::make('barcode')
                ->required()
                ->unique(ignoreRecord: true)
                ->helperText('VD: HN01-A-01-01-01')
                ->maxLength(100),
            Toggle::make('is_active')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('barcode')->searchable()->badge()->color('primary'),
                TextColumn::make('warehouse.name')->label('Kho')->sortable(),
                TextColumn::make('aisle')->label('Dãy'),
                TextColumn::make('rack')->label('Kệ'),
                TextColumn::make('level')->label('Tầng'),
                TextColumn::make('bin')->label('Ô'),
                TextColumn::make('stocks_count')
                    ->label('Tồn kho')
                    ->counts('stocks')
                    ->badge()->color('info'),
                ToggleColumn::make('is_active')->label('Active'),
            ])
            ->filters([
                SelectFilter::make('warehouse')->relationship('warehouse', 'name'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('barcode');
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListWarehouseLocations::route('/'),
            'create' => Pages\CreateWarehouseLocation::route('/create'),
            'edit'   => Pages\EditWarehouseLocation::route('/{record}/edit'),
        ];
    }
}
