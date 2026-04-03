<?php

namespace App\Livewire;

use Livewire\Component;
use Modules\Inventory\Models\Stock;
use Modules\Inventory\Models\StockMovement;
use Modules\Inventory\Models\WarehouseLocation;
use Illuminate\Support\Facades\DB;

class BarcodeScanner extends Component
{
    public string $manualInput = '';
    public string $mode = 'in'; // 'in' | 'out'
    public int $quantity = 1;
    public ?array $lastResult = null;
    public ?string $errorMessage = null;
    public array $recentScans = [];

    public function processBarcode(string $barcode): void
    {
        $this->errorMessage = null;
        $barcode = trim($barcode);

        if (empty($barcode)) return;

        // Tìm location theo barcode
        $location = WarehouseLocation::where('barcode', $barcode)
            ->where('is_active', true)
            ->with('warehouse')
            ->first();

        if (!$location) {
            $this->errorMessage = "Không tìm thấy vị trí: {$barcode}";
            $this->dispatch('scan-error');
            return;
        }

        $stocks = Stock::where('warehouse_location_id', $location->id)->with('product')->get();

        $this->lastResult = [
            'barcode'   => $barcode,
            'location'  => $location->barcode,
            'warehouse' => $location->warehouse->name,
            'aisle'     => $location->aisle,
            'rack'      => $location->rack,
            'level'     => $location->level,
            'bin'       => $location->bin,
            'stocks'    => $stocks->map(fn($s) => [
                'product' => $s->product->name,
                'sku'     => $s->product->sku,
                'qty'     => $s->quantity,
            ])->toArray(),
            'mode'      => $this->mode,
            'scanned_at' => now()->format('H:i:s'),
        ];

        array_unshift($this->recentScans, $this->lastResult);
        $this->recentScans = array_slice($this->recentScans, 0, 10);

        $this->manualInput = '';
        $this->dispatch('scan-success');
    }

    public function processManualInput(): void
    {
        $this->processBarcode($this->manualInput);
    }

    public function adjustStock(int $stockId): void
    {
        try {
            DB::transaction(function () use ($stockId) {
                $stock = Stock::lockForUpdate()->findOrFail($stockId);

                if ($this->mode === 'out' && $stock->quantity < $this->quantity) {
                    $this->errorMessage = "Không đủ tồn kho. Hiện có: {$stock->quantity}";
                    return;
                }

                $delta = $this->mode === 'in' ? $this->quantity : -$this->quantity;
                $stock->increment('quantity', $delta);

                StockMovement::create([
                    'stock_id'       => $stock->id,
                    'type'           => $this->mode,
                    'quantity'       => $this->quantity,
                    'reference_type' => 'barcode_scan',
                    'note'           => "Quét mã: {$this->lastResult['barcode']}",
                    'user_id'        => auth()->id(),
                ]);
            });

            $this->dispatch('stock-adjusted');
        } catch (\Exception $e) {
            $this->errorMessage = $e->getMessage();
        }
    }

    public function render()
    {
        return view('livewire.barcode-scanner')
            ->layout('components.layouts.scanner');
    }
}
