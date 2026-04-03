<template>
  <div class="text-center py-12 px-4">
    <div class="text-5xl mb-4">{{ icon }}</div>
    <p class="font-semibold text-gray-700 mb-1">{{ title }}</p>
    <p class="text-sm text-gray-400 mb-5">{{ message }}</p>
    <NuxtLink v-if="actionLink" :to="actionLink"
      class="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700">
      {{ actionLabel }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ icon: string; title: string; message: string; actionLink?: string; actionLabel?: string }>()
</script>
