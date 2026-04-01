import type { Cart } from '~/types/models.types'

export const useCartStore = defineStore('cart', () => {
  const cart    = ref<Cart | null>(null)
  const loading = ref(false)

  const itemCount = computed(() => cart.value?.items.reduce((s, i) => s + i.quantity, 0) ?? 0)

  const fetchCart = async () => {
    loading.value = true
    try { cart.value = await useCartApi().getCart() as Cart }
    finally { loading.value = false }
  }

  const addToCart = async (productId: number, quantity: number, variantId?: number) => {
    loading.value = true
    try {
      cart.value = await useCartApi().addItem(productId, quantity, variantId) as Cart
      useUiStore().addToast('Thêm vào giỏ thành công', 'success')
    } finally { loading.value = false }
  }

  const updateQuantity = async (productId: number, quantity: number, variantId?: number) => {
    loading.value = true
    try { cart.value = await useCartApi().updateItem(productId, quantity, variantId) as Cart }
    finally { loading.value = false }
  }

  const removeItem = async (productId: number, variantId?: number) => {
    loading.value = true
    try { cart.value = await useCartApi().removeItem(productId, variantId) as Cart }
    finally { loading.value = false }
  }

  const applyCoupon = async (code: string) => {
    loading.value = true
    try {
      cart.value = await useCartApi().applyCoupon(code) as Cart
      useUiStore().addToast('Áp dụng mã khuyến mãi thành công', 'success')
    } finally { loading.value = false }
  }

  return {
    cart:       readonly(cart),
    loading:    readonly(loading),
    itemCount,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    applyCoupon,
  }
})
