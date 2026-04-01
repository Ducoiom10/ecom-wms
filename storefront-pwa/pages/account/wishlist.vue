<template>
  <div class="bg-white rounded-xl border p-6 space-y-5">
    <h1 class="text-xl font-bold">Sản phẩm yêu thích</h1>
    <UiEmptyState v-if="!wishlist.length" icon="❤️" title="Chưa có sản phẩm yêu thích" message="Nhấn ❤️ trên sản phẩm để lưu vào đây" action-link="/category" action-label="Khám phá sản phẩm" />
    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="p in wishlist" :key="p.id" class="relative">
        <ProductCard :product="p" />
        <button @click="remove(p.id)" class="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow text-red-500 hover:bg-red-50">×</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'account', middleware: 'auth' })
const wishlistStore = useWishlistStore()
const wishlist = computed(() => wishlistStore.items)
const remove = (id: number) => wishlistStore.remove(id)
</script>
