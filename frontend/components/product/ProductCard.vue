<template>
  <div class="group relative border rounded-xl overflow-hidden hover:shadow-md transition bg-white">
    <!-- Wishlist button -->
    <button @click.prevent="wishlistStore.toggle(product)"
      class="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition">
      <span :class="wishlistStore.has(product.id) ? 'text-red-500' : 'text-gray-300'">♥</span>
    </button>

    <NuxtLink :to="`/products/${product.id}`">
      <div class="aspect-square bg-gray-100 overflow-hidden">
        <img :src="primaryImage" :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
      </div>
      <div class="p-3">
        <p class="text-sm font-medium line-clamp-2 text-gray-800">{{ product.name }}</p>
        <p class="text-red-600 font-bold mt-1 text-sm">{{ formatPrice(product.price) }}</p>
      </div>
    </NuxtLink>

    <div class="px-3 pb-3">
      <button @click="cartStore.addToCart(product.id, 1)"
        :disabled="cartStore.loading"
        class="w-full text-xs bg-indigo-600 text-white py-1.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition">
        Thêm vào giỏ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/models.types'
const props = defineProps<{ product: Product }>()
const cartStore     = useCartStore()
const wishlistStore = useWishlistStore()

const primaryImage = computed(() =>
  props.product.productImages?.find(i => i.is_primary)?.image_url
  ?? props.product.productImages?.[0]?.image_url
  ?? '/placeholder.png'
)
const formatPrice = (p: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p)
</script>
