<template>
  <div class="max-w-3xl mx-auto py-10 px-4 space-y-8">
    <div>
      <NuxtLink to="/account/orders" class="text-sm text-indigo-600 hover:underline">← Đơn hàng của tôi</NuxtLink>
      <h1 class="text-2xl font-bold mt-2">Vận trình đơn #{{ tracking?.order_id }}</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Status Stepper -->
      <div>
        <h2 class="font-semibold mb-4">Trạng thái đơn hàng</h2>
        <div class="space-y-0">
          <div v-for="(s, i) in steps" :key="s.id" class="flex gap-4">
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition"
                :class="i <= currentIdx ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'">
                <span v-if="i < currentIdx">✓</span>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <div v-if="i < steps.length - 1" class="w-0.5 h-8"
                :class="i < currentIdx ? 'bg-indigo-600' : 'bg-gray-200'" />
            </div>
            <div class="pb-6 pt-1">
              <p class="font-semibold text-sm" :class="i <= currentIdx ? 'text-gray-900' : 'text-gray-400'">{{ s.name }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ s.date ? fmtDate(s.date) : 'Chờ xử lý' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Shipment Info -->
      <div class="bg-gray-50 rounded-xl p-5 space-y-4 text-sm">
        <h2 class="font-semibold">Thông tin vận chuyển</h2>
        <div class="grid grid-cols-2 gap-3">
          <div><p class="text-gray-400">Trạng thái</p>
            <span class="px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-700">{{ tracking?.status }}</span>
          </div>
          <div><p class="text-gray-400">Địa chỉ giao</p>
            <p class="font-medium">{{ tracking?.delivery_address ?? '—' }}</p>
          </div>
          <div><p class="text-gray-400">Ngày duyệt</p><p class="font-medium">{{ tracking?.approved_at ? fmtDate(tracking.approved_at) : '—' }}</p></div>
          <div><p class="text-gray-400">Ngày giao</p><p class="font-medium">{{ tracking?.delivered_at ? fmtDate(tracking.delivered_at) : '—' }}</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRoute()

const { data: tracking } = await useAsyncData(
  `tracking-${route.params.id}`,
  () => useOrderApi().getTracking(Number(route.params.id))
)

const statusOrder = ['pending', 'approved', 'picking', 'packed', 'shipped', 'delivered']
const stepNames   = ['Đặt hàng', 'Xác nhận', 'Đang lấy hàng', 'Đóng gói', 'Đang giao', 'Đã giao']

const steps = computed(() => statusOrder.map((id, i) => ({
  id,
  name: stepNames[i],
  date: tracking.value?.[`${id}_at`] ?? null,
})))

const currentIdx = computed(() => statusOrder.indexOf(tracking.value?.status ?? 'pending'))

const fmtDate = (d: string) => new Date(d).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
</script>
