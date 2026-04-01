<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Modules\Catalog\Models\Product;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    protected static ?string $navigationGroup = '🏪 Catalog';
    protected static ?int $navigationSort = 2;
    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Tabs::make('Product Details')->tabs([

                Tabs\Tab::make('General')->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn($state, $set) =>
                            $set('slug', \Illuminate\Support\Str::slug($state))
                        ),
                    TextInput::make('slug')->required()->unique(ignoreRecord: true),
                    TextInput::make('sku')->required()->unique(ignoreRecord: true),
                    TextInput::make('price')->numeric()->required()->prefix('₫'),
                    Select::make('category_id')
                        ->relationship('category', 'name')
                        ->searchable()
                        ->preload()
                        ->required(),
                    Select::make('brand_id')
                        ->relationship('brand', 'name')
                        ->searchable()
                        ->preload(),
                    RichEditor::make('description')->columnSpanFull(),
                    Toggle::make('is_active')->default(true),
                ])->columns(2),

                Tabs\Tab::make('Attributes (JSON)')->schema([
                    KeyValue::make('attributes')
                        ->keyLabel('Thuộc tính (VD: Màu sắc)')
                        ->valueLabel('Giá trị (VD: Đen)')
                        ->addButtonLabel('Thêm thuộc tính')
                        ->reorderable(),
                ]),

                Tabs\Tab::make('Variants')->schema([
                    Repeater::make('productVariants')
                        ->relationship()
                        ->schema([
                            TextInput::make('sku')->required()->unique(ignoreRecord: true),
                            TextInput::make('variant_name')->required(),
                            TextInput::make('price_override')->numeric()->prefix('₫'),
                            Toggle::make('is_active')->default(true),
                        ])
                        ->columns(2)
                        ->addButtonLabel('Thêm biến thể'),
                ]),

                Tabs\Tab::make('Images')->schema([
                    Repeater::make('productImages')
                        ->relationship()
                        ->schema([
                            FileUpload::make('image_url')
                                ->image()
                                ->directory('products')
                                ->imageEditor()
                                ->required(),
                            TextInput::make('alt_text'),
                            TextInput::make('sort_order')->numeric()->default(0),
                            Toggle::make('is_primary')->default(false),
                        ])
                        ->columns(2)
                        ->addButtonLabel('Thêm hình ảnh'),
                ]),

            ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('productImages.image_url')
                    ->label('Ảnh')
                    ->circular()
                    ->defaultImageUrl(asset('images/placeholder.png')),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('sku')->searchable()->badge()->color('gray'),
                TextColumn::make('category.name')->sortable()->badge(),
                TextColumn::make('brand.name')->sortable(),
                TextColumn::make('price')
                    ->money('VND')
                    ->sortable(),
                ToggleColumn::make('is_active')->label('Active'),
                TextColumn::make('created_at')->dateTime('d/m/Y')->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('category')->relationship('category', 'name'),
                SelectFilter::make('brand')->relationship('brand', 'name'),
                Tables\Filters\TernaryFilter::make('is_active')->label('Trạng thái'),
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
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit'   => Pages\EditProduct::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('is_active', true)->count();
    }
}
