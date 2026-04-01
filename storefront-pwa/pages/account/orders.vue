<template>
  <div class="bg-white rounded-xl border p-6 space-y-5">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold">Đơn hàng của tôi</h1>
      <select v-model="filter" class="border rounded-lg px-3 py-1.5 text-sm">
        <option value="">Tất cả</option>
        <option value="pending">Chờ xác nhận</option>
        <option value="shipped">Đang giao</option>
        <option value="delivered">Đã giao</option>
        <option value="cancelled">Đã hủy</option>
      </select>
    </div>

    <div v-if="pending" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-24 bg-gray-100 rounded-lg animate-pulse" />
    </div>

    <UiEmptyState v-else-if="!filtered.length" icon="📦" title="Chưa có đơn hàng" message="Hãy mua sắm ngay!" action-link="/category" action-label="Khám phá sản phẩm" />

    <div v-else class="space-y-3">
      <div v-for="o in filtered" :key="o.id" class="border rounded-xl p-4 hover:shadow-sm transition">
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="font-semibold">#{{ o.id }}</p>
            <p class="text-xs text-gray-400">{{ new Date(o.created_at).toLocaleDateString('vi-VN') }}</p>
          </div>
          <span class="px-2 py-0.5 rounded-full text-xs font-medium"
            :class="statusClass(o.status)">{{ statusLabel(o.status) }}</span>
        </div>
        <div class="flex gap-2 mt-3">
          <NuxtLink :to="`/account/orders/${o.id}/tracking`"
            class="text-xs border border-indigo-500 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50">
            Vận trình
          </NuxtLink>
          <span class="ml-auto font-bold text-sm text-red-600">
            {{ new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(o.total) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'account', middleware: 'auth' })
const filter = ref('')
const { data: orders, pending } = await useAsyncData('my-orders', () => useOrderApi().getOrders(1, 50))
const filtered = computed(() => {
  const list = (orders.value as any)?.data ?? []
  return filter.value ? list.filter((o: any) => o.status === filter.value) : list
})
const statusLabel = (s: string) => ({ pending:'Chờ xác nhận', approved:'Đã duyệt', picking:'Đang lấy', packed:'Đóng gói', shipped:'Đang giao', delivered:'Đã giao', cancelled:'Đã hủy' }[s] ?? s)
const statusClass = (s: string) => ({ delivered:'bg-green-100 text-green-700', shipped:'bg-blue-100 text-blue-700', cancelled:'bg-red-100 text-red-700' }[s] ?? 'bg-gray-100 text-gray-600')
</script>
