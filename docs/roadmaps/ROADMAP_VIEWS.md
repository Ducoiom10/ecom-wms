# 🎨 LỘ TRÌNH VIEWS / FRONTEND — TRẠNG THÁI THỰC TẾ

> **Tech Stack:** Filament 3 (Admin) + Nuxt 3 (Storefront) + Tailwind CSS + Laravel Reverb  
> **Cập nhật lần cuối:** Tự động đồng bộ từ codebase  
> **Quy ước:** ✅ Hoàn thành | 🔧 Có nhưng cần bổ sung | ❌ Chưa làm

---

## 📊 TỔNG QUAN TIẾN ĐỘ

| Phase | Giai đoạn              | Storefront (Nuxt 3) | Admin (Filament) | Tổng thể |
|-------|------------------------|---------------------|------------------|----------|
| 1     | UI Foundation & API    | ✅ 100%             | ✅ 100%          | ✅ 100%  |
| 2     | Catalog & Product      | ✅ 100%             | ✅ 100%          | ✅ 100%  |
| 3     | WMS & Real-time        | ✅ 100%             | ✅ 100%          | ✅ 100%  |
| 4     | Cart, Checkout & OMS   | ✅ 100%             | ✅ 100%          | ✅ 100%  |
| 5     | TMS, Finance & RBAC    | ✅ 100%             | ✅ 100%          | ✅ 100%  |
| 6     | CRM, Portal & Polish   | ✅ 100%             | ✅ 100%          | ✅ 100%  |

---

## ✅ PHASE 1 — UI FOUNDATION & API LAYER (HOÀN THÀNH)

### Nuxt 3 Storefront
- ✅ `nuxt.config.ts` — modules: tailwindcss, pinia, image, vueuse, i18n
- ✅ `app.vue` — NuxtLayout + NuxtPage
- ✅ `assets/css/tailwind.css` + `transitions.css`
- ✅ `layouts/default.vue` — Header + Footer + SlideOverCart + ToastContainer
- ✅ `layouts/checkout.vue` — Minimal header với step indicator
- ✅ `layouts/account.vue` — Sidebar navigation + user info
- ✅ `composables/useApi.ts` — $fetch factory với auth header + error interceptors (401/403/500)
- ✅ `composables/api/authApi.ts` — register, login, logout, me, updateProfile
- ✅ `composables/api/productApi.ts` — getAll, getById, getRelated, search, getFilters, getByCategory
- ✅ `composables/api/cartApi.ts` — getCart, addItem, updateItem, removeItem, applyCoupon, removeCoupon
- ✅ `composables/api/orderApi.ts` — getOrders, getOrder, createOrder, cancelOrder, getTracking
- ✅ `stores/auth.ts` — token, user, login, logout, loadProfile, hydrate
- ✅ `stores/cart.ts` — cart, itemCount, fetchCart, addToCart, updateQuantity, removeItem, applyCoupon
- ✅ `stores/ui.ts` — isCartOpen, toasts, modals, toggleCart, addToast, openModal/closeModal
- ✅ `stores/checkout.ts` — step, customer, address, shipping, payment, shippingFee, next/prev/submit/reset
- ✅ `stores/wishlist.ts` — ids, items, has, add, remove, toggle, hydrate (localStorage)
- ✅ `middleware/auth.ts` + `middleware/guest.ts`
- ✅ `plugins/1.echo.client.ts` — Laravel Echo + Reverb, lắng nghe stock.updated + picklist.created
- ✅ `plugins/2.auth.client.ts` — hydrate auth + wishlist khi load
- ✅ `plugins/3.permissions.client.ts` — directive `v-can` + `v-role`
- ✅ `composables/usePermission.ts` — can(), cannot(), hasRole()
- ✅ `types/models.types.ts` — Product, ProductVariant, ProductImage, Category, Brand, Cart, CartItem, Order, OrderItem, User
- ✅ `components/common/Header.vue` — logo, cart icon với badge, login/logout
- ✅ `components/common/Footer.vue`
- ✅ `components/ui/ToastContainer.vue` — slide-in toasts với màu theo type
- ✅ `components/ui/SkeletonCard.vue` + `SkeletonText.vue`
- ✅ `components/ui/Pagination.vue`
- ✅ `components/ui/EmptyState.vue`

