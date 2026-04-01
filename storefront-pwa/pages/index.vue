<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-8">Sản phẩm nổi bật</h1>
    <div v-if="pending" class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <ProductSkeletonCard v-for="i in 8" :key="i" />
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <ProductCard v-for="p in products?.data" :key="p.id" :product="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: products, pending } = await useAsyncData('home-products',
  () => useProductApi().getAll({ limit: 8 })
)
</script>
