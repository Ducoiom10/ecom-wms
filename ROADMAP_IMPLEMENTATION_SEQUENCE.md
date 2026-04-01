# 🚀 LỘ TRÌNH THỰC HIỆN TUẦN TỰ (Implementation Sequence)

> **Ngày bắt đầu:** 01/04/2026  
> **Tổng thời gian dự kiến:** 16-18 tuần (4-4,5 tháng)  
> **Mục tiêu:** Hoàn thành toàn bộ hệ thống WWW.ecom-wms theo đúng thứ tự dependencies

---

## 📊 CHIẾN LƯỢC THỰC HIỆN

### Nguyên tắc cơ bản:

1. **Backend trước, Frontend sau** - Vì Frontend phụ thuộc vào APIs
2. **Test song song** - Kiểm thử từng giai đoạn khi hoàn thành
3. **Deploy staging trước production** - Để phát hiện bugs sớm

---

## 🎯 SPRINT PLAN (6 Sprints × 2-3 tuần mỗi sprint)

---

## 📌 SPRINT 1: Backend Giai đoạn 2 (Tuần 1-2)

**Mục tiêu:** Hoàn thành PIM & Procurement system  
**Kết quả:** APIs sẵn sàng cho Frontend  
**Dependencies:** ROADMAP.md Giai đoạn 1 (✅ Done)

### 📋 Tuần 1: Migrations + Models + Repositories

#### **Ngày 1-2: Database Migrations (7 migrations)**

```bash
# Chạy lần lượt:
php artisan make:migration create_brands_table --create=brands
php artisan make:migration create_product_attributes_table --create=product_attributes
php artisan make:migration create_product_attribute_values_table --create=product_attribute_values
php artisan make:migration create_product_variants_table --create=product_variants
php artisan make:migration create_product_images_table --create=product_images
php artisan make:migration create_purchase_orders_table --create=purchase_orders
php artisan make:migration create_purchase_order_items_table --create=purchase_order_items
php artisan make:migration create_goods_receipt_notes_table --create=goods_receipt_notes
php artisan make:migration create_grn_items_table --create=grn_items
php artisan make:migration create_suppliers_table --create=suppliers

# Chỉnh sửa từng migration file rồi:
php artisan migrate --force
```

**Checklist:**

- [ ] Tất cả 10 migrations tạo xong
- [ ] Chạy `php artisan migrate` thành công
- [ ] Verify database schema trong MySQL

#### **Ngày 3-4: Models (12 models)**

**Modules/Catalog/Models:**

- [ ] Brand.php (Relationship: hasMany products)
- [ ] ProductAttribute.php (Relationship: hasMany values)
- [ ] ProductAttributeValue.php (JSON casting)
- [ ] ProductVariant.php (Relationship: belongsTo product)
- [ ] ProductImage.php (Relationship: belongsTo product)
- [ ] Product.php (UPDATE existing - add relationships)

**Modules/PIM/Models:**

- [ ] Supplier.php (Relationship: hasMany PO)
- [ ] PurchaseOrder.php (Status enum)
- [ ] PurchaseOrderItem.php (Relationship: belongsTo PO)
- [ ] GoodsReceiptNote.php (Relationship: hasMany items)
- [ ] GRNItem.php (Batch tracking)

**Checklist:**

- [ ] Tất cả models tạo xong
- [ ] Composer dump-autoload
- [ ] Kiểm tra relationships khớp với migrations

#### **Ngày 5: Repositories (5 repositories)**

**Modules/Catalog/Repositories:**

- [ ] BrandRepository (4-5 custom methods)
- [ ] ProductRepository (15+ methods)
- [ ] ProductAttributeRepository (9 methods)

**Modules/PIM/Repositories:**

- [ ] PurchaseOrderRepository (18+ methods)
- [ ] GoodsReceiptNoteRepository (20+ methods)

**Checklist:**

- [ ] 5 repositories tạo xong
- [ ] Extend BaseRepository
- [ ] Custom methods có documentation

### 📋 Tuần 2: Services + API + Testing

#### **Ngày 6: Services (3 services)**

**Modules/Catalog/Services:**

