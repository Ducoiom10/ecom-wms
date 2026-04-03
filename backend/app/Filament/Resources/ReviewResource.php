<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReviewResource\Pages;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Modules\CRM\Models\Review;

class ReviewResource extends Resource
{
    protected static ?string $model = Review::class;
    protected static ?string $navigationIcon  = 'heroicon-o-star';
    protected static ?string $navigationGroup = '👥 CRM';
    protected static ?int    $navigationSort  = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('rating')->numeric()->minValue(1)->maxValue(5)->required(),
            Toggle::make('is_visible')->default(true)->label('Hiển thị'),
            Toggle::make('is_flagged')->label('Đã gắn cờ'),
            Textarea::make('content')->rows(4)->columnSpanFull(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')->label('Khách hàng')->searchable(),
                TextColumn::make('product.name')->label('Sản phẩm')->searchable()->limit(30),
                TextColumn::make('rating')->badge()->color(fn($state) => $state >= 4 ? 'success' : ($state >= 3 ? 'warning' : 'danger')),
                TextColumn::make('content')->limit(50)->label('Nội dung'),
                ToggleColumn::make('is_visible')->label('Hiển thị'),
                ToggleColumn::make('is_flagged')->label('Gắn cờ'),
                TextColumn::make('created_at')->dateTime('d/m/Y')->sortable(),
            ])
            ->filters([
                TernaryFilter::make('is_flagged')->label('Đã gắn cờ'),
                TernaryFilter::make('is_visible')->label('Hiển thị'),
            ])
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReviews::route('/'),
            'edit'  => Pages\EditReview::route('/{record}/edit'),
        ];
    }
}
