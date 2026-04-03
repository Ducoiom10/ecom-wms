import type { ApiSuccess, Order, OrderTracking, Paginated } from '~/types/models.types'

const unwrap = async <T>(request: Promise<unknown>) => {
  const response = await request as ApiSuccess<T>
  return response.data
}

export const useOrderApi = () => {
  const api = useApi()

  return {
    getOrders: (page = 1, limit = 10) =>
      unwrap<Paginated<Order>>(api('oms/v1/orders', { query: { page, limit } })),
    getOrder: (id: number) =>
      unwrap<Order>(api(`oms/v1/orders/${id}`)),
    createOrder: (payload: any) =>
      unwrap<Order>(api('oms/v1/orders', { method: 'POST', body: payload })),
    cancelOrder: (id: number) => api(`oms/v1/orders/${id}/cancel`, { method: 'POST' }),
    getTracking: (id: number) =>
      unwrap<OrderTracking>(api(`oms/v1/orders/${id}/tracking`)),
  }
}
