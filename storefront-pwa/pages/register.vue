<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow p-8 space-y-5">
      <h1 class="text-2xl font-bold text-center">Tạo tài khoản</h1>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Họ tên</label>
          <input v-model="form.name" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="form.email" type="email" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Mật khẩu</label>
          <input v-model="form.password" type="password" required minlength="8" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
          <input v-model="form.password_confirmation" type="password" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
        <button type="submit" :disabled="loading"
          class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">
          {{ loading ? 'Đang xử lý...' : 'Đăng ký' }}
        </button>
        <p class="text-center text-sm text-gray-500">
          Đã có tài khoản? <NuxtLink to="/login" class="text-indigo-600 hover:underline">Đăng nhập</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'guest' })
const loading = ref(false)
const error   = ref('')
const form    = reactive({ name: '', email: '', password: '', password_confirmation: '' })

const submit = async () => {
  if (form.password !== form.password_confirmation) {
    error.value = 'Mật khẩu xác nhận không khớp.'
    return
  }
  loading.value = true
  error.value   = ''
  try {
    await useAuthApi().register(form.name, form.email, form.password, form.password_confirmation)
    const authStore = useAuthStore()
    await authStore.login(form.email, form.password)
    navigateTo('/')
  } catch {
    error.value = 'Đăng ký thất bại. Email có thể đã được sử dụng.'
  } finally {
    loading.value = false
  }
}
</script>
