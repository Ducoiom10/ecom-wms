import type { Product } from '~/types/models.types'

export const useWishlistStore = defineStore('wishlist', () => {
  const ids     = ref<number[]>([])
  const items   = ref<Product[]>([])
  const loading = ref(false)

  const has = (id: number) => ids.value.includes(id)

  const add = async (product: Product) => {
    if (has(product.id)) return
    ids.value.push(product.id)
    items.value.push(product)
    persist()
  }

  const remove = (id: number) => {
    ids.value  = ids.value.filter(i => i !== id)
    items.value = items.value.filter(p => p.id !== id)
    persist()
  }

  const toggle = async (product: Product) => {
    has(product.id) ? remove(product.id) : await add(product)
  }

  const persist = () => {
    if (import.meta.client) localStorage.setItem('wishlist_ids', JSON.stringify(ids.value))
  }

  const hydrate = async () => {
    if (!import.meta.client) return
    const saved = localStorage.getItem('wishlist_ids')
    if (!saved) return
    const savedIds: number[] = JSON.parse(saved)
    if (!savedIds.length) return
    ids.value   = savedIds
    loading.value = true
    try {
      const results = await Promise.all(savedIds.map(id => useProductApi().getById(id)))
      items.value = results.filter(Boolean) as Product[]
    } finally {
      loading.value = false
    }
  }

  return { ids: readonly(ids), items: readonly(items), loading: readonly(loading), has, add, remove, toggle, hydrate }
})