- [ ] ProductService (8 business methods)

**Modules/PIM/Services:**

- [ ] PurchaseOrderService (5 methods)
- [ ] GoodsReceiptService (8 methods)

**Checklist:**

- [ ] 3 services tạo xong
- [ ] Implement transaction handling
- [ ] Implement validation logic

#### **Ngày 7: Proxy Pattern + Caching**

- [ ] ProductProxy.php (Redis caching)
- [ ] ProductDTO.php (Data Transfer Object)
- [ ] Test caching logic

**Checklist:**

- [ ] Redis connection working
- [ ] Cache TTL = 3600 seconds
- [ ] invalidateCache() method tested

#### **Ngày 8: Seeders (4 seeders)**

- [ ] BrandSeeder (10 brands)
- [ ] SupplierSeeder (5 suppliers)
- [ ] PurchaseOrderSeeder (4 sample POs)
- [ ] GoodsReceiptNoteSeeder (GRNs with items)
- [ ] Update DatabaseSeeder.php

**Checklist:**

- [ ] `php artisan db:seed --force` thành công
- [ ] Verify data trong MySQL dashboard
- [ ] 10 brands + 5 suppliers visible

#### **Ngày 9: API Controllers + Routes**

**Controllers to create:**

- [ ] ProductController (index, show, store, update, delete)
- [ ] BrandController (REST endpoints)
- [ ] PurchaseOrderController (REST endpoints)
- [ ] GoodsReceiptNoteController (REST endpoints)

**Routes:**

- [ ] /api/products
- [ ] /api/brands
- [ ] /api/purchase-orders
- [ ] /api/goods-receipt-notes

**Checklist:**

- [ ] Import ApiResponse class
- [ ] All endpoints return standardized responses
- [ ] Test with Postman/Insomnia

#### **Ngày 10: Unit & Integration Tests**

- [ ] ProductRepository tests
- [ ] ProductService tests
- [ ] PurchaseOrderService tests
- [ ] API endpoint tests

**Checklist:**

- [ ] Run: `php artisan test`
- [ ] All tests pass
- [ ] Coverage > 80%

### ✅ SPRINT 1 Success Criteria

- [x] 10 migrations applied
- [x] 12 models created
- [x] 5 repositories with custom methods
- [x] 3 services with transactions
- [x] Proxy pattern with caching
- [x] 4 seeders running
- [x] 4 controllers with API endpoints
- [x] Unit tests passing (>80% coverage)

---

## 📌 SPRINT 2: Backend Giai đoạn 3-4 (Tuần 3-4)

**Mục tiêu:** WMS (FIFO, PickList) + OMS (Order Management)  
**Kết quả:** Inventory + Order APIs ready

### 📋 Tuần 3: WMS Implementation

#### **Ngày 11-12: InventoryBatch Model + FIFO Logic**

- [ ] InventoryBatch.php model (Batch + expiry tracking)
- [ ] InventoryFIFOService (Reserve stock logic)
- [ ] Tests for FIFO algorithm

#### **Ngày 13-14: PickList + Iterator Pattern**

- [ ] PickList.php model
- [ ] PickListItem.php model
- [ ] PickListIterator class
- [ ] PickListGenerator service

#### **Ngày 15: Stock Locking + Transactions**

- [ ] StockLockingService (Pessimistic locking)
- [ ] Transaction handling helpers
- [ ] Integrate with OrderService

### 📋 Tuần 4: OMS Implementation

#### **Ngày 16-17: Order States**

- [ ] OrderState abstract class
- [ ] PendingState, ApprovedState, PickingState, etc.
- [ ] OrderStateFactory
- [ ] Order model update (with state transitions)

#### **Ngày 18: Cart Engine (Redis)**

- [ ] CartService (Add, remove, update items)
- [ ] CartDTO
- [ ] Redis integration tests

#### **Ngày 19-20: Decorator Pattern (Pricing)**

- [ ] BasePriceCalculator
- [ ] TaxCalculator, ShippingCalculator
- [ ] VoucherDiscountCalculator
- [ ] LoyaltyPointsCalculator
- [ ] PriceCalculationService

