import type { Product } from '~/types/models.types'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<Product[]>([])

  const add = (product: Product) => {
    if (!items.value.find(p => p.id === product.id)) {
      items.value.push(product)
      if (import.meta.client) localStorage.setItem('wishlist', JSON.stringify(items.value.map(p => p.id)))
    }
  }

  const remove = (id: number) => {
    items.value = items.value.filter(p => p.id !== id)
    if (import.meta.client) localStorage.setItem('wishlist', JSON.stringify(items.value.map(p => p.id)))
  }

  const has = (id: number) => items.value.some(p => p.id === id)

  return { items: readonly(items), add, remove, has }
})
