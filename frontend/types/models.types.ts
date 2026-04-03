export interface Product {
  id: number
  name: string
  slug: string
  sku: string
  description: string
  price: number
  category_id: number
  brand_id: number | null
  is_active: boolean
  category?: Category
  brand?: Brand
  productImages?: readonly ProductImage[]
  productVariants?: readonly ProductVariant[]
  attributes?: Record<string, string>
  available_stock?: number
}

export interface ProductVariant {
  id: number
  product_id: number
  sku: string
  variant_name: string
  price_override: number | null
  is_active: boolean
  attributes?: Record<string, string>
  stock?: number
}

export interface ProductImage {
  id: number
  product_id: number
  image_url: string
  alt_text: string
  is_primary: boolean
  sort_order: number
}

export interface Category {
  id: number
  name: string
  slug: string
  parent_id: number | null
}

export interface Brand {
  id: number
  name: string
  logo_url: string | null
}

export interface CartItem {
  product_id: number
  variant_id: number | null
  quantity: number
  price: number
  added_at: string
  image?: string | null
}

export interface Cart {
  items: readonly CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  coupon: string | null
}

export interface Order {
  id: number
  user_id: number
  status: string
  created_at?: string
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  delivery_address: string
  coupon_code: string | null
  approved_at: string | null
  shipped_at: string | null
  delivered_at: string | null
  items?: readonly OrderItem[]
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price?: number
  unit_price?: number
  subtotal?: number
  product?: Product
}

export interface Address {
  id: number
  type: 'home' | 'work' | 'other'
  street: string
  city: string
  state?: string | null
  postal_code: string
  country: string
  is_default: boolean
}

export interface LoyaltyTransaction {
  id: number
  points: number
  description?: string
  reason?: string | null
}

export interface LoyaltyBenefits {
  tier: string
  points: number
  multiplier: number
  discount_pct: number
  birthday_bonus: number
  free_shipping: boolean
  transactions?: readonly LoyaltyTransaction[]
}

export interface Review {
  id: number
  rating: number
  content: string
  created_at: string
  user?: Pick<User, 'id' | 'name'>
}

export interface OrderTracking {
  order_id: number
  status: string
  delivery_address?: string | null
  approved_at?: string | null
  shipped_at?: string | null
  delivered_at?: string | null
}

export interface CatalogFilters {
  brands: readonly Brand[]
  categories?: readonly Category[]
}

export interface Paginated<T> {
  current_page: number
  data: readonly T[]
  total: number
  per_page?: number
  last_page?: number
}

export interface ApiSuccess<T> {
  success: boolean
  message: string
  data: T
  code: number
  timestamp: string
}

export interface User {
  id: number
  name: string
  email: string
  role: string
  is_active: boolean
}
