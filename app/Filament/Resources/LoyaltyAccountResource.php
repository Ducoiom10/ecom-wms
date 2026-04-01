<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LoyaltyAccountResource\Pages;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Modules\CRM\Models\LoyaltyAccount;

class LoyaltyAccountResource extends Resource
{
    protected static ?string $model = LoyaltyAccount::class;
    protected static ?string $navigationIcon  = 'heroicon-o-gift';
    protected static ?string $navigationGroup = '👥 CRM';
    protected static ?int    $navigationSort  = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('points')->numeric()->required()->default(0),
            Select::make('tier')->options(['bronze' => 'Bronze', 'silver' => 'Silver', 'gold' => 'Gold', 'platinum' => 'Platinum'])->required(),
            TextInput::make('total_redeemed')->numeric()->default(0)->disabled(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')->label('Khách hàng')->searchable()->sortable(),
                TextColumn::make('user.email')->label('Email')->searchable(),
                TextColumn::make('points')->badge()->color('success')->sortable(),
                TextColumn::make('tier')->badge()->color(fn($state) => match($state) {
                    'platinum' => 'primary',
                    'gold'     => 'warning',
                    'silver'   => 'gray',
                    default    => 'info',
                }),
                TextColumn::make('total_redeemed')->label('Đã dùng')->badge()->color('danger'),
                TextColumn::make('created_at')->dateTime('d/m/Y')->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([SelectFilter::make('tier')->options(['bronze' => 'Bronze', 'silver' => 'Silver', 'gold' => 'Gold', 'platinum' => 'Platinum'])])
            ->actions([Tables\Actions\EditAction::make()])
            ->defaultSort('points', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLoyaltyAccounts::route('/'),
            'edit'  => Pages\EditLoyaltyAccount::route('/{record}/edit'),
        ];
    }
}
