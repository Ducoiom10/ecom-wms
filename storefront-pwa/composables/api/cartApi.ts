export const useCartApi = () => {
  const api = useApi()

  return {
    getCart:      ()                                                    => api('cart/v1/cart'),
    addItem:      (productId: number, quantity: number, variantId?: number) =>
      api('cart/v1/cart/items', { method: 'POST', body: { product_id: productId, quantity, variant_id: variantId } }),
    updateItem:   (productId: number, quantity: number, variantId?: number) =>
      api(`cart/v1/cart/items/${productId}`, { method: 'PUT', body: { quantity, variant_id: variantId } }),
    removeItem:   (productId: number, variantId?: number) =>
      api(`cart/v1/cart/items/${productId}`, { method: 'DELETE', query: { variant_id: variantId } }),
    applyCoupon:  (code: string) => api('cart/v1/cart/coupon', { method: 'POST', body: { code } }),
    removeCoupon: ()             => api('cart/v1/cart/coupon', { method: 'DELETE' }),
  }
}
