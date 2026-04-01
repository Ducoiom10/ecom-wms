<template>
  <header class="sticky top-0 z-40 bg-white border-b shadow-sm">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
      <NuxtLink to="/" class="text-xl font-bold text-indigo-600">EcomWMS</NuxtLink>
      <div class="flex items-center gap-4">
        <button @click="uiStore.toggleCart()" class="relative p-2">
          <span class="text-xl">🛒</span>
          <span v-if="cartStore.itemCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ cartStore.itemCount }}
          </span>
        </button>
        <NuxtLink v-if="!authStore.isLoggedIn" to="/login" class="text-sm font-medium text-indigo-600 hover:underline">Đăng nhập</NuxtLink>
        <button v-else @click="authStore.logout()" class="text-sm text-gray-500 hover:text-red-600">Đăng xuất</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const uiStore   = useUiStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
</script>
