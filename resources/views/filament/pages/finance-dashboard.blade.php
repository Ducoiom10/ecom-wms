<x-filament-panels::page>
    <x-filament-widgets::widgets :widgets="$this->getHeaderWidgets()" />

    {{-- Payments Table --}}
    <div class="bg-white rounded-xl border shadow-sm overflow-hidden mt-6">
        <div class="px-5 py-4 border-b flex items-center justify-between">
            <h2 class="font-semibold text-gray-800">Lịch sử thanh toán</h2>
            <a href="#" class="text-sm text-indigo-600 hover:underline">📥 Export CSV</a>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
                <thead class="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                        <th class="px-4 py-3 text-left">Order #</th>
                        <th class="px-4 py-3 text-left">Gateway</th>
                        <th class="px-4 py-3 text-right">Số tiền</th>
                        <th class="px-4 py-3 text-left">Trạng thái</th>
                        <th class="px-4 py-3 text-left">Ngày</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse($this->stats['payments'] as $p)
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 font-medium">#{{ $p->order_id }}</td>
                            <td class="px-4 py-3 capitalize">{{ $p->gateway }}</td>
                            <td class="px-4 py-3 text-right font-semibold">{{ number_format($p->amount, 0, ',', '.') }}₫</td>
                            <td class="px-4 py-3">
                                <span class="px-2 py-0.5 rounded-full text-xs font-medium
                                    {{ $p->status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700' }}">
                                    {{ $p->status }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-gray-400">{{ $p->created_at->format('d/m/Y H:i') }}</td>
                        </tr>
                    @empty
                        <tr><td colspan="5" class="px-4 py-8 text-center text-gray-400">Chưa có dữ liệu</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <x-filament-widgets::widgets :widgets="$this->getFooterWidgets()" class="mt-6" />
</x-filament-panels::page>
