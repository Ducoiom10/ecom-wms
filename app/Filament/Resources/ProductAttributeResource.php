<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductAttributeResource\Pages;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Modules\Catalog\Models\ProductAttribute;

class ProductAttributeResource extends Resource
{
    protected static ?string $model = ProductAttribute::class;
    protected static ?string $navigationIcon = 'heroicon-o-adjustments-horizontal';
    protected static ?string $navigationGroup = '🏪 Catalog';
    protected static ?int $navigationSort = 4;
    protected static ?string $navigationLabel = 'Attributes';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('name')->required()->unique(ignoreRecord: true)->maxLength(100),
            Select::make('data_type')
                ->options([
                    'string'  => 'Text (string)',
                    'integer' => 'Number (integer)',
                    'boolean' => 'Yes/No (boolean)',
                    'json'    => 'JSON',
                    'enum'    => 'Enum (list)',
                ])
                ->required()
                ->default('string'),
            Toggle::make('is_required')->label('Bắt buộc nhập')->default(false),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('data_type')
                    ->badge()
                    ->color(fn($state) => match($state) {
                        'string'  => 'info',
                        'integer' => 'warning',
                        'boolean' => 'success',
                        'json'    => 'danger',
                        default   => 'gray',
                    }),
                TextColumn::make('attributeValues_count')
                    ->label('Đang dùng')
                    ->counts('attributeValues')
                    ->badge()->color('primary'),
                ToggleColumn::make('is_required')->label('Bắt buộc'),
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
            'index'  => Pages\ListProductAttributes::route('/'),
            'create' => Pages\CreateProductAttribute::route('/create'),
            'edit'   => Pages\EditProductAttribute::route('/{record}/edit'),
        ];
    }
}
