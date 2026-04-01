<template>
  <div class="animate-pulse space-y-2">
    <div class="h-4 bg-gray-200 rounded" :style="{ width: width }" />
  </div>
</template>
<script setup lang="ts">
defineProps<{ width?: string }>()
</script>
