<x-filament-panels::page>
    <div class="space-y-6">

        {{-- Warehouse Selector --}}
        <div class="flex items-center gap-4">
            <label class="font-semibold text-gray-700">Chọn kho:</label>
            <select
                wire:model.live="selectedWarehouseId"
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            >
                @foreach($this->warehouses as $wh)
                    <option value="{{ $wh->id }}">{{ $wh->code }} — {{ $wh->name }}</option>
                @endforeach
            </select>
        </div>

        {{-- Legend --}}
        <div class="flex items-center gap-6 text-sm">
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-emerald-400"></div>
                <span>Còn trống</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-amber-400"></div>
                <span>Đang dùng</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-rose-500"></div>
                <span>Gần đầy / Hết</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-gray-200 border"></div>
                <span>Không hoạt động</span>
            </div>
        </div>

        {{-- Map Grid --}}
        @if(empty($this->mapData))
            <div class="text-center py-16 text-gray-400">
                <x-heroicon-o-map class="w-12 h-12 mx-auto mb-3"/>
                <p>Không có dữ liệu vị trí cho kho này.</p>
            </div>
        @else
            @foreach($this->mapData as $aisle => $racks)
                <div class="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <h3 class="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                        <span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">Dãy {{ $aisle }}</span>
                    </h3>

                    <div class="flex gap-4 overflow-x-auto pb-2">
                        @foreach($racks as $rack => $bins)
                            <div class="flex-shrink-0">
                                <p class="text-xs text-gray-500 text-center mb-2 font-medium">Kệ {{ $rack }}</p>
                                <div class="grid gap-1" style="grid-template-columns: repeat({{ max(1, ceil(count($bins)/3)) }}, minmax(60px, 1fr))">
                                    @foreach($bins as $bin)
                                        @php
                                            $color = 'bg-emerald-100 border-emerald-300 hover:bg-emerald-200';
                                            if ($bin['quantity'] > 0 && $bin['utilization'] < 70) {
                                                $color = 'bg-amber-100 border-amber-300 hover:bg-amber-200';
                                            } elseif ($bin['utilization'] >= 70) {
                                                $color = 'bg-rose-100 border-rose-300 hover:bg-rose-200';
                                            }
                                        @endphp
                                        <div
                                            class="relative group border rounded cursor-pointer transition-all duration-150 {{ $color }}"
                                            style="width:64px; height:48px;"
                                            title="{{ $bin['barcode'] }}"
                                        >
                                            <div class="flex flex-col items-center justify-center h-full">
                                                <span class="text-xs font-bold text-gray-700">{{ $bin['bin'] }}</span>
                                                <span class="text-xs text-gray-500">{{ $bin['quantity'] }}</span>
                                            </div>

                                            {{-- Tooltip --}}
                                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl pointer-events-none">
                                                <p class="font-bold mb-1">{{ $bin['barcode'] }}</p>
                                                <p>Tầng: {{ $bin['level'] }} | Ô: {{ $bin['bin'] }}</p>
                                                <p>Tồn kho: <span class="text-emerald-400">{{ $bin['quantity'] }}</span></p>
                                                <p>Đã giữ: <span class="text-amber-400">{{ $bin['reserved'] }}</span></p>
                                                <p>Lấp đầy: <span class="text-rose-400">{{ $bin['utilization'] }}%</span></p>
                                                <div class="mt-2 bg-gray-700 rounded-full h-1.5">
                                                    <div class="bg-indigo-400 h-1.5 rounded-full" style="width: {{ $bin['utilization'] }}%"></div>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endforeach
        @endif

    </div>
</x-filament-panels::page>
