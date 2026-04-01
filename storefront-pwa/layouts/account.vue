<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside class="md:col-span-1">
        <div class="bg-white rounded-xl border p-5 space-y-4">
          <div class="text-center pb-4 border-b">
            <div class="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl flex items-center justify-center mx-auto mb-2">
              {{ initials }}
            </div>
            <p class="font-semibold text-sm">{{ authStore.user?.name }}</p>
            <p class="text-xs text-gray-400">{{ authStore.user?.email }}</p>
          </div>
          <nav class="space-y-1 text-sm">
            <NuxtLink v-for="item in menu" :key="item.to" :to="item.to"
              active-class="bg-indigo-50 text-indigo-600 font-semibold"
              class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition text-gray-700">
              <span>{{ item.icon }}</span>{{ item.label }}
            </NuxtLink>
            <button @click="authStore.logout()"
              class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition text-left">
              🚪 Đăng xuất
            </button>
          </nav>
        </div>
      </aside>
      <main class="md:col-span-3">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const authStore = useAuthStore()
const initials  = computed(() => authStore.user?.name?.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase() ?? '?')
const menu = [
  { to: '/account/orders',    icon: '📦', label: 'Đơn hàng' },
  { to: '/account/loyalty',   icon: '⭐', label: 'Điểm thưởng' },
  { to: '/account/addresses', icon: '📍', label: 'Địa chỉ' },
  { to: '/account/wishlist',  icon: '❤️', label: 'Yêu thích' },
  { to: '/account/profile',   icon: '⚙️', label: 'Hồ sơ' },
]
</script>
