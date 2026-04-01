<template>
  <div class="max-w-2xl mx-auto py-10 px-4 space-y-8">
    <h1 class="text-2xl font-bold">Phương thức thanh toán</h1>
    <div class="bg-white rounded-xl border p-6 space-y-3">
      <label v-for="opt in paymentOpts" :key="opt.value"
        class="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-indigo-400 transition"
        :class="cs.payment === opt.value ? 'border-indigo-600 bg-indigo-50' : ''">
        <input type="radio" :value="opt.value" v-model="cs.payment" class="accent-indigo-600" />
        <span class="text-2xl">{{ opt.icon }}</span>
        <div>
          <p class="font-medium text-sm">{{ opt.label }}</p>
          <p class="text-xs text-gray-400">{{ opt.desc }}</p>
        </div>
      </label>
    </div>
    <div class="flex gap-3">
      <button @click="navigateTo('/checkout/shipping')" class="px-6 py-2.5 border rounded-lg text-sm hover:bg-gray-50">← Quay lại</button>
      <button @click="navigateTo('/checkout/review')"
        class="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700">
        Xem lại đơn hàng →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'checkout' })
const cs = useCheckoutStore()
const paymentOpts = [
  { value: 'cod',     icon: '💵', label: 'Thanh toán khi nhận hàng (COD)', desc: 'Trả tiền mặt khi nhận hàng' },
  { value: 'stripe',  icon: '💳', label: 'Thẻ tín dụng / Ghi nợ',          desc: 'Visa, Mastercard, JCB' },
  { value: 'zalopay', icon: '📱', label: 'ZaloPay',                         desc: 'Ví điện tử ZaloPay' },
]
</script>