### ✅ SPRINT 2 Success Criteria

- [x] FIFO algorithm working
- [x] PickList generation functional
- [x] Order state machine validated
- [x] Cart system with Redis
- [x] Price calculation chain complete
- [x] All new tests passing

---

## 📌 SPRINT 3: Backend Giai đoạn 5 + Frontend Giai đoạn 1 (Tuần 5-6)

**Mục tiêu:** TMS/Finance APIs + Setup Filament Admin + Nuxt 3 Storefront

### 📋 Tuần 5: Backend TMS/Finance

#### **Ngày 21-22: Shipment Management**

- [ ] Shipment.php model
- [ ] ShipmentService
- [ ] CarrierProxy interface + implementations (GHTK, Viettel, etc)
- [ ] CarrierProxyFactory

#### **Ngày 23-24: Jobs/Queues**

- [ ] SendOrderConfirmationEmail job
- [ ] SyncCarrierStatus job (scheduled)
- [ ] ReconcilePayments job
- [ ] Queue configuration + tests

#### **Ngày 25: RBAC Complete**

- [ ] Role model + Permission model
- [ ] RolePermission pivot table
- [ ] Seed default roles/permissions
- [ ] CheckPermission middleware

### 📋 Tuần 6: Frontend Setup (Parallel!)

#### **Ngày 21-22: Filament Admin Setup**

```bash
php artisan filament:install --panels
```

- [ ] AdminPanelProvider.php
- [ ] Theme configuration
- [ ] Spatie Shield integration
- [ ] Sidebar navigation layout

#### **Ngày 23-24: Nuxt 3 Setup**

```bash
npx nuxi@latest init storefront-pwa
cd storefront-pwa
npm install --save @nuxtjs/tailwindcss @pinia/nuxt @nuxt/image ...
```

- [ ] Tailwind CSS configured
- [ ] Nuxt.config.ts with runtime config
- [ ] Folder structure created
- [ ] .env.example created

#### **Ngày 25: API Connection Layer (Nuxt)**

- [ ] composables/useApi.ts (Factory pattern)
- [ ] composables/api/productApi.ts
- [ ] composables/api/cartApi.ts
- [ ] composables/api/orderApi.ts
- [ ] composables/api/authApi.ts

### ✅ SPRINT 3 Success Criteria

- [x] Shipment + Carrier proxy working
- [x] Jobs/Queues configured
- [x] RBAC fully implemented
- [x] Filament admin panel accessible
- [x] Nuxt 3 storefront running on localhost:3000
- [x] API connection layer ready

---

## 📌 SPRINT 4: Frontend Giai đoạn 1-2 (Tuần 7-8)

**Mục tiêu:** UI Foundation + Product Catalog/PDP

### 📋 Tuần 7: Global State + Layouts

#### **Ngày 26-27: Pinia Stores**

- [ ] stores/auth.ts (Login, logout, profile)
- [ ] stores/cart.ts (Items, total, coupon)
- [ ] stores/ui.ts (Sidebar, modal, toast, theme)
- [ ] stores/products.ts (Caching - optional)

#### **Ngày 28-29: Filament Resources**

- [ ] ProductResource.php (Create/Edit forms with Tabs)
- [ ] BrandResource.php
- [ ] ProductAttributeResource.php
- [ ] Tables + actions configured

#### **Ngày 30: Base Layouts (Nuxt)**

- [ ] layouts/default.vue (Header + Footer)
- [ ] layouts/checkout.vue (Minimal)
- [ ] layouts/account.vue (Sidebar)
- [ ] Global header/footer components

### 📋 Tuần 8: Product Pages

#### **Ngày 31-32: Category Page**

- [ ] pages/category/[slug].vue
- [ ] CatalogSidebar.vue (Filters)
- [ ] ProductCard.vue component
- [ ] Dynamic filters working

#### **Ngày 33-34: Product Detail Page (PDP)**

- [ ] pages/products/[id].vue
- [ ] ProductGallery.vue (Swiper + Zoom)
- [ ] VariantSelector.vue (Color + Size)
- [ ] StockIndicator.vue
- [ ] SEO + JSON-LD schema

