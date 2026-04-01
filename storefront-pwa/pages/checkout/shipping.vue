<template>
  <div class="max-w-2xl mx-auto py-10 px-4 space-y-8">
    <h1 class="text-2xl font-bold">Địa chỉ giao hàng</h1>
    <div class="bg-white rounded-xl border p-6 space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <input v-model="cs.customer.fullName" placeholder="Họ và tên *" class="col-span-2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        <input v-model="cs.customer.phone" placeholder="Số điện thoại *" class="border rounded-lg px-3 py-2 focus:outline-none" />
        <input v-model="cs.customer.email" placeholder="Email" type="email" class="border rounded-lg px-3 py-2 focus:outline-none" />
        <input v-model="cs.address.province" placeholder="Tỉnh / Thành phố *" class="border rounded-lg px-3 py-2 focus:outline-none" />
        <input v-model="cs.address.district" placeholder="Quận / Huyện *" class="border rounded-lg px-3 py-2 focus:outline-none" />
        <input v-model="cs.address.ward" placeholder="Phường / Xã" class="border rounded-lg px-3 py-2 focus:outline-none" />
        <input v-model="cs.address.street" placeholder="Số nhà, tên đường *" class="border rounded-lg px-3 py-2 focus:outline-none" />
      </div>
    </div>

    <div class="bg-white rounded-xl border p-6 space-y-3">
      <h2 class="font-semibold">Phương thức vận chuyển</h2>
      <label v-for="opt in shippingOpts" :key="opt.value"
        class="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-indigo-400 transition"
        :class="cs.shipping === opt.value ? 'border-indigo-600 bg-indigo-50' : ''">
        <div class="flex items-center gap-3">
          <input type="radio" :value="opt.value" v-model="cs.shipping" class="accent-indigo-600" />
          <span class="text-sm">{{ opt.label }}</span>
        </div>
        <span class="text-sm font-semibold">{{ fmt(opt.fee) }}</span>
      </label>
    </div>

    <div class="flex gap-3">
      <button @click="navigateTo('/checkout/auth')" class="px-6 py-2.5 border rounded-lg text-sm hover:bg-gray-50">← Quay lại</button>
      <button @click="navigateTo('/checkout/payment')" :disabled="!valid"
        class="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">
        Tiếp tục →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'checkout' })
const cs  = useCheckoutStore()
const fmt = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

const shippingOpts = [
  { value: 'standard', label: 'Tiêu chuẩn (3-5 ngày)', fee: 30000 },
  { value: 'express',  label: 'Nhanh (1-2 ngày)',       fee: 50000 },
]

const valid = computed(() =>
  cs.customer.fullName && cs.customer.phone && cs.address.province && cs.address.street
)
</script>
