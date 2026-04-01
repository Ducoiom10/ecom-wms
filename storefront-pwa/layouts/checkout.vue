<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Minimal header -->
    <header class="bg-white border-b">
      <div class="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <NuxtLink to="/" class="text-lg font-bold text-indigo-600">EcomWMS</NuxtLink>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <span v-for="(s, i) in steps" :key="s"
            :class="i <= currentIdx ? 'text-indigo-600 font-semibold' : ''">
            {{ s }}<span v-if="i < steps.length - 1" class="mx-1">›</span>
          </span>
        </div>
      </div>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
const cs = useCheckoutStore()
const steps = ['Đăng nhập', 'Giao hàng', 'Thanh toán', 'Xem lại', 'Hoàn tất']
const stepMap: Record<string, number> = { auth: 0, shipping: 1, payment: 2, review: 3, success: 4 }
const currentIdx = computed(() => stepMap[cs.step] ?? 0)
</script>
