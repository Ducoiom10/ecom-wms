<div
    class="min-h-screen bg-gray-900 text-white flex flex-col"
    x-data="{
        barcode: '',
        scanning: false,
        handleKey(e) {
            if (e.key === 'Enter') {
                if (this.barcode.length > 0) {
                    $wire.processBarcode(this.barcode);
                    this.barcode = '';
                    this.scanning = false;
                }
            } else if (e.key.length === 1) {
                this.barcode += e.key;
                this.scanning = true;
            }
        }
    }"
    @keydown.window="handleKey($event)"
    @scan-success.window="scanning = false"
    @scan-error.window="scanning = false"
>
    {{-- Header --}}
    <div class="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <h1 class="text-lg font-bold">📦 Quét Mã Kho</h1>
        <div class="flex items-center gap-3">
            {{-- Mode Toggle --}}
            <div class="flex rounded-lg overflow-hidden border border-gray-600">
                <button
                    wire:click="$set('mode', 'in')"
                    class="px-4 py-1.5 text-sm font-medium transition {{ $mode === 'in' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300' }}"
                >
                    ↓ Nhập kho
                </button>
                <button
                    wire:click="$set('mode', 'out')"
                    class="px-4 py-1.5 text-sm font-medium transition {{ $mode === 'out' ? 'bg-rose-600 text-white' : 'bg-gray-700 text-gray-300' }}"
                >
                    ↑ Xuất kho
                </button>
            </div>
            {{-- Quantity --}}
            <div class="flex items-center gap-2">
                <span class="text-sm text-gray-400">SL:</span>
                <input
                    type="number"
                    wire:model="quantity"
                    min="1"
                    class="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-center"
                />
            </div>
        </div>
    </div>

    {{-- Scan Input --}}
    <div class="px-4 py-4 bg-gray-800 border-b border-gray-700">
        <div class="flex gap-2">
            <input
                type="text"
                wire:model="manualInput"
                wire:keydown.enter="processManualInput"
                placeholder="Nhập mã vạch hoặc quét súng..."
                autofocus
                class="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
            />
            <button
                wire:click="processManualInput"
                class="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition"
            >
                Quét
            </button>
        </div>

        {{-- Scanning indicator --}}
        <div x-show="scanning" class="mt-2 flex items-center gap-2 text-amber-400 text-sm">
            <div class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <span>Đang nhận mã: <span x-text="barcode" class="font-mono"></span></span>
        </div>
    </div>

    {{-- Error --}}
    @if($errorMessage)
        <div class="mx-4 mt-4 bg-rose-900 border border-rose-600 rounded-lg px-4 py-3 flex items-center gap-3">
            <span class="text-rose-300 text-xl">⚠</span>
            <span class="text-rose-200">{{ $errorMessage }}</span>
        </div>
    @endif

    {{-- Result --}}
    @if($lastResult)
        <div class="mx-4 mt-4 bg-gray-800 border border-{{ $mode === 'in' ? 'emerald' : 'rose' }}-600 rounded-xl p-4">
            <div class="flex items-center justify-between mb-3">
                <h2 class="font-bold text-lg">
                    {{ $mode === 'in' ? '↓ Nhập kho' : '↑ Xuất kho' }}
                    — {{ $lastResult['barcode'] }}
                </h2>
                <span class="text-gray-400 text-sm">{{ $lastResult['scanned_at'] }}</span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-sm mb-4">
                <div class="bg-gray-700 rounded p-2">
                    <span class="text-gray-400">Kho:</span>
                    <span class="ml-1 font-medium">{{ $lastResult['warehouse'] }}</span>
                </div>
                <div class="bg-gray-700 rounded p-2">
                    <span class="text-gray-400">Vị trí:</span>
                    <span class="ml-1 font-mono font-medium">{{ $lastResult['location'] }}</span>
                </div>
            </div>

            {{-- Stocks at this location --}}
            @if(!empty($lastResult['stocks']))
                <div class="space-y-2">
                    @foreach($lastResult['stocks'] as $s)
                        <div class="flex items-center justify-between bg-gray-700 rounded-lg px-3 py-2">
                            <div>
                                <p class="font-medium text-sm">{{ $s['product'] }}</p>
                                <p class="text-gray-400 text-xs font-mono">{{ $s['sku'] }}</p>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="text-gray-300 text-sm">Tồn: <strong>{{ $s['qty'] }}</strong></span>
                            </div>
                        </div>
                    @endforeach
                </div>
            @else
                <p class="text-gray-400 text-sm text-center py-2">Vị trí trống</p>
            @endif
        </div>
    @endif

    {{-- Recent Scans --}}
    @if(!empty($recentScans))
        <div class="mx-4 mt-4 flex-1">
            <h3 class="text-sm font-semibold text-gray-400 mb-2">Lịch sử quét gần đây</h3>
            <div class="space-y-1">
                @foreach($recentScans as $scan)
                    <div class="flex items-center justify-between bg-gray-800 rounded px-3 py-2 text-sm border border-gray-700">
                        <span class="font-mono text-indigo-300">{{ $scan['barcode'] }}</span>
                        <span class="text-gray-400">{{ $scan['warehouse'] }}</span>
                        <span class="text-gray-500 text-xs">{{ $scan['scanned_at'] }}</span>
                    </div>
                @endforeach
            </div>
        </div>
    @endif
</div>
