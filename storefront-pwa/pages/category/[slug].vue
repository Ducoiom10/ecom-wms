<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <aside class="md:col-span-1">
        <ProductCatalogSidebar :selected="selectedFilters" @update="updateFilter" />
      </aside>
      <main class="md:col-span-3">
        <div class="flex justify-between items-center mb-6">
          <p class="text-gray-500 text-sm">{{ products?.total ?? 0 }} sản phẩm</p>
          <select v-model="sort" class="border rounded px-3 py-1.5 text-sm">
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
          </select>
        </div>
        <div v-if="pending" class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <UiSkeletonCard v-for="i in 9" :key="i" />
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard v-for="p in products?.data" :key="p.id" :product="p" />
        </div>
        <UiPagination v-if="totalPages > 1" :current="page" :total="totalPages" @change="p => page = p" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route  = useRoute()
const sort   = ref((route.query.sort as string) || 'newest')
const page   = ref(Number(route.query.page) || 1)
const selectedFilters = ref<Record<string, any>>({})

const { data: products, pending, refresh } = await useAsyncData(
  `category-${route.params.slug}`,
  () => useProductApi().getByCategory(route.params.slug as string, {
    sort: sort.value, page: page.value, ...selectedFilters.value,
  })
)

const totalPages = computed(() => Math.ceil((products.value?.total ?? 0) / 12))

const updateFilter = (key: string, value: any) => {
  if (key === 'reset') { selectedFilters.value = {} } else { selectedFilters.value[key] = value }
  page.value = 1
  refresh()
}

watch([sort, page], refresh)
</script>
