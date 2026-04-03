<template>
  <div class="max-w-2xl mx-auto py-10 px-4 space-y-6">
    <h1 class="text-2xl font-bold">Xem lại đơn hàng</h1>

    <!-- Items -->
    <div class="bg-white rounded-xl border p-5 space-y-3">
      <h2 class="font-semibold text-sm text-gray-500 uppercase tracking-wide">Sản phẩm</h2>
      <div v-for="item in cartStore.cart?.items" :key="item.product_id" class="flex justify-between text-sm">
        <span>Product #{{ item.product_id }} × {{ item.quantity }}</span>
        <span class="font-medium">{{ fmt(item.price * item.quantity) }}</span>
      </div>
    </div>

    <!-- Address & Shipping -->
    <div class="bg-white rounded-xl border p-5 space-y-2 text-sm">
      <h2 class="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Giao hàng</h2>
      <p><strong>{{ cs.customer.fullName }}</strong> — {{ cs.customer.phone }}</p>
      <p>{{ cs.address.street }}, {{ cs.address.ward }}, {{ cs.address.district }}, {{ cs.address.province }}</p>
      <p class="text-gray-500">{{ cs.shipping === 'express' ? 'Nhanh (1-2 ngày)' : 'Tiêu chuẩn (3-5 ngày)' }}</p>
    </div>

    <!-- Totals -->
    <div class="bg-white rounded-xl border p-5 space-y-2 text-sm">
      <div class="flex justify-between text-gray-600"><span>Tạm tính</span><span>{{ fmt(cartStore.cart?.subtotal ?? 0) }}</span></div>
      <div class="flex justify-between text-gray-600"><span>Vận chuyển</span><span>{{ fmt(cs.shippingFee) }}</span></div>
      <div class="flex justify-between font-bold text-base pt-2 border-t">
        <span>Tổng cộng</span>
        <span class="text-red-600">{{ fmt((cartStore.cart?.subtotal ?? 0) + cs.shippingFee) }}</span>
      </div>
    </div>

    <div class="flex gap-3">
      <button @click="navigateTo('/checkout/payment')" class="px-6 py-2.5 border rounded-lg text-sm">← Quay lại</button>
      <button @click="placeOrder" :disabled="cs.isSubmitting"
        class="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50">
        {{ cs.isSubmitting ? 'Đang đặt hàng...' : '✓ Đặt hàng' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'checkout' })
const cs         = useCheckoutStore()
const cartStore  = useCartStore()
const fmt = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

const placeOrder = async () => {
  await cs.submit()
  if (cs.order) navigateTo('/checkout/success')
}
</script>
