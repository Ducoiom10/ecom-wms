<template>
  <div class="space-y-4">
    <div v-for="attr in attrs" :key="attr.name">
      <p class="text-sm font-semibold mb-2 capitalize">{{ attr.name }}</p>
      <div class="flex flex-wrap gap-2">
        <button v-for="val in attr.values" :key="val" @click="select(attr.name, val)"
          class="px-3 py-1.5 text-sm border rounded-lg transition"
          :class="selected[attr.name] === val ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-300 hover:border-gray-400'">
          {{ val }}
        </button>
      </div>
    </div>
    <div v-if="matched" class="bg-indigo-50 rounded-lg p-3 text-sm">
      Biến thể: <strong>{{ matched.variant_name }}</strong>
      <span v-if="matched.price_override" class="ml-2 text-red-600 font-bold">
        {{ new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(matched.price_override) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, ProductVariant } from '~/types/models.types'
const props = defineProps<{ product: Product }>()
const emit  = defineEmits<{ select: [v: ProductVariant] }>()
const selected = ref<Record<string, string>>({})

const attrs = computed(() => {
  const map: Record<string, Set<string>> = {}
  props.product.productVariants?.forEach(v =>
    Object.entries(v.attributes ?? {}).forEach(([k, val]) => {
      if (!map[k]) map[k] = new Set()
      map[k].add(val)
    })
  )
  return Object.entries(map).map(([name, values]) => ({ name, values: [...values] }))
})

const matched = computed(() =>
  props.product.productVariants?.find(v =>
    Object.entries(selected.value).every(([k, val]) => v.attributes?.[k] === val)
  ) ?? null
)

const select = (name: string, val: string) => {
  selected.value[name] = val
  if (matched.value) emit('select', matched.value)
}
</script>