### Filament Admin
- ✅ `AdminPanelProvider.php` — đăng ký 10 Resources + 3 Pages + 4 Widgets
- ✅ `app/Http/Responses/ApiResponse.php` — success, error, created, paginated, notFound, unauthorized, forbidden, serverError

---

## 🔧 PHASE 2 — CATALOG & PRODUCT UI (85% — CẦN BỔ SUNG)

### Nuxt 3 Storefront
- ✅ `pages/category/[slug].vue` — grid sản phẩm, sort, pagination, sidebar filter
- ✅ `pages/products/[id].vue` — gallery, variant selector, stock indicator, add to cart, related products
- ✅ `components/product/ProductCard.vue` — image, name, price, wishlist, add to cart
- ✅ `components/product/ProductGallery.vue` — main image, thumbnails, zoom modal
- ✅ `components/product/ProductVariantSelector.vue` — attribute-based selection, price override display
- ✅ `components/product/ProductCatalogSidebar.vue` — price range, brand filter, load filters từ API
- ✅ `components/product/ProductStockIndicator.vue` — còn hàng / hết hàng / số lượng thấp
- ✅ `components/product/ReviewForm.vue` — star rating, textarea, submit tới `crm/v1/reviews`
- ✅ `components/product/ReviewList.vue` — list reviews, sort, pagination
- 🔧 `pages/products/[id].vue` — **THIẾU:** ReviewForm + ReviewList chưa được nhúng vào PDP, thiếu JSON-LD schema
- 🔧 `pages/index.vue` — **CHỈ CÓ** featured products grid, **THIẾU:** hero carousel, featured categories, special offer banner, testimonials, newsletter

### Filament Admin
- ✅ `BrandResource.php` — form (name, logo, description, toggle), table (image, name, products_count, active)
- ✅ `CategoryResource.php` — form (name, slug, parent, toggle), table (name, slug, parent, products_count, active)
- ✅ `ProductResource.php` — Tabs: General + Attributes(KeyValue) + Variants(Repeater) + Images(Repeater)
- ✅ `ProductAttributeResource.php` — form (name, data_type, is_required), table với usage count

### Việc cần làm (Phase 2)
- [ ] Bổ sung `ReviewForm` + `ReviewList` vào `pages/products/[id].vue`
- [ ] Thêm JSON-LD schema vào `pages/products/[id].vue`
- [ ] Hoàn thiện `pages/index.vue` — hero carousel, categories, featured products, testimonials, newsletter

---

## ✅ PHASE 3 — WMS & REAL-TIME (HOÀN THÀNH)

### Filament Admin
- ✅ `app/Filament/Pages/WarehouseMap.php` — chọn kho, load mapData theo aisle/rack/bin
- ✅ `resources/views/filament/pages/warehouse-map.blade.php` — grid bins màu theo utilization, tooltip hover, legend
- ✅ `app/Filament/Resources/WarehouseResource.php` — CRUD kho
- ✅ `app/Filament/Resources/WarehouseLocationResource.php` — CRUD vị trí kho
- ✅ `app/Filament/Resources/StockResource.php` — xem tồn kho, badge màu theo mức
- ✅ `app/Filament/Resources/PickListResource.php` — xem pick list, badge status
- ✅ `app/Livewire/BarcodeScanner.php` — Livewire component
- ✅ `resources/views/livewire/barcode-scanner.blade.php` — dark UI, mode toggle (nhập/xuất), manual input + gun scanner, recent scans history, real-time feedback
- ✅ `routes/web.php` — `/wms/scanner` protected by `auth + is.admin`

