<template>
  <div class="space-y-3">
    <div class="aspect-square bg-gray-100 rounded-xl overflow-hidden">
      <img :src="main" alt="Product" class="w-full h-full object-cover cursor-zoom-in" @click="zoom = true" />
    </div>
    <div class="grid grid-cols-4 gap-2">
      <img v-for="(img, i) in images" :key="i" :src="img.image_url"
        class="aspect-square object-cover rounded cursor-pointer border-2 transition"
        :class="main === img.image_url ? 'border-indigo-500' : 'border-transparent'"
        @click="main = img.image_url" />
    </div>
    <div v-if="zoom" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" @click="zoom = false">
      <img :src="main" class="max-h-screen max-w-screen-md object-contain" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductImage } from '~/types/models.types'
const props = defineProps<{ images: ProductImage[] }>()
const main = ref(props.images[0]?.image_url ?? '/placeholder.png')
const zoom = ref(false)
</script>
