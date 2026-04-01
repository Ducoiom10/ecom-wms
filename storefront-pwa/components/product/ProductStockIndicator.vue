<template>
  <div v-if="stock > 0" class="flex items-center gap-2">
    <span class="text-sm" :class="stock > 10 ? 'text-green-600' : 'text-orange-500'">
      {{ stock > 10 ? 'Còn hàng' : `Còn ${stock} sản phẩm` }}
    </span>
    <div class="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div class="h-full rounded-full transition-all" :class="stock > 10 ? 'bg-green-500' : 'bg-orange-400'"
        :style="{ width: `${Math.min(100, (stock / 20) * 100)}%` }" />
    </div>
  </div>
  <p v-else class="text-red-600 font-semibold text-sm">Hết hàng</p>
</template>

<script setup lang="ts">
defineProps<{ stock: number }>()
</script>