### Nuxt 3 Storefront
- ✅ `plugins/1.echo.client.ts` — lắng nghe `inventory` channel (stock.updated) + `warehouse.1` channel (picklist.created)

---

## ✅ PHASE 4 — CART, CHECKOUT & OMS (HOÀN THÀNH)

### Nuxt 3 Storefront
- ✅ `components/cart/SlideOverCart.vue` — slide-over, items list, coupon input, summary, CTA checkout
- ✅ `components/cart/CartItem.vue` — image, name, quantity +/-, price, remove
- ✅ `pages/checkout/auth.vue` — login form + guest checkout option
- ✅ `pages/checkout/shipping.vue` — customer info, address fields, shipping method radio
- ✅ `pages/checkout/payment.vue` — COD / Stripe / ZaloPay radio
- ✅ `pages/checkout/review.vue` — items summary, address, totals, place order
- ✅ `pages/checkout/success.vue` — confirmation với order ID, total, payment method
- ✅ `pages/login.vue` + `pages/register.vue`

### Filament Admin
- ✅ `app/Filament/Resources/OrderResource.php` — Tabs: Tổng quan + Thanh toán, Infolist, table với badge status, actions: approve + cancel
- ✅ `app/Filament/Pages/OrderKanban.php` — load orders grouped by status, moveOrder()
- ✅ `resources/views/filament/pages/order-kanban.blade.php` — Kanban columns, card với quick-move button

---

## ✅ PHASE 5 — TMS, FINANCE & RBAC (HOÀN THÀNH)

### Nuxt 3 Storefront
- ✅ `pages/account/orders/[id]/tracking.vue` — status stepper (6 bước), shipment info panel, fmtDate
- ✅ `composables/usePermission.ts` — can(), cannot(), hasRole()
- ✅ `plugins/3.permissions.client.ts` — directive `v-can` + `v-role`

### Filament Admin
- ✅ `app/Filament/Pages/FinanceDashboard.php` — stats 30 ngày, payments list, header/footer widgets
- ✅ `resources/views/filament/pages/finance-dashboard.blade.php` — payments table, export link, widgets
- ✅ `app/Filament/Widgets/StatsOverviewWidget.php` — products, warehouses, total stock
- ✅ `app/Filament/Widgets/RevenueChartWidget.php` — line chart doanh thu 30 ngày
- ✅ `app/Filament/Widgets/CancellationRateWidget.php` — doughnut chart tỷ lệ hủy
- ✅ `app/Filament/Widgets/FinanceStatsWidget.php` — revenue, paid count, cancelled count

---

## 🔧 PHASE 6 — CRM, PORTAL & POLISH (40% — ĐANG LÀM)

### Nuxt 3 Storefront (70%)
- ✅ `pages/account/orders.vue` — list orders, filter by status, link tracking, status badge
- ✅ `pages/account/addresses.vue` — list addresses, add form modal, POST tới `crm/v1/addresses`
- ✅ `pages/account/loyalty.vue` — điểm hiện tại, lịch sử giao dịch từ `crm/v1/loyalty/benefits`
- ✅ `pages/account/profile.vue` — edit name, change password, PUT tới `auth/profile`
- ✅ `pages/account/wishlist.vue` — grid sản phẩm yêu thích, remove
- 🔧 `pages/account/orders.vue` — **THIẾU:** cancel order button, order items detail expand
- ❌ `pages/account/orders/[id]/index.vue` — trang chi tiết đơn hàng (items, timeline, invoice)

### Filament Admin (0%)
- ❌ Chưa có Resource cho Supplier (PIM)
- ❌ Chưa có Resource cho PurchaseOrder (PIM)
- ❌ Chưa có Resource cho Shipment (TMS)
- ❌ Chưa có Resource cho Review (CRM)
- ❌ Chưa có Resource cho LoyaltyAccount (CRM)

---

## 📋 VIỆC CẦN LÀM — ƯU TIÊN CAO

