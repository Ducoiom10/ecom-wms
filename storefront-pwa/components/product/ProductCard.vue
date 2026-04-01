<template>
  <NuxtLink :to="`/products/${product.id}`" class="group block border rounded-xl overflow-hidden hover:shadow-md transition">
    <div class="aspect-square bg-gray-100 overflow-hidden">
      <img :src="primaryImage" :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
    </div>
    <div class="p-3">
      <p class="text-sm font-medium line-clamp-2">{{ product.name }}</p>
      <p class="text-red-600 font-bold mt-1">{{ formatPrice(product.price) }}</p>
      <button @click.prevent="cartStore.addToCart(product.id, 1)"
        class="mt-2 w-full text-xs bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition">
        Thêm vào giỏ
      </button>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '~/types/models.types'
const props = defineProps<{ product: Product }>()
const cartStore = useCartStore()
const primaryImage = computed(() =>
  props.product.productImages?.find(i => i.is_primary)?.image_url
  ?? props.product.productImages?.[0]?.image_url
  ?? '/placeholder.png'
)
const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p)
</script>
