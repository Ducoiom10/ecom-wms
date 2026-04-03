<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ShipmentResource\Pages;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Modules\TMS\Models\Shipment;

class ShipmentResource extends Resource
{
    protected static ?string $model = Shipment::class;
    protected static ?string $navigationIcon  = 'heroicon-o-paper-airplane';
    protected static ?string $navigationGroup = '🚚 TMS';
    protected static ?int    $navigationSort  = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('carrier')->options(['ghtk' => 'GHTK', 'viettel' => 'Viettel Post', 'grab' => 'Grab', 'ahamove' => 'Ahamove'])->required(),
            Select::make('status')->options(['pending' => 'Pending', 'in_transit' => 'In Transit', 'delivered' => 'Delivered', 'cancelled' => 'Cancelled'])->required(),
            TextInput::make('tracking_id')->maxLength(100),
            TextInput::make('current_location')->maxLength(255),
            TextInput::make('total_weight')->numeric()->suffix('kg'),
            TextInput::make('shipping_fee')->numeric()->prefix('₫'),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('ID')->sortable(),
                TextColumn::make('carrier')->badge()->color('primary'),
                TextColumn::make('tracking_id')->searchable()->copyable(),
                TextColumn::make('status')->badge()->color(fn($state) => match($state) {
                    'delivered'  => 'success',
                    'in_transit' => 'warning',
                    'cancelled'  => 'danger',
                    default      => 'gray',
                }),
                TextColumn::make('current_location')->label('Vị trí hiện tại')->limit(30),
                TextColumn::make('shipping_fee')->money('VND'),
                TextColumn::make('orders_count')->label('Đơn hàng')->counts('orders')->badge(),
                TextColumn::make('created_at')->dateTime('d/m/Y H:i')->sortable(),
            ])
            ->filters([SelectFilter::make('carrier')->options(['ghtk' => 'GHTK', 'viettel' => 'Viettel', 'grab' => 'Grab']),
                       SelectFilter::make('status')->options(['pending' => 'Pending', 'in_transit' => 'In Transit', 'delivered' => 'Delivered'])])
            ->actions([Tables\Actions\ViewAction::make(), Tables\Actions\EditAction::make()])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListShipments::route('/'),
            'edit'  => Pages\EditShipment::route('/{record}/edit'),
        ];
    }
}
