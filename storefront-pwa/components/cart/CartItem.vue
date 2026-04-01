<template>
  <div class="flex gap-3 pb-4 border-b">
    <div class="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
      <img v-if="item.image" :src="item.image" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full bg-gray-200" />
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium line-clamp-2">Product #{{ item.product_id }}</p>
      <div class="flex items-center gap-2 mt-2">
        <button @click="dec" :disabled="item.quantity <= 1" class="w-6 h-6 border rounded text-sm disabled:opacity-40">−</button>
        <span class="text-sm w-6 text-center">{{ item.quantity }}</span>
        <button @click="inc" class="w-6 h-6 border rounded text-sm">+</button>
      </div>
    </div>
    <div class="text-right flex-shrink-0">
      <p class="text-sm font-bold">{{ fmt(item.price * item.quantity) }}</p>
      <button @click="emit('remove', item.product_id, item.variant_id)" class="text-xs text-red-500 mt-1 hover:underline">Xóa</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types/models.types'
const props = defineProps<{ item: CartItem }>()
const emit  = defineEmits<{ remove: [productId: number, variantId: number | null] }>()
const cartStore = useCartStore()
const fmt = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)
const inc = () => cartStore.updateQuantity(props.item.product_id, props.item.quantity + 1, props.item.variant_id ?? undefined)
const dec = () => cartStore.updateQuantity(props.item.product_id, props.item.quantity - 1, props.item.variant_id ?? undefined)
</script>
