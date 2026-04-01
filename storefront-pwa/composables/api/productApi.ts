export const useProductApi = () => {
  const api = useApi()

  return {
    getAll:      (params?: Record<string, any>) => api('catalog/v1/products', { query: params }),
    getById:     (id: string | number)          => api(`catalog/v1/products/${id}`),
    getRelated:  (id: string | number)          => api(`catalog/v1/products/${id}/related`),
    search:      (q: string, limit = 20)        => api('catalog/v1/products/search', { query: { q, limit } }),
    getFilters:  ()                             => api('catalog/v1/products/filters'),
    getByCategory: (slug: string, params?: Record<string, any>) =>
      api('catalog/v1/products', { query: { category: slug, ...params } }),
  }
}
