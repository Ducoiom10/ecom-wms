<x-filament-panels::page>
    @php
        $labels = [
            'pending'   => ['label' => 'Chờ duyệt',  'color' => 'bg-gray-100 border-gray-300'],
            'approved'  => ['label' => 'Đã duyệt',   'color' => 'bg-blue-50 border-blue-300'],
            'picking'   => ['label' => 'Đang pick',  'color' => 'bg-yellow-50 border-yellow-300'],
            'packed'    => ['label' => 'Đã đóng gói','color' => 'bg-orange-50 border-orange-300'],
            'shipped'   => ['label' => 'Đang giao',  'color' => 'bg-purple-50 border-purple-300'],
            'delivered' => ['label' => 'Đã giao',    'color' => 'bg-green-50 border-green-300'],
        ];
    @endphp

    <div class="flex gap-4 overflow-x-auto pb-4">
        @foreach($this->columns as $status => $orders)
            <div class="flex-shrink-0 w-64">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="font-semibold text-sm text-gray-700">{{ $labels[$status]['label'] }}</h3>
                    <span class="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">{{ count($orders) }}</span>
                </div>

                <div class="space-y-2 min-h-32">
                    @forelse($orders as $order)
                        <div class="bg-white border rounded-lg p-3 shadow-sm text-sm {{ $labels[$status]['color'] }}">
                            <div class="flex justify-between items-start mb-1">
                                <span class="font-bold text-gray-800">#{{ $order['id'] }}</span>
                                <span class="text-xs text-gray-400">{{ $order['created_at'] }}</span>
                            </div>
                            <p class="text-gray-600 text-xs truncate">{{ $order['customer'] }}</p>
                            <p class="font-semibold text-indigo-600 mt-1">{{ $order['total'] }}</p>

                            {{-- Quick move actions --}}
                            @if($status !== 'delivered')
                                @php
                                    $nextMap = ['pending'=>'approved','approved'=>'picking','picking'=>'packed','packed'=>'shipped','shipped'=>'delivered'];
                                    $next = $nextMap[$status] ?? null;
                                @endphp
                                @if($next)
                                    <button
                                        wire:click="moveOrder({{ $order['id'] }}, '{{ $next }}')"
                                        class="mt-2 w-full text-xs bg-indigo-600 text-white py-1 rounded hover:bg-indigo-700 transition"
                                    >
                                        → {{ $labels[$next]['label'] }}
                                    </button>
                                @endif
                            @endif
                        </div>
                    @empty
                        <div class="border-2 border-dashed border-gray-200 rounded-lg h-20 flex items-center justify-center text-xs text-gray-400">
                            Trống
                        </div>
                    @endforelse
                </div>
            </div>
        @endforeach
    </div>
</x-filament-panels::page>
