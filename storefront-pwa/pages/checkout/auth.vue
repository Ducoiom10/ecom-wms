<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow p-8 space-y-5">
      <h1 class="text-2xl font-bold">Đăng nhập để thanh toán</h1>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="form.email" type="email" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Mật khẩu</label>
          <input v-model="form.password" type="password" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
        <button type="submit" :disabled="authStore.loading"
          class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">
          {{ authStore.loading ? 'Đang xử lý...' : 'Tiếp tục' }}
        </button>
      </form>
      <div class="text-center border-t pt-4">
        <button @click="navigateTo('/checkout/shipping')" class="text-sm text-gray-500 hover:text-indigo-600">
          Thanh toán không cần đăng nhập →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'checkout' })
const authStore = useAuthStore()
const form  = reactive({ email: '', password: '' })
const error = ref('')

const submit = async () => {
  error.value = ''
  try {
    await authStore.login(form.email, form.password)
    navigateTo('/checkout/shipping')
  } catch {
    error.value = 'Email hoặc mật khẩu không đúng.'
  }
}
</script>
