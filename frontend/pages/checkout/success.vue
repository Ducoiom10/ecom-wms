<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white rounded-2xl shadow p-10 max-w-md w-full text-center space-y-5">
      <div class="text-6xl">🎉</div>
      <h1 class="text-2xl font-bold text-green-600">Đặt hàng thành công!</h1>
      <p class="text-gray-600 text-sm">
        Đơn hàng <strong>#{{ cs.order?.id }}</strong> đã được tiếp nhận.<br />
        Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
      </p>
      <div class="bg-gray-50 rounded-lg p-4 text-sm text-left space-y-1">
        <div class="flex justify-between"><span class="text-gray-500">Tổng tiền</span><span class="font-bold text-red-600">{{ fmt(cs.order?.total ?? 0) }}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Thanh toán</span><span>{{ cs.payment === 'cod' ? 'COD' : cs.payment }}</span></div>
      </div>
      <div class="flex gap-3 pt-2">
        <NuxtLink to="/account/orders" class="flex-1 border border-indigo-600 text-indigo-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-50">
          Xem đơn hàng
        </NuxtLink>
        <NuxtLink to="/" @click="cs.reset()" class="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700">
          Tiếp tục mua sắm
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'checkout' })
const cs  = useCheckoutStore()
const fmt = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)
if (!cs.order) navigateTo('/')
</script>
