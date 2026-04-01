<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PickListResource\Pages;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Modules\WMS\Models\PickList;

class PickListResource extends Resource
{
    protected static ?string $model = PickList::class;
    protected static ?string $navigationIcon  = 'heroicon-o-clipboard-document-list';
    protected static ?string $navigationGroup = '📦 Inventory & WMS';
    protected static ?int    $navigationSort  = 5;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('status')
                ->options([
                    'pending'     => 'Pending',
                    'in_progress' => 'In Progress',
                    'completed'   => 'Completed',
                    'cancelled'   => 'Cancelled',
                ])
                ->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('ID')->sortable(),
                TextColumn::make('order_id')->label('Order')->sortable(),
                TextColumn::make('warehouse.name')->label('Kho'),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn($state) => match($state) {
                        'pending'     => 'gray',
                        'in_progress' => 'warning',
                        'completed'   => 'success',
                        'cancelled'   => 'danger',
                        default       => 'gray',
                    }),
                TextColumn::make('items_count')
                    ->label('Items')
                    ->counts('items')
                    ->badge(),
                TextColumn::make('created_at')->dateTime('d/m/Y H:i')->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')->options([
                    'pending'     => 'Pending',
                    'in_progress' => 'In Progress',
                    'completed'   => 'Completed',
                    'cancelled'   => 'Cancelled',
                ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPickLists::route('/'),
            'edit'  => Pages\EditPickList::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', 'pending')->count() ?: null;
    }
}
