import type { ApiSuccess, CatalogFilters, Paginated, Product } from '~/types/models.types'

const unwrap = async <T>(request: Promise<unknown>) => {
  const response = await request as ApiSuccess<T>
  return response.data
}

export const useProductApi = () => {
  const api = useApi()

  return {
    getAll: (params?: Record<string, any>) =>
      unwrap<Paginated<Product>>(api('catalog/v1/products', { query: params })),
    getById: (id: string | number) =>
      unwrap<Product>(api(`catalog/v1/products/${id}`)),
    getRelated: (id: string | number) =>
      unwrap<Product[]>(api(`catalog/v1/products/${id}/related`)),
    search: (q: string, limit = 20) =>
      unwrap<Product[]>(api('catalog/v1/products/search', { query: { q, limit } })),
    getFilters: () =>
      unwrap<CatalogFilters>(api('catalog/v1/products/filters')),
    getByCategory: (slug: string, params?: Record<string, any>) =>
      unwrap<Paginated<Product>>(api('catalog/v1/products', { query: { category: slug, ...params } })),
  }
}
