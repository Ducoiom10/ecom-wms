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
  productImages?: ProductImage[]
  productVariants?: ProductVariant[]
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
}

export interface Cart {
  items: CartItem[]
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
  items?: OrderItem[]
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: number
  product?: Product
}

export interface User {
  id: number
  name: string
  email: string
  role: string
  is_active: boolean
}
