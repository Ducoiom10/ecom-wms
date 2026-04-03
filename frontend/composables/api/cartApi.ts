import type { ApiSuccess, Cart } from '~/types/models.types'

const unwrap = async <T>(request: Promise<unknown>) => {
  const response = await request as ApiSuccess<T>
  return response.data
}

export const useCartApi = () => {
  const api = useApi()

  return {
    getCart: () => unwrap<Cart>(api('cart/v1/cart')),
    addItem: (productId: number, quantity: number, variantId?: number) =>
      unwrap<Cart>(api('cart/v1/cart/items', { method: 'POST', body: { product_id: productId, quantity, variant_id: variantId } })),
    updateItem: (productId: number, quantity: number, variantId?: number) =>
      unwrap<Cart>(api(`cart/v1/cart/items/${productId}`, { method: 'PUT', body: { quantity, variant_id: variantId } })),
    removeItem: (productId: number, variantId?: number) =>
      unwrap<Cart>(api(`cart/v1/cart/items/${productId}`, { method: 'DELETE', query: { variant_id: variantId } })),
    applyCoupon: (code: string) => unwrap<Cart>(api('cart/v1/cart/coupon', { method: 'POST', body: { code } })),
    removeCoupon: () => unwrap<Cart>(api('cart/v1/cart/coupon', { method: 'DELETE' })),
  }
}
