<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Modules\OMS\Models\Order;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;
    protected static ?string $navigationIcon  = 'heroicon-o-shopping-cart';
    protected static ?string $navigationGroup = '📋 Orders (OMS)';
    protected static ?int    $navigationSort  = 1;
    protected static ?string $recordTitleAttribute = 'id';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Tabs::make()->tabs([
                Tabs\Tab::make('Tổng quan')->schema([
                    TextInput::make('id')->disabled()->label('Order ID'),
                    Select::make('status')
                        ->options([
                            'pending'   => 'Pending',
                            'approved'  => 'Approved',
                            'picking'   => 'Picking',
                            'picked'    => 'Picked',
                            'packed'    => 'Packed',
                            'shipped'   => 'Shipped',
                            'delivered' => 'Delivered',
                            'cancelled' => 'Cancelled',
                            'returned'  => 'Returned',
                        ])->required(),
                    TextInput::make('total')->numeric()->prefix('₫')->disabled(),
                    TextInput::make('region')->disabled(),
                    Textarea::make('delivery_address')->rows(2)->columnSpanFull(),
                ])->columns(2),

                Tabs\Tab::make('Thanh toán')->schema([
                    TextInput::make('subtotal')->numeric()->prefix('₫')->disabled(),
                    TextInput::make('discount')->numeric()->prefix('₫')->disabled(),
                    TextInput::make('tax')->numeric()->prefix('₫')->disabled(),
                    TextInput::make('shipping')->numeric()->prefix('₫')->disabled(),
                    TextInput::make('coupon_code')->disabled(),
                ])->columns(2),
            ])->columnSpanFull(),
        ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist->schema([
            Section::make('Thông tin đơn hàng')->columns(3)->schema([
                TextEntry::make('id')->label('Order ID'),
                TextEntry::make('status')->badge()
                    ->color(fn($state) => match($state) {
                        'pending'   => 'gray',
                        'approved'  => 'info',
                        'picking','picked','packed' => 'warning',
                        'shipped'   => 'primary',
                        'delivered' => 'success',
                        default     => 'danger',
                    }),
                TextEntry::make('total')->money('VND'),
                TextEntry::make('user.name')->label('Khách hàng'),
                TextEntry::make('delivery_address')->columnSpan(2),
            ]),
            Section::make('Timeline')->schema([
                TextEntry::make('created_at')->label('Tạo lúc')->dateTime('d/m/Y H:i'),
                TextEntry::make('approved_at')->label('Duyệt lúc')->dateTime('d/m/Y H:i'),
                TextEntry::make('shipped_at')->label('Giao lúc')->dateTime('d/m/Y H:i'),
                TextEntry::make('delivered_at')->label('Nhận lúc')->dateTime('d/m/Y H:i'),
            ])->columns(4),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('ID')->sortable(),
                TextColumn::make('user.name')->label('Khách hàng')->searchable(),
                TextColumn::make('status')->badge()
                    ->color(fn($state) => match($state) {
                        'pending'   => 'gray',
                        'approved'  => 'info',
                        'picking','picked','packed' => 'warning',
                        'shipped'   => 'primary',
                        'delivered' => 'success',
                        default     => 'danger',
                    }),
                TextColumn::make('total')->money('VND')->sortable(),
                TextColumn::make('region')->badge()->color('gray'),
                TextColumn::make('created_at')->dateTime('d/m/Y H:i')->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')->options([
                    'pending'   => 'Pending',
                    'approved'  => 'Approved',
                    'picking'   => 'Picking',
                    'shipped'   => 'Shipped',
                    'delivered' => 'Delivered',
                    'cancelled' => 'Cancelled',
                ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('approve')
                    ->label('Duyệt')
                    ->icon('heroicon-o-check')
                    ->color('success')
                    ->visible(fn(Order $r) => $r->status === 'pending')
                    ->action(fn(Order $r) => $r->approve()),
                Tables\Actions\Action::make('cancel')
                    ->label('Hủy')
                    ->icon('heroicon-o-x-mark')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->visible(fn(Order $r) => $r->isCancellable())
                    ->action(fn(Order $r) => $r->cancel()),
            ])
            ->bulkActions([])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListOrders::route('/'),
            'view'   => Pages\ViewOrder::route('/{record}'),
            'edit'   => Pages\EditOrder::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', 'pending')->count() ?: null;
    }
}
