<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="text-center space-y-4">
      <p class="text-8xl font-black text-gray-200">{{ error?.statusCode ?? 500 }}</p>
      <h1 class="text-2xl font-bold text-gray-700">
        {{ error?.statusCode === 404 ? 'Trang không tìm thấy' : 'Có lỗi xảy ra' }}
      </h1>
      <p class="text-gray-400 text-sm max-w-sm mx-auto">{{ error?.message }}</p>
      <div class="flex gap-3 justify-center pt-2">
        <button @click="clearError({ redirect: '/' })"
          class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700">
          Về trang chủ
        </button>
        <button @click="clearError()" class="border px-6 py-2.5 rounded-lg hover:bg-gray-50">
          Thử lại
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: any }>()
</script>
