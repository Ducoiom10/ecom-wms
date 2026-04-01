<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2">
    <Transition v-for="t in uiStore.toasts" :key="t.id"
      enter-from-class="translate-x-full opacity-0" enter-active-class="transition duration-300"
      leave-to-class="translate-x-full opacity-0" leave-active-class="transition duration-300">
      <div class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm min-w-64"
        :class="{
          'bg-green-600': t.type === 'success',
          'bg-red-600':   t.type === 'error',
          'bg-amber-500': t.type === 'warning',
          'bg-blue-600':  t.type === 'info',
        }">
        <span>{{ t.message }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const uiStore = useUiStore()
</script>
