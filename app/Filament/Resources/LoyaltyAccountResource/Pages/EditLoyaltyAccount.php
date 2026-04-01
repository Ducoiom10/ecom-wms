<?php
namespace App\Filament\Resources\LoyaltyAccountResource\Pages;
use App\Filament\Resources\LoyaltyAccountResource;
use Filament\Resources\Pages\EditRecord;
use Filament\Actions;
class EditLoyaltyAccount extends EditRecord { protected static string $resource = LoyaltyAccountResource::class; protected function getHeaderActions(): array { return [Actions\DeleteAction::make()]; } }