#### **Ngày 35: Testing Frontend**

- [ ] Component tests (Vitest)
- [ ] Cypress E2E tests
- [ ] Responsive design check

### ✅ SPRINT 4 Success Criteria

- [x] All Pinia stores functional
- [x] Filament product builder complete
- [x] Category page with filters working
- [x] PDP with variants + SEO complete
- [x] Cart store syncing correctly
- [x] Mobile responsive ✓

---

## 📌 SPRINT 5: Frontend Giai đoạn 3-4 (Tuần 9-10)

**Mục tiêu:** WMS UI + Cart/Checkout Flow

### 📋 Tuần 9: WMS Admin Interface

#### **Ngày 36-37: Warehouse Map**

- [ ] Filament Page: WarehouseMap
- [ ] CSS Grid layout (Aisle → Rack → Level → Bin)
- [ ] Tooltip with capacity %
- [ ] Barcode printing button

#### **Ngày 38-39: Barcode Scanner**

- [ ] Scanner UI (Full-screen input)
- [ ] Alpine.js event listener
- [ ] Feedback zone
- [ ] Backend barcode processing

#### **Ngày 40: WebSocket Setup**

- [ ] Install Laravel Reverb
- [ ] plugins/echo.client.ts
- [ ] Real-time stock updates
- [ ] PickList notifications

### 📋 Tuần 10: Cart + Checkout

#### **Ngày 41-42: Cart UI**

- [ ] components/cart/SlideOverCart.vue
- [ ] Item increase/decrease (debounce)
- [ ] Coupon input
- [ ] Totals calculation

#### **Ngày 43-44: Checkout Flow**

- [ ] pages/checkout/auth.vue
- [ ] pages/checkout/shipping.vue
- [ ] pages/checkout/payment.vue
- [ ] pages/checkout/review.vue
- [ ] pages/checkout/success.vue
- [ ] useCheckoutStore (state sync)

#### **Ngày 45: Order Management (Admin)**

- [ ] Filament OrderResource
- [ ] Kanban Board (Drag-drop)
- [ ] Order Timeline component
- [ ] Status validation

### ✅ SPRINT 5 Success Criteria

- [x] Warehouse map displays correctly
- [x] Barcode scanner functional
- [x] WebSockets working (real-time)
- [x] Cart slide-over complete
- [x] Multi-step checkout flow done
- [x] Kanban board operational

---

## 📌 SPRINT 6: Frontend Giai đoạn 5-6 + Polish (Tuần 11-12)

**Mục tiêu:** Tracking + Finance + Customer Portal + Performance

### 📋 Tuần 11: Advanced Features

#### **Ngày 46-47: Tracking + Finance**

- [ ] pages/tracking/[id].vue (Stepper)
- [ ] Map integration (Google Maps)
- [ ] Finance Dashboard (Filament)
- [ ] Chart.js/ApexCharts

#### **Ngày 48-49: RBAC UI**

- [ ] v-can directive (Storefront)
- [ ] Filament Shield config (Admin)
- [ ] Permission checks in templates

#### **Ngày 50: Customer Portal**

- [ ] pages/account/orders.vue
- [ ] pages/account/loyalty.vue
- [ ] pages/account/addresses.vue
- [ ] pages/account/profile.vue

### 📋 Tuần 12: Polish + Optimization

#### **Ngày 51-52: Reviews + Loyalty**

- [ ] ReviewForm component
- [ ] Review listing with filters
- [ ] LoyaltyService integration
- [ ] Tier system UI

#### **Ngày 53-54: Performance**

- [ ] Skeleton loaders (all async components)
- [ ] Route transitions
- [ ] Empty states design
- [ ] Image lazy loading
- [ ] Component lazy loading

#### **Ngày 55-56: Testing + Deployment**

- [ ] Full E2E test suite
- [ ] Lighthouse audit (target: >90)
- [ ] Cross-browser testing
- [ ] Production build
- [ ] Environment setup (.env.production)

### ✅ SPRINT 6 Success Criteria

