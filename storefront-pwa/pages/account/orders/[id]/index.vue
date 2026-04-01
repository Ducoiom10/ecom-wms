<template>
  <div class="bg-white rounded-xl border p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <NuxtLink to="/account/orders" class="text-sm text-indigo-600 hover:underline">← Đơn hàng của tôi</NuxtLink>
        <h1 class="text-xl font-bold mt-1">Đơn hàng #{{ order?.id }}</h1>
      </div>
      <div class="flex items-center gap-3">
        <span class="px-3 py-1 rounded-full text-sm font-medium" :class="statusClass(order?.status)">
          {{ statusLabel(order?.status) }}
        </span>
        <NuxtLink :to="`/account/orders/${route.params.id}/tracking`"
          class="text-sm border border-indigo-500 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50">
          Vận trình
        </NuxtLink>
        <button v-if="order && isCancellable(order.status)" @click="cancelOrder"
          :disabled="cancelling"
          class="text-sm border border-red-400 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50">
          {{ cancelling ? 'Đang hủy...' : 'Hủy đơn' }}
        </button>
      </div>
    </div>

    <!-- Items -->
    <div v-if="pending" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-20 bg-gray-100 rounded-lg animate-pulse" />
    </div>
    <div v-else class="border rounded-xl overflow-hidden">
      <div class="px-4 py-3 bg-gray-50 border-b">
        <h2 class="font-semibold text-sm text-gray-600 uppercase tracking-wide">Sản phẩm</h2>
      </div>
      <div class="divide-y">
        <div v-for="item in order?.items" :key="item.id" class="flex items-center gap-4 px-4 py-3">
          <div class="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
            <img v-if="item.product?.productImages?.[0]?.image_url"
              :src="item.product.productImages[0].image_url" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm truncate">{{ item.product?.name ?? `Sản phẩm #${item.product_id}` }}</p>
            <p class="text-xs text-gray-400 mt-0.5">SKU: {{ item.product?.sku ?? '—' }}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="text-sm text-gray-500">× {{ item.quantity }}</p>
            <p class="font-semibold text-sm">{{ fmt(item.unit_price * item.quantity) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Totals + Address -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="border rounded-xl p-4 space-y-2 text-sm">
        <h2 class="font-semibold text-gray-600 uppercase tracking-wide text-xs mb-3">Tổng tiền</h2>
        <div class="flex justify-between text-gray-600"><span>Tạm tính</span><span>{{ fmt(order?.subtotal ?? 0) }}</span></div>
        <div class="flex justify-between text-gray-600"><span>Vận chuyển</span><span>{{ fmt(order?.shipping ?? 0) }}</span></div>
        <div class="flex justify-between text-gray-600"><span>Thuế</span><span>{{ fmt(order?.tax ?? 0) }}</span></div>
        <div v-if="(order?.discount ?? 0) > 0" class="flex justify-between text-green-600">
          <span>Giảm giá</span><span>-{{ fmt(order?.discount ?? 0) }}</span>
        </div>
        <div class="flex justify-between font-bold text-base pt-2 border-t">
          <span>Tổng cộng</span>
          <span class="text-red-600">{{ fmt(order?.total ?? 0) }}</span>
        </div>
      </div>
      <div class="border rounded-xl p-4 space-y-2 text-sm">
        <h2 class="font-semibold text-gray-600 uppercase tracking-wide text-xs mb-3">Thông tin giao hàng</h2>
        <p class="text-gray-700">{{ order?.delivery_address ?? '—' }}</p>
        <div v-if="order?.coupon_code" class="flex items-center gap-2 mt-2">
          <span class="text-gray-500">Mã giảm giá:</span>
          <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-mono">{{ order.coupon_code }}</span>
        </div>
        <div class="pt-2 border-t space-y-1 text-xs text-gray-400">
          <p>Đặt lúc: {{ order?.created_at ? fmtDate(order.created_at) : '—' }}</p>
          <p v-if="order?.approved_at">Duyệt lúc: {{ fmtDate(order.approved_at) }}</p>
          <p v-if="order?.shipped_at">Giao lúc: {{ fmtDate(order.shipped_at) }}</p>
          <p v-if="order?.delivered_at">Nhận lúc: {{ fmtDate(order.delivered_at) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'account', middleware: 'auth' })

const route      = useRoute()
const uiStore    = useUiStore()
const cancelling = ref(false)

const { data: order, pending, refresh } = await useAsyncData(
  `order-detail-${route.params.id}`,
  () => useOrderApi().getOrder(Number(route.params.id))
)

const fmt     = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)
const fmtDate = (d: string) => new Date(d).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const isCancellable = (status?: string) =>
  ['pending', 'approved', 'picking', 'picked', 'packed'].includes(status ?? '')

const statusLabel = (s?: string) => ({
  pending: 'Chờ xác nhận', approved: 'Đã duyệt', picking: 'Đang lấy hàng',
  packed: 'Đóng gói', shipped: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy',
}[s ?? ''] ?? s)

const statusClass = (s?: string) => ({
  delivered: 'bg-green-100 text-green-700',
  shipped:   'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
}[s ?? ''] ?? 'bg-gray-100 text-gray-600')

const cancelOrder = async () => {
  if (!confirm('Bạn có chắc muốn hủy đơn hàng này?')) return
  cancelling.value = true
  try {
    await useOrderApi().cancelOrder(Number(route.params.id))
    uiStore.addToast('Đơn hàng đã được hủy', 'success')
    refresh()
  } catch {
    uiStore.addToast('Không thể hủy đơn hàng', 'error')
  } finally {
    cancelling.value = false
  }
}
</script>
