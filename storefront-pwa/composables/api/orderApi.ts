export const useOrderApi = () => {
  const api = useApi()

  return {
    getOrders:   (page = 1, limit = 10) => api('oms/v1/orders', { query: { page, limit } }),
    getOrder:    (id: number)           => api(`oms/v1/orders/${id}`),
    createOrder: (payload: any)         => api('oms/v1/orders', { method: 'POST', body: payload }),
    cancelOrder: (id: number)           => api(`oms/v1/orders/${id}/cancel`, { method: 'POST' }),
    getTracking: (id: number)           => api(`oms/v1/orders/${id}/tracking`),
  }
}