- [x] Tracking page complete
- [x] Finance dashboard done
- [x] RBAC functional
- [x] Customer portal complete
- [x] Skeleton loaders added
- [x] Lighthouse score >90
- [x] Ready for staging deployment

---

## 📊 DEPENDENCIES MATRIX

```
ROADMAP.md (Backend)          ROADMAP_VIEWS.md (Frontend)
├─ Phase 1 ✅
├─ Phase 2 (Sprint 1) ──────→ Needs APIs ──→ Phase 1 (Sprint 3)
├─ Phase 3 (Sprint 2) ──────→ Needs APIs ──→ Phase 3 (Sprint 5)
├─ Phase 4 (Sprint 2) ──────→ Needs APIs ──→ Phase 4 (Sprint 5)
├─ Phase 5 (Sprint 3) ──────→ Needs APIs ──→ Phase 5 (Sprint 6)
└─ Phase 6 (Ready)           └─ Phase 6 (Sprint 6)
```

---

## 📅 TIMELINE AT A GLANCE

| Sprint | Period   | Backend Task       | Frontend Task       | Deliverable                 |
| ------ | -------- | ------------------ | ------------------- | --------------------------- |
| 1      | Wk 1-2   | Phase 2: PIM       | -                   | APIs ready                  |
| 2      | Wk 3-4   | Phase 3-4: WMS/OMS | -                   | Order system                |
| 3      | Wk 5-6   | Phase 5: TMS       | Phase 1: Setup      | Admin + Storefront skeleton |
| 4      | Wk 7-8   | -                  | Phase 1-2: UI       | Product pages               |
| 5      | Wk 9-10  | -                  | Phase 3-4: WMS/Cart | Checkout flow               |
| 6      | Wk 11-12 | -                  | Phase 5-6: Portal   | Production ready            |

**Total: 12 weeks (3 months)**

---

## 🎯 DAILY CHECKLIST TEMPLATE

```markdown
## Day [X]: [Feature Name]

### Morning (9-12)

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

### Afternoon (13-17)

- [ ] Task 4
- [ ] Task 5

### Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing done

### Done?

- [ ] Code committed
- [ ] Documentation updated
- [ ] Ready for review
```

---

## 📝 COMMIT MESSAGE CONVENTION

```bash
# Format: [SPRINT-X-DAY-Y] [Feature] Brief description

# Examples:
git commit -m "[SPRINT-1-DAY-1] Migrations: Create brands, attributes tables"
git commit -m "[SPRINT-1-DAY-3] Models: Brand, ProductAttribute, ProductVariant"
git commit -m "[SPRINT-1-DAY-5] Repository: ProductRepository with custom methods"
git commit -m "[SPRINT-3-DAY-21] Frontend: Setup Filament admin panel"
git commit -m "[SPRINT-4-DAY-31] Frontend: ProductCard component + category page"
```

---

## 🚨 RISK MITIGATION

| Risk                          | Mitigation                    |
| ----------------------------- | ----------------------------- |
| API delays → Frontend blocked | Start Backend 2 weeks earlier |
| Testing bottleneck            | Test in parallel per sprint   |
| Scope creep                   | Strict sprint boundaries      |
| Database migration issues     | Backup before each migration  |
| Frontend/Backend mismatch     | API contract testing          |
| Performance issues found late | Benchmark every sprint        |

---

## 📞 DAILY STANDUP TEMPLATE

**Every morning (10:00 AM):**

1. What did I complete yesterday?
2. What am I working on today?
3. Any blockers?

---

## ✅ GO-LIVE CHECKLIST

- [ ] All 6 backend phases complete
- [ ] All 6 frontend phases complete
- [ ] 100+ unit tests passing
- [ ] 20+ integration tests passing
- [ ] 10+ E2E tests passing
- [ ] Database backup automated
- [ ] Error logging setup (Sentry)
- [ ] Monitor setup (New Relic)
- [ ] SSL certificate installed
- [ ] CDN configured
- [ ] Load testing complete
- [ ] Security audit passed
- [ ] Documentation complete
- [ ] Team trained

---

**Last Updated:** 01/04/2026  
**Version:** 1.0  
**Status:** Ready for Sprint 1
