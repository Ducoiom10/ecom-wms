<template>
  <div class="flex items-center justify-center gap-1 mt-8">
    <button v-for="p in total" :key="p" @click="emit('change', p)"
      class="w-8 h-8 rounded text-sm transition"
      :class="p === current ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'">
      {{ p }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ current: number; total: number }>()
const emit = defineEmits<{ change: [page: number] }>()
</script>
