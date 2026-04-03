<template>
  <Teleport to="body">
    <Transition enter-from-class="opacity-0" enter-active-class="transition duration-300"
      leave-to-class="opacity-0" leave-active-class="transition duration-300">
      <div v-if="uiStore.isCartOpen" class="fixed inset-0 z-50 flex justify-end">
        <div class="absolute inset-0 bg-black/50" @click="uiStore.toggleCart()" />
        <Transition enter-from-class="translate-x-full" enter-active-class="transition duration-300"
          leave-to-class="translate-x-full" leave-active-class="transition duration-300">
          <div v-if="uiStore.isCartOpen" class="relative w-full max-w-md bg-white h-full flex flex-col shadow-xl">

            <!-- Header -->
            <div class="flex items-center justify-between px-5 py-4 border-b">
              <h2 class="font-bold text-lg">Giỏ hàng ({{ cartStore.itemCount }})</h2>
              <button @click="uiStore.toggleCart()" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>

            <!-- Items -->
            <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <p v-if="!items.length" class="text-center text-gray-400 py-16">
                Giỏ hàng trống.<br />
                <NuxtLink to="/category" @click="uiStore.toggleCart()" class="text-indigo-600 hover:underline text-sm mt-2 inline-block">Tiếp tục mua sắm</NuxtLink>
              </p>
              <CartCartItem v-for="item in items" :key="`${item.product_id}-${item.variant_id}`"
                :item="item" @remove="cartStore.removeItem" />
            </div>

            <!-- Coupon -->
            <div v-if="items.length" class="px-5 py-3 border-t">
              <div class="flex gap-2">
                <input v-model="coupon" placeholder="Mã khuyến mãi"
                  class="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                <button @click="applyCoupon" :disabled="!coupon || cartStore.loading"
                  class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50">
                  Áp dụng
                </button>
              </div>
              <p v-if="cartStore.cart?.coupon" class="text-green-600 text-xs mt-1">✓ Đã áp dụng: {{ cartStore.cart.coupon }}</p>
            </div>

            <!-- Summary -->
            <div v-if="items.length" class="px-5 py-4 border-t space-y-2 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{{ fmt(cartStore.cart?.subtotal ?? 0) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>{{ fmt(cartStore.cart?.shipping ?? 0) }}</span>
              </div>
              <div v-if="(cartStore.cart?.discount ?? 0) > 0" class="flex justify-between text-green-600">
                <span>Giảm giá</span>
                <span>-{{ fmt(cartStore.cart?.discount ?? 0) }}</span>
              </div>
              <div class="flex justify-between font-bold text-base pt-2 border-t">
                <span>Tổng cộng</span>
                <span class="text-red-600">{{ fmt(cartStore.cart?.total ?? 0) }}</span>
              </div>
            </div>

            <!-- CTA -->
            <div v-if="items.length" class="px-5 py-4 border-t">
              <NuxtLink to="/checkout/shipping" @click="uiStore.toggleCart()"
                class="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Thanh toán
              </NuxtLink>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const uiStore   = useUiStore()
const cartStore = useCartStore()
const coupon    = ref('')
const items     = computed(() => cartStore.cart?.items ?? [])
const fmt = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

const applyCoupon = async () => {
  if (!coupon.value) return
  await cartStore.applyCoupon(coupon.value)
  coupon.value = ''
}

// Load cart khi mở
watch(() => uiStore.isCartOpen, open => { if (open) cartStore.fetchCart() })
</script>