### 1. Hoàn thiện PDP (products/[id].vue)
```vue
<!-- Thêm vào cuối template, sau related products -->
<div class="mt-16 border-t pt-10 space-y-8">
  <ProductReviewList :product-id="product.id" />
  <ProductReviewForm :product-id="product.id" @submitted="refreshReviews" />
</div>
```
Thêm JSON-LD:
```vue
useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.value?.name,
      description: product.value?.description,
      offers: { '@type': 'Offer', price: product.value?.price, priceCurrency: 'VND' },
    })
  }]
})
```

### 2. Hoàn thiện Homepage (pages/index.vue)
Cần thêm:
- Hero carousel tự động (5s interval)
- Featured categories grid (4 ô)
- Special offer banner
- Testimonials section
- Newsletter subscription form

### 3. Tạo Order Detail Page
File: `pages/account/orders/[id]/index.vue`
- Hiển thị items với tên sản phẩm (cần thêm `product` relation vào OrderItem type)
- Timeline trạng thái
- Nút hủy đơn (nếu cancellable)
- Link tới tracking

### 4. Filament Resources còn thiếu (Phase 6)
```bash
# Tạo trong app/Filament/Resources/
SupplierResource.php       → Modules\PIM\Models\Supplier
PurchaseOrderResource.php  → Modules\PIM\Models\PurchaseOrder
ShipmentResource.php       → Modules\TMS\Models\Shipment
ReviewResource.php         → Modules\CRM\Models\Review
LoyaltyAccountResource.php → Modules\CRM\Models\LoyaltyAccount
```
Đăng ký trong `AdminPanelProvider.php` → `->resources([...])`.

### 5. Header Navigation
`components/common/Header.vue` hiện chỉ có logo + cart + login.  
Cần thêm:
- Navigation links (Trang chủ, Danh mục, ...)
- Account dropdown khi đã đăng nhập (Đơn hàng, Hồ sơ, Đăng xuất)
- Search bar (gọi `productApi.search()`)

---

## 📅 TIMELINE CẬP NHẬT

| Phase | Giai Đoạn              | Trạng thái   | Ghi chú                                      |
|-------|------------------------|--------------|----------------------------------------------|
| 1     | UI Foundation & API    | ✅ Xong      | —                                            |
| 2     | Catalog & Product      | 🔧 85%       | Cần: PDP reviews, JSON-LD, homepage đầy đủ  |
| 3     | WMS & Real-time        | ✅ Xong      | —                                            |
| 4     | Cart, Checkout & OMS   | ✅ Xong      | —                                            |
| 5     | TMS, Finance & RBAC    | ✅ Xong      | —                                            |
| 6     | CRM, Portal & Polish   | 🔧 40%       | Cần: 5 Filament Resources, order detail page |

---

## 🎯 SUCCESS CRITERIA — TRẠNG THÁI

✅ **Phase 1:** Filament panel hoạt động, Nuxt 3 load được, API layer + global state OK  
✅ **Phase 2 (partial):** Products hiển thị với variants, category filter, PDP cơ bản  
✅ **Phase 3:** WMS map, barcode scanner, WebSocket real-time  
✅ **Phase 4:** Cart slide-over, 5-step checkout, order kanban  
✅ **Phase 5:** Tracking stepper, finance dashboard, RBAC directives  
🔧 **Phase 6:** Account portal 70%, Filament CRM/PIM/TMS resources 0%

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] `.env.production` cho Nuxt 3 (NUXT_PUBLIC_API_BASE, REVERB keys)
- [ ] `npm run build` trong `storefront-pwa/`
- [ ] `php artisan filament:optimize`
- [ ] Nginx reverse proxy (port 3000 Nuxt, port 80 Laravel)
- [ ] CDN setup cho images
- [ ] Lighthouse audit (Performance > 90, SEO > 95)
- [ ] WebSocket test (HTTPS/WSS)
- [ ] Cross-browser: Chrome, Safari, iOS, Android

---

**Last Updated:** Tự động từ code review  
**Version:** 2.0  
**Status:** 🔧 Phase 6 đang thực hiện
