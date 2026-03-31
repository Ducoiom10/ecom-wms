# 🗺️ LỘ TRÌNH THỰC HIỆN 6 GIAI ĐOẠN - CHI TIẾT CỰC KỲ

> **Ngày bắt đầu:** 31/03/2026  
> **Framework:** Laravel 12.0 + nWidart Modules  
> **Database:** MySQL 8.0.30  
> **PHP:** 8.2.20  
> **Mục tiêu:** E-commerce WMS (Web Warehouse Management System) hoàn toàn

---

## 📌 GIAI ĐOẠN 1: THIẾT LẬP LÕI KIẾN TRÚC (Core & Architecture Foundation)

**🎯 Mục tiêu giai đoạn:**
Xây dựng bộ khung chịu tải, chia nhỏ dự án để code không giẫm chân nhau

### ✅ HOÀN THÀNH (100%)

#### Step 1: Cài đặt nWidart/laravel-modules

- **Status:** ✅ DONE
- **Chi tiết:**
    - Cài package: `nwidart/laravel-modules: ^12.0`
    - Publish config: `php artisan vendor:publish`
    - Cấu hình module paths
    - Enable auto-discovery

#### Step 2: Tạo 9 Module độc lập

- **Status:** ✅ DONE - 9/9 modules enabled
- **Chi tiết:**

    ```
    ✅ Catalog Module       → /Modules/Catalog/
        - Models: Category, Product
        - Controllers: ProductController, CategoryController
        - Routes: api.php (RESTful)

    ✅ Inventory Module     → /Modules/Inventory/
        - Models: Warehouse, WarehouseLocation, Stock, StockMovement
        - Controllers: StockController, WarehouseController
        - Routes: api.php (RESTful)

    ✅ PIM Module           → /Modules/PIM/
        - Purpose: Product Information Management
        - Models: Brand, Attribute, AttributeValue
        - Controllers: PIMController

    ✅ WMS Module           → /Modules/WMS/
        - Purpose: Warehouse Management System
        - Models: PickList, ShelfLocation, BinLocation
        - Controllers: WMSController, PickListController

    ✅ OMS Module           → /Modules/OMS/
        - Purpose: Order Management System
        - Models: Order, OrderItem, OrderStatus
        - Controllers: OrderController, OrderItemController

    ✅ Cart Module          → /Modules/Cart/
        - Purpose: Shopping Cart Engine (Redis-based)
        - Models: Cart, CartItem
        - Controllers: CartController

    ✅ Pricing Module       → /Modules/Pricing/
        - Purpose: Dynamic Pricing & Calculations
        - Models: Price, Discount, PricingStrategy
        - Controllers: PricingController

    ✅ TMS Module           → /Modules/TMS/
        - Purpose: Transportation/Shipping Management
        - Models: Shipment, Carrier, Route
        - Controllers: ShipmentController

    ✅ Finance Module       → /Modules/Finance/
        - Purpose: Finance & Identity Access Management (IAM)
        - Models: Invoice, Payment, Settlement
        - Controllers: InvoiceController
    ```

#### Step 3: Thiết lập Multiple Guards (Auth)

- **Status:** ✅ DONE
- **Chi tiết:**

    ```
    ✅ config/auth.php - Guards cấu hình
        'guards' => [
            'web'   => driver: 'session', provider: 'users'      [Admin Dashboard]
            'api'   => driver: 'session', provider: 'users'      [Customer APIs]
            'admin' => driver: 'session', provider: 'admins'     [Admin APIs]
        ]

    ✅ Users Table - Thêm cột 'role' & 'is_active'
        - Migration: 0001_01_01_000002_add_role_to_users_table
        - Cột role: enum('customer', 'admin') DEFAULT 'customer'
        - Cột is_active: boolean DEFAULT true

    ✅ User Model - Thêm methods
        - isAdmin(): bool → Kiểm tra role == 'admin'
        - isCustomer(): bool → Kiểm tra role == 'customer'
        - isActive(): bool → Kiểm tra is_active == true
        - $fillable: ['name', 'email', 'password', 'role', 'is_active']

    ✅ Middleware - Role-based access
        - App\Http\Middleware\EnsureIsAdmin
        - App\Http\Middleware\EnsureIsCustomer
        - Registered aliases in bootstrap/app.php:
          'is.admin' => EnsureIsAdmin::class
          'is.customer' => EnsureIsCustomer::class

    ✅ Seeded Users
        - admin@ecom-wms.local     (password: 'password', role: admin, is_active: 1)
        - customer@ecom-wms.local  (password: 'password', role: customer, is_active: 1)
    ```

#### Step 4: Tạo Base Classes dùng chung

- **Status:** ✅ DONE
- **Chi tiết:**

    ```
    ✅ BaseDTO (app/Core/DTOs/BaseDTO.php)
        - Mục đích: Data Transfer Object cho các layer
        - Methods:
          * toArray(): array → Convert DTO to array
          * fromArray(array $data): static → Create from array
          * toJson(): string → Convert to JSON
        - Usage:
          class ProductDTO extends BaseDTO {
              public function __construct(
                  public int $id,
                  public string $name,
                  public float $price
              ) {}
          }

    ✅ BaseRepository (app/Core/Repositories/BaseRepository.php)
        - Mục đích: CRUD operations standardization
        - Methods (20+ methods):
          * all(array $columns = ['*']): Collection
          * findById(int $id): ?Model
          * findBy(string $attribute, $value): ?Model
          * findAllBy(string $attribute, $value): Collection
          * create(array $data): Model
          * update(int $id, array $data): bool
          * delete(int $id): bool
          * paginate(int $limit = 15)
          * count(): int
          * exists(int $id): bool
          * query() → Query builder
          * softDelete(int $id): bool
          * restore(int $id): bool
          * forceDelete(int $id): bool
        - Usage:
          class ProductRepository extends BaseRepository {
              public function __construct(Product $model) {
                  parent::__construct($model);
              }
          }

    ✅ BaseService (app/Core/Services/BaseService.php)
        - Mục đích: Business logic & error handling
        - Methods:
          * handleException(Exception $e, string $context = '')
          * logSuccess(string $action, array $data = [])
          * validate(array $data, array $rules)
          * beginTransaction()
          * commit()
          * rollback()
          * executeInTransaction(callable $callback)
          * cache(string $key, callable $callback, int $minutes = 60)
          * forgetCache(string $key)
        - Usage:
          class ProductService extends BaseService {
              protected $repository;

              public function createProduct(array $data) {
                  return $this->executeInTransaction(function () use ($data) {
                      return $this->repository->create($data);
                  });
              }
          }
    ```

#### Step 5: Chuẩn hóa API Response

- **Status:** ✅ DONE
- **Chi tiết:**

    ```
    ✅ ApiResponse (app/Http/Responses/ApiResponse.php)
        - Static methods cho tất cả response types:

        1. success($data = null, string $message = 'Success', int $code = 200)
           Response:
           {
             "success": true,
             "message": "Success",
             "data": { ... },
             "code": 200,
             "timestamp": "2026-03-31T10:30:00Z"
           }

        2. error(string $message, $errors = null, int $code = 400)
           Response:
           {
             "success": false,
             "message": "Error",
             "errors": { ... },
             "code": 400,
             "timestamp": "2026-03-31T10:30:00Z"
           }

        3. validationError($errors, int $code = 422)
           → Validation error response format

        4. notFound(string $message = 'Resource not found')
           → 404 Not Found

        5. unauthorized(string $message = 'Unauthorized')
           → 401 Unauthorized

        6. forbidden(string $message = 'Forbidden')
           → 403 Forbidden

        7. serverError(string $message = 'Internal server error')
           → 500 Server Error

        6. created($data, string $message = 'Resource created successfully')
           → 201 Created

        7. paginated($items, string $message = 'Success')
           Response:
           {
             "success": true,
             "data": [ ... ],
             "pagination": {
               "total": 100,
               "per_page": 15,
               "current_page": 1,
               "last_page": 7,
               "from": 1,
               "to": 15
             },
             "code": 200
           }

    ✅ Usage Example:
        public function store(StoreProductRequest $request) {
            try {
                $product = $this->service->createProduct($request->validated());
                return ApiResponse::created($product, 'Product created successfully');
            } catch (\Exception $e) {
                return ApiResponse::serverError($e->getMessage());
            }
        }
    ```

#### Step 6: Thiết lập MySQL Database

- **Status:** ✅ DONE
- **Chi tiết:**

    ```
    ✅ Environment Config (.env)
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=ecom-wms
        DB_USERNAME=root
        DB_PASSWORD=(empty)

    ✅ Database Created: ecom-wms
        Character Set: utf8mb4
        Collation: utf8mb4_unicode_ci

    ✅ Migrations Applied (9 total)
        1. 0001_01_01_000000_create_users_table
           - Columns: id, name, email, password, remember_token, email_verified_at, created_at, updated_at

        2. 0001_01_01_000001_create_cache_table
           - Columns: key (unique), value, expiration
           - Also: cache_locks, sessions, password_reset_tokens, failed_jobs, job_batches, jobs

        3. 0001_01_01_000002_add_role_to_users_table
           - Thêm: role (enum, default 'customer')
           - Thêm: is_active (boolean, default true)

        4. 2026_03_30_183037_create_warehouses_table
           - Columns: id, code (unique), name, address, manager_name, is_active, created_at, updated_at

        5. 2026_03_30_183116_create_warehouse_locations_table
           - Columns: id, warehouse_id (FK), aisle, rack, level, bin, barcode (unique), is_active, created_at, updated_at

        6. 2026_03_30_183443_create_categories_table
           - Columns: id, name (unique), slug (unique), parent_id (nullable FK), is_active, created_at, updated_at
           - Hierarchical structure support

        7. 2026_03_30_183445_create_products_table
           - Columns: id, name, slug (unique), sku (unique), description, price, category_id (FK), is_active, created_at, updated_at

        8. 2026_03_30_183549_create_stocks_table
           - Columns: id, product_id (FK), warehouse_location_id (FK), quantity, reserved_quantity, unique(product_id, warehouse_location_id)

        9. 2026_03_30_192002_create_stock_movements_table
           - Columns: id, stock_id (FK), movement_type, quantity, reference_type, reference_id, notes, user_id, created_at, updated_at
    ```

#### Step 7: Seeding Test Data

- **Status:** ✅ DONE
- **Chi tiết:**

    ```
    ✅ Seeders Created & Executed
        DatabaseSeeder.php
        ├── CategorySeeder
        │   └── 7 categories (Electronics, Laptops, Smartphones, Fashion, etc)
        ├── ProductSeeder
        │   └── 6 products (MacBook Pro, Dell XPS, iPhone 16, Samsung Galaxy, T-Shirt, Jeans)
        ├── WarehouseSeeder
        │   └── 3 warehouses (Hanoi Main, HCM Main, HCM Backup)
        ├── WarehouseLocationSeeder
        │   └── 9 locations (distributed across warehouses)
        └── StockSeeder
            └── 10 stock records (products at locations with quantities)

    ✅ Data Statistics
        - Users: 2 (1 admin, 1 customer)
        - Categories: 7
        - Products: 6
        - Warehouses: 3
        - Warehouse Locations: 9
        - Stocks: 10
        - Stock Movements: 0 (empty)
    ```

---

## 📌 GIAI ĐOẠN 2: KHỐNG CHẾ ĐẦU VÀO (PIM & Procurement)

**🎯 Mục tiêu giai đoạn:**
Có dữ liệu sản phẩm chuẩn mực và quy trình nhập kho chặt chẽ

### ⏳ TODO LIST

#### Step 1: Viết Migration & Models cho cấu trúc Product

```
📋 Migrations to create:
  - create_brands_table
    Columns: id, name (unique), logo_url, description, is_active

  - create_product_attributes_table
    Columns: id, name (unique), data_type, is_required
    DataTypes: string, integer, boolean, json, enum

  - create_product_attribute_values_table
    Columns: id, product_id (FK), attribute_id (FK), value (JSON)

  - create_product_variants_table
    Columns: id, product_id (FK), sku (unique), variant_name, price_override, is_active

  - create_product_images_table
    Columns: id, product_id (FK), image_url, alt_text, sort_order, is_primary

📋 Models to create (in Modules/Catalog/):
  - Brand
    Relations:
      - hasMany(Product)

  - Product (UPDATE existing)
    Relations:
      - belongsTo(Category)
      - belongsTo(Brand)
      - hasMany(ProductVariant)
      - hasMany(ProductImage)
      - hasMany(ProductAttributeValue)
      - hasMany(Stock)

  - ProductVariant
    Relations:
      - belongsTo(Product)
      - hasMany(Stock)

  - ProductImage
    Relations:
      - belongsTo(Product)

  - ProductAttribute
    Relations:
      - hasMany(ProductAttributeValue)

  - ProductAttributeValue
    Relations:
      - belongsTo(Product)
      - belongsTo(ProductAttribute)

📋 Repositories to create:
  - BrandRepository extends BaseRepository
  - ProductRepository extends BaseRepository
  - ProductVariantRepository extends BaseRepository
  - ProductAttributeRepository extends BaseRepository

📋 Services to create:
  - ProductService extends BaseService
    * createProduct(array $data): Product
    * updateProduct(int $id, array $data): Product
    * addProductVariant(int $productId, array $data): ProductVariant
    * uploadProductImage(int $productId, UploadedFile $file): ProductImage
    * setProductAttributes(int $productId, array $attributes): void
```

#### Step 2: Áp dụng JSON cho Thuộc tính động

```
📋 Implementation:
  - ProductAttributeValue.php
    protected $casts = [
        'value' => 'json'
    ];

  - Product thumb (example):
    {
      "color": "Black",
      "size": "Large",
      "material": "Cotton",
      "warranty": "2 years"
    }

📋 Query Examples:
  - Find products by attribute:
    Product::whereHas('attributeValues', function ($query) {
        $query->where('attribute_id', 1)->whereJsonContains('value', 'Black');
    })->get();
```

#### Step 3: Thiết lập luồng Đơn mua hàng (PO) & Phiếu nhập kho (GRN)

```
📋 Migrations to create:
  - create_purchase_orders_table
    Columns:
      id, code (unique), supplier_id (FK), warehouse_id (FK),
      status (pending, approved, partial, completed, cancelled),
      total_amount, expected_delivery_date, actual_delivery_date,
      created_by (user_id), approved_by (user_id nullable),
      notes, created_at, updated_at

  - create_purchase_order_items_table
    Columns:
      id, po_id (FK), product_id (FK), quantity, unit_price,
      received_quantity, created_at, updated_at

  - create_goods_receipt_notes_table (GRN)
    Columns:
      id, code (unique), po_id (FK), warehouse_id (FK),
      status (pending, partial, completed, cancelled),
      receipt_date, created_by (user_id), notes,
      created_at, updated_at

  - create_grn_items_table
    Columns:
      id, grn_id (FK), po_item_id (FK), quantity_received,
      quality_check_status (passed, failed, pending_check),
      batch_number, expiry_date, location_id (FK nullable),
      created_at, updated_at

📋 Models to create (in Modules/PIM/):
  - Supplier
    Relations:
      - hasMany(PurchaseOrder)

  - PurchaseOrder
    Relations:
      - belongsTo(Supplier)
      - belongsTo(Warehouse)
      - hasMany(PurchaseOrderItem)
      - hasMany(GoodsReceiptNote)
      - belongsTo(User, 'created_by')
      - belongsTo(User, 'approved_by')

  - PurchaseOrderItem
    Relations:
      - belongsTo(PurchaseOrder)
      - belongsTo(Product)
      - hasMany(GRNItem)

  - GoodsReceiptNote
    Relations:
      - belongsTo(PurchaseOrder)
      - belongsTo(Warehouse)
      - hasMany(GRNItem)
      - belongsTo(User, 'created_by')

  - GRNItem
    Relations:
      - belongsTo(GoodsReceiptNote)
      - belongsTo(PurchaseOrderItem)
      - belongsTo(WarehouseLocation)

📋 Services to create:
  - PurchaseOrderService extends BaseService
    * createPO(int $supplierId, array $items): PurchaseOrder
    * approvePO(int $poId, int $userId): void
    * cancelPO(int $poId, string $reason): void

  - GoodsReceiptService extends BaseService
    * createGRN(int $poId, array $items): GoodsReceiptNote
    * receiveItem(int $grnItemId, int $quantity, $batchNumber, $location)
    * completeGRN(int $grnId): void
    * validateQuality(int $grnItemId, string $status): void

📋 Workflow:
  1. Create Purchase Order (PO) with items
  2. Approve PO by manager
  3. Create Goods Receipt Note (GRN) from PO
  4. Receive items one by one into GRN
  5. Quality check each item
  6. Put received items into warehouse locations
  7. Complete GRN
  8. Auto-update inventory stocks
```

#### Step 4: Triển khai Proxy Pattern để cache product details

```
📋 Redis Configuration (.env):
  CACHE_STORE=redis
  REDIS_HOST=127.0.0.1
  REDIS_PASSWORD=null
  REDIS_PORT=6379

📋 ProductProxy Class (app/Proxies/ProductProxy.php):
  - Extends BaseService with caching

  class ProductProxy {
      private const CACHE_TTL = 3600; // 1 hour
      private const CACHE_KEY_PREFIX = 'product:';

      public function getDetails(int $productId): ProductDTO {
          $cacheKey = self::CACHE_KEY_PREFIX . $productId;

          return cache()->remember($cacheKey, self::CACHE_TTL, function () use ($productId) {
              $product = Product::with([
                  'category',
                  'brand',
                  'variants',
                  'images',
                  'attributeValues.attribute'
              ])->findOrFail($productId);

              return new ProductDTO(
                  id: $product->id,
                  name: $product->name,
                  slug: $product->slug,
                  sku: $product->sku,
                  price: $product->price,
                  description: $product->description,
                  category: $product->category->name,
                  brand: $product->brand->name,
                  images: $product->images->map(fn($img) => $img->image_url),
                  attributes: $product->attributeValues->map(fn($attr) => [
                      'name' => $attr->attribute->name,
                      'value' => $attr->value
                  ]),
                  variants: $product->variants->map(fn($v) => [
                      'sku' => $v->sku,
                      'name' => $v->variant_name,
                      'price' => $v->price_override ?? $product->price
                  ])
              );
          });
      }

      public function invalidateCache(int $productId): void {
          cache()->forget(self::CACHE_KEY_PREFIX . $productId);
      }

      public function invalidateAllCache(): void {
          cache()->flush();
      }
  }

📋 Controller Usage:
  public function show(int $id) {
      $productProxy = new ProductProxy();
      $details = $productProxy->getDetails($id);

      return ApiResponse::success($details->toArray());
  }

📋 Benefits:
  ✅ Reduced database queries from 10+ to 1 per cache hit
  ✅ Faster response times (milliseconds vs seconds)
  ✅ Reduced server load significantly
  ✅ Better user experience for high-traffic products
```

---

## 📌 GIAI ĐOẠN 3: TRÁI TIM VẬN HÀNH (WMS & Inventory)

**🎯 Mục tiêu giai đoạn:**
Đảm bảo không bao giờ sai lệch hay thất thoát một món hàng

### ⏳ TODO LIST

#### Step 1: Xây dựng sơ đồ không gian kho bãi

```
📋 Model: WarehouseLocation (UPDATE existing)
  Columns: id, warehouse_id (FK), aisle, rack, level, bin, barcode (unique), is_active

  Barcode format: "HN01-A-01-01-01"
    └─ HN01: Warehouse code
    └─ A: Aisle (dãy)
    └─ 01: Rack (kệ)
    └─ 01: Level (tầng)
    └─ 01: Bin (ô)

📋 Model: BinLocation (new) for sub-locations
  Columns: id, location_id (FK), sub_code, capacity, current_utilization

📋 Visualization (Example Warehouse):
  Warehouse: HN01 (Hanoi)
  ├─ Aisle A
  │  ├─ Rack 01
  │  │  ├─ Level 01 (Height 0-1.5m)
  │  │  │  └─ Bin 01-04 (4 bins)
  │  │  ├─ Level 02 (Height 1.5-3m)
  │  │  └─ Level 03 (Height 3-4.5m)
  │  └─ Rack 02
  ├─ Aisle B
  └─ Aisle C
```

#### Step 2: Triển khai thuật toán FIFO

```
📋 Model: InventoryBatch (new)
  Columns:
    id, product_id (FK), warehouse_location_id (FK),
    batch_number (unique), purchase_order_id (FK),
    grn_id (FK), quantity, expiry_date, received_date,
    fifo_sequence (datetime for ordering)

📋 FIFO Logic:
  When picking an item:
  1. Query batches ordered by received_date (oldest first)
  2. Allocate from oldest batch first
  3. Move to next batch only when current is exhausted
  4. Track expiry dates to prevent selling expired items

📋 Service: InventoryFIFOService extends BaseService
  public function reserveStock(int $productId, int $quantity): array {
      $location = WarehouseLocation::where('is_active', true)->first();

      $batches = InventoryBatch::where('product_id', $productId)
          ->where('warehouse_location_id', $location->id)
          ->where('quantity', '>', 0)
          ->orderBy('received_date') // FIFO
          ->get();

      $reserved = [];
      $remainingQty = $quantity;

      foreach ($batches as $batch) {
          if ($batch->expiry_date && $batch->expiry_date->isPast()) {
              continue; // Skip expired batches
          }

          $allocate = min($batch->quantity, $remainingQty);
          $batch->decrement('quantity', $allocate);

          $reserved[] = [
              'batch_id' => $batch->id,
              'batch_number' => $batch->batch_number,
              'quantity' => $allocate,
              'expiry_date' => $batch->expiry_date
          ];

          $remainingQty -= $allocate;

          if ($remainingQty == 0) break;
      }

      return $reserved;
  }
```

#### Step 3: Áp dụng Nhất quán mạnh bằng Transactions

```
📋 Database-Level Locking:
  - pessimistic_locking (lockForUpdate)
  - optimistic_locking (version columns)

📋 Example: Deduct Stock with Lock
  public function deductStock(int $productId, int $quantity) {
      return DB::transaction(function () use ($productId, $quantity) {
          // Lock the row for this transaction
          $stock = Stock::lockForUpdate()
              ->where('product_id', $productId)
              ->firstOrFail();

          if ($stock->quantity < $quantity) {
              throw new Exception('Insufficient stock');
          }

          // Deduct safely
          $stock->decrement('quantity', $quantity);
          $stock->increment('reserved_quantity', $quantity);

          // Log movement
          StockMovement::create([
              'stock_id' => $stock->id,
              'movement_type' => 'out',
              'quantity' => $quantity,
              'reference_type' => 'sales_order'
          ]);

          return $stock;
      });
  }

📋 Usage in Service:
  public function processOrder(Order $order) {
      try {
          DB::beginTransaction();

          foreach ($order->items as $item) {
              $this->deductStock($item->product_id, $item->quantity);
          }

          $order->status = 'confirmed';
          $order->save();

          DB::commit();
      } catch (\Exception $e) {
          DB::rollback();
          throw $e;
      }
  }
```

#### Step 4: Iterator Pattern cho Pick-List

```
📋 Model: PickList (new)
  Columns:
    id, order_id (FK), warehouse_id (FK),
    status (pending, in_progress, completed, cancelled),
    created_at, updated_at

📋 Model: PickListItem (new)
  Columns:
    id, pick_list_id (FK), product_id (FK),
    quantity_required, quantity_picked, location_id (FK),
    picked_at (timestamp), picked_by (user_id)

📋 Iterator Class: PickListIterator
  class PickListIterator {
      private int $currentIndex = 0;
      private array $items;

      public function __construct(PickList $pickList) {
          // Sort items by location for efficient picking route
          $this->items = $pickList->items()
              ->with('location')
              ->get()
              ->sortBy('location.barcode')
              ->values()
              ->toArray();
      }

      public function current(): PickListItem {
          return $this->items[$this->currentIndex];
      }

      public function next(): void {
          ++$this->currentIndex;
      }

      public function valid(): bool {
          return isset($this->items[$this->currentIndex]);
      }

      public function rewind(): void {
          $this->currentIndex = 0;
      }

      public function getRoute(): array {
          // Generate picking route (optimized path)
          return array_map(fn($item) => [
              'location' => $item['location']['barcode'],
              'product' => $item['product_id'],
              'quantity' => $item['quantity_required']
          ], $this->items);
      }
  }

📋 Service: PickListGenerator extends BaseService
  public function generatePickList(Order $order): PickList {
      $pickList = PickList::create([
          'order_id' => $order->id,
          'warehouse_id' => $order->warehouse_id,
          'status' => 'pending'
      ]);

      foreach ($order->items as $item) {
          // Find optimal location (FIFO)
          $batch = InventoryBatch::where('product_id', $item->product_id)
              ->orderBy('received_date')
              ->first();

          PickListItem::create([
              'pick_list_id' => $pickList->id,
              'product_id' => $item->product_id,
              'quantity_required' => $item->quantity,
              'location_id' => $batch->warehouse_location_id
          ]);
      }

      return $pickList;
  }

  public function pickItems(PickList $pickList): array {
      $iterator = new PickListIterator($pickList);
      $route = $iterator->getRoute();

      return [
          'pick_list_id' => $pickList->id,
          'route' => $route,
          'total_items' => count($route),
          'estimated_time' => count($route) * 2 // 2 mins per item
      ];
  }
```

---

## 📌 GIAI ĐOẠN 4: CHUYỂN ĐỔI DOANH THU (OMS, Cart & Pricing)

**🎯 Mục tiêu giai đoạn:**
Khách hàng đặt được hàng với luồng tính giá linh hoạt nhất

### ⏳ TODO LIST

#### Step 1: Redis Cart Engine

```
📋 Cart Structure (Redis):
  Key: "cart:{user_id}"
  Value: {
    "items": [
      {
        "product_id": 1,
        "variant_id": 5,
        "quantity": 2,
        "price": 3500.00,
        "added_at": "2026-03-31T10:30:00Z"
      }
    ],
    "subtotal": 7000.00,
    "tax": 700.00,
    "shipping": 50.00,
    "total": 7750.00,
    "coupon": "SAVE10",
    "expires_at": "2026-04-01T10:30:00Z"
  }

📋 CartService (app/Services/CartService.php):
  - addItem(string $userId, int $productId, int $quantity): void
  - removeItem(string $userId, int $productId): void
  - updateQuantity(string $userId, int $productId, int $quantity): void
  - getCart(string $userId): CartDTO
  - applyCoupon(string $userId, string $couponCode): void
  - clearCart(string $userId): void
  - checkout(string $userId): Order

📋 Benefits:
  ✅ No database reads per add/remove (millisecond fast)
  ✅ Handles 1000+ concurrent users easily
  ✅ Auto-expires (TTL: 24 hours default)
  ✅ Atomic operations (no race conditions)
```

#### Step 2: Decorator Pattern für Cỗ máy tính giá

```
📋 Base Price Calculator:
  abstract class PriceCalculator {
      protected PriceCalculator $next;

      abstract public function calculate(float $basePrice): float;

      public function setNext(PriceCalculator $next): self {
          $this->next = $next;
          return $this;
      }

      protected function executeNext(float $price): float {
          return $this->next ? $this->next->calculate($price) : $price;
      }
  }

📋 Concrete Decorators:
  1. BasePriceCalculator extends PriceCalculator
     - Just returns the base price

  2. TaxCalculator extends PriceCalculator
     - Adds tax (8% default, configurable by region)
     - calculate(float $basePrice): float {
         $tax = $basePrice * 0.08;
         return $this->executeNext($basePrice + $tax);
       }

  3. ShippingCalculator extends PriceCalculator
     - Calculates shipping based on weight/distance
     - calculate(float $basePrice): float {
         $shipping = $this->calculateShipping();
         return $this->executeNext($basePrice + $shipping);
       }

  4. VoucherDiscountCalculator extends PriceCalculator
     - Applies voucher discounts
     - calculate(float $basePrice): float {
         $discount = $basePrice * ($this->voucher->percentage / 100);
         return $this->executeNext($basePrice - $discount);
       }

  5. LoyaltyPointsCalculator extends PriceCalculator
     - Applies loyalty discounts
     - calculate(float $basePrice): float {
         $discount = $this->customer->points * 0.01; // 1 point = 0.01 discount
         return $this->executeNext($basePrice - $discount);
       }

📋 Usage Example:
  public function calculateOrderTotal(Order $order): float {
      $calculator = new BasePriceCalculator()
          ->setNext(new TaxCalculator($order->region))
          ->setNext(new ShippingCalculator($order->address))
          ->setNext(new VoucherDiscountCalculator($order->voucher))
          ->setNext(new LoyaltyPointsCalculator($order->customer));

      return $calculator->calculate($order->subtotal);
  }

📋 Example Calculation Flow:
  Base Price:     $100.00
  + Tax (8%):     + $8.00  → $108.00
  + Shipping:     + $5.00  → $113.00
  - Voucher 10%:  - $11.30 → $101.70
  - Loyalty:      - $5.00  → $96.70
  FINAL:          $96.70
```

#### Step 3: State Machine cho Order Lifecycle

```
📋 Order Status Flow:
  PENDING
    ├─ approve()  → APPROVED
    └─ cancel()   → CANCELLED

  APPROVED
    ├─ pickItems()     → PICKING
    └─ cancel()        → CANCELLED

  PICKING
    ├─ itemsPicked()   → PICKED
    └─ cancel()        → CANCELLED

  PICKED
    ├─ pack()          → PACKED
    └─ cancel()        → CANCELLED

  PACKED
    ├─ ship()          → SHIPPED
    └─ cancel()        → CANCELLED

  SHIPPED
    ├─ deliver()       → DELIVERED
    └─ cancel()        → CANCELLED

  DELIVERED
    └─ handleReturn()  → RETURNED

  RETURNED
    ├─ processRefund() → REFUNDED
    └─ deny()          → DELIVERY_COMPLETE

📋 StatePattern Classes:
  abstract class OrderState {
      protected Order $order;

      public function __construct(Order $order) {
          $this->order = $order;
      }

      abstract public function approve(): void;
      abstract public function cancel(): void;
      abstract public function pickItems(): void;
      abstract public function ship(): void;
      abstract public function deliver(): void;

      protected function setState(string $state): void {
          $this->order->status = $state;
          $this->order->save();
      }
  }

📋 Concrete States:
  class PendingState extends OrderState {
      public function approve(): void {
          if ($this->validateApproval()) {
              $this->setState('approved');
              event(new OrderApproved($this->order));
          }
      }

      public function cancel(): void {
          $this->setState('cancelled');
          // Refund logic
      }
  }

  class ApprovedState extends OrderState {
      public function pickItems(): void {
          $pickList = app(PickListGenerator::class)
              ->generatePickList($this->order);

          $this->setState('picking');
          event(new PickListCreated($pickList));
      }
  }

  class ShippedState extends OrderState {
      public function deliver(): void {
          $this->order->delivered_at = now();
          $this->setState('delivered');
          // Award loyalty points
          $this->order->customer->addPoints(10);
      }
  }

📋 Order Model with State Pattern:
  class Order extends Model {
      public function approve(): void {
          $state = OrderStateFactory::create($this);
          $state->approve();
      }

      public function ship(): void {
          $state = OrderStateFactory::create($this);
          $state->ship();
      }
  }

📋 StateFactory:
  class OrderStateFactory {
      public static function create(Order $order): OrderState {
          return match ($order->status) {
              'pending' => new PendingState($order),
              'approved' => new ApprovedState($order),
              'picking' => new PickingState($order),
              'picked' => new PickedState($order),
              'packed' => new PackedState($order),
              'shipped' => new ShippedState($order),
              'delivered' => new DeliveredState($order),
              default => throw new InvalidOrderStateException(),
          };
      }
  }
```

---

## 📌 GIAI ĐOẠN 5: GIAO NHẬN & TÀI CHÍNH (TMS, Finance & IAM)

**🎯 Mục tiêu giai đoạn:**
Hàng ra khỏi kho, tiền về túi công ty

### ⏳ TODO LIST

#### Step 1: Chia tuyến đường & Gom đơn giao hàng

```
📋 Models:
  - Shipment (tùm lum các orders)
  - ShipmentRoutingRule
  - DeliveryZone
  - CarrierRate

📋 Algorithm: Smart Batching
  1. Cluster orders by delivery zone
  2. Apply TSP (Traveling Salesman Problem) for optimal route
  3. Assign vehicles based on capacity
  4. Generate shipping manifests

📋 Service: ShipmentService
  public function consolidateOrders(array $orderIds): array {
      $orders = Order::whereIn('id', $orderIds)->get();

      // Group by delivery zone
      $byZone = $orders->groupBy('delivery_zone_id');

      $shipments = [];
      foreach ($byZone as $zone => $zoneOrders) {
          $shipment = Shipment::create([
              'zone_id' => $zone,
              'status' => 'pending',
              'total_weight' => $zoneOrders->sum('weight')
          ]);

          foreach ($zoneOrders as $order) {
              $shipment->addOrder($order);
          }

          $shipments[] = $shipment;
      }

      return $shipments;
  }
```

#### Step 2: Remote Proxy Pattern cho APIs hãng vận chuyển

```
📋 Carriers: GHTK, Viettel Post, Ahamove, Grab, etc.

📋 CarrierProxy Interface:
  interface CarrierProxy {
      public function createShipment(Order $order): string; // tracking#
      public function getStatus(string $trackingNumber): ShipmentStatus;
      public function cancelShipment(string $trackingNumber): bool;
      public function calculateFee(Order $order): float;
  }

📋 Implementations:
  class GHTKCarrierProxy implements CarrierProxy {
      private string $apiKey;
      private string $baseUrl = 'https://api.ghtk.vn';

      public function createShipment(Order $order): string {
          $response = Http::withToken($this->apiKey)->post("{$this->baseUrl}/shipment/create", [
              'address' => $order->delivery_address,
              'weight' => $order->weight,
              'value' => $order->total,
              'transport' => 'road',
              'pick_time_slot' => now()->addHours(2)
          ]);

          return $response->json('data.tracking_id');
      }

      public function getStatus(string $trackingNumber): ShipmentStatus {
          $response = Http::get("{$this->baseUrl}/shipment/info", [
              'tracking_id' => $trackingNumber
          ]);

          return new ShipmentStatus(
              status: $response->json('data.status'),
              location: $response->json('data.current_location'),
              estimatedDelivery: $response->json('data.eta')
          );
      }
  }

  class ViettelPostProxy implements CarrierProxy {
      // Similar implementation for Viettel Post API
  }

📋 CarrierFactory:
  class CarrierProxyFactory {
      public static function create(string $carrier): CarrierProxy {
          return match($carrier) {
              'ghtk' => new GHTKCarrierProxy(),
              'viettel' => new ViettelPostProxy(),
              'grab' => new GrabCarrierProxy(),
              default => throw new UnsupportedCarrierException(),
          };
      }
  }

📋 ShipmentController:
  public function ship(Shipment $shipment) {
      try {
          $carrier = CarrierProxyFactory::create($shipment->carrier);

          foreach ($shipment->orders as $order) {
              $trackingId = $carrier->createShipment($order);
              $order->tracking_id = $trackingId;
              $order->shipped_at = now();
              $order->status = 'shipped';
              $order->save();
          }

          return ApiResponse::success(['tracking_ids' => $trackingIds]);
      } catch (\Exception $e) {
          return ApiResponse::serverError($e->getMessage());
      }
  }
```

#### Step 3: Jobs/Queues cho Email & Đối soát dòng tiền

```
📋 Jobs to create:
  1. SendOrderConfirmationEmail (immediate)
  2. SendShippingNotification (delayed 5 mins after ship)
  3. SendDeliveryConfirmation (after delivered)
  4. SendRefundNotification (after refund)
  5. SyncCarrierStatus (every 30 mins, pulls status from carriers)
  6. ReconcilePayments (daily at midnight)
  7. GenerateInvoice (after order confirmed)
  8. AwardLoyaltyPoints (after delivery)

📋 Job Example: SendOrderConfirmationEmail
  class SendOrderConfirmationEmail implements ShouldQueue {
      use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

      public function __construct(
          public Order $order
      ) {}

      public function handle(Mailer $mailer) {
          $mailer->send(new OrderConfirmationMail($this->order));

          \Log::info("Order #{$this->order->id} confirmation email sent");
      }

      public function failed(\Exception $e) {
          \Log::error("Failed to send order email: " . $e->getMessage());
          // Notify admin
      }
  }

📋 Job Usage:
  // In OrderController
  public function store(CreateOrderRequest $request) {
      $order = Order::create($request->validated());

      // Dispatch jobs
      SendOrderConfirmationEmail::dispatch($order); // Immediate
      SendShippingNotification::dispatch($order)->delay(now()->addMinutes(5));
      GenerateInvoice::dispatch($order)->delay(now()->addMinutes(1));

      return ApiResponse::created(['order_id' => $order->id]);
  }

📋 SyncCarrierStatus Job:
  class SyncCarrierStatus implements ShouldQueue {
      public function handle() {
          $shipments = Shipment::where('status', '!=', 'delivered')->get();

          foreach ($shipments as $shipment) {
              try {
                  $carrier = CarrierProxyFactory::create($shipment->carrier);
                  $status = $carrier->getStatus($shipment->tracking_id);

                  $shipment->status = $status->status;
                  $shipment->current_location = $status->location;
                  $shipment->save();

                  // Notify customer if status changed
                  event(new ShipmentStatusChanged($shipment));
              } catch (\Exception $e) {
                  \Log::warning("Failed to sync carrier status for shipment #{$shipment->id}");
              }
          }
      }
  }
  // Scheduled: $schedule->call(new SyncCarrierStatus())->everyThirtyMinutes();

📋 ReconcilePayments Job:
  class ReconcilePayments implements ShouldQueue {
      public function handle() {
          // Get unreconciled payments from last 24 hours
          $payments = Payment::where('reconciled', false)
              ->where('created_at', '>=', now()->subDay())
              ->get();

          foreach ($payments as $payment) {
              // Query payment gateway (Stripe, 2Checkout, etc)
              $gatewayStatus = $this->checkGatewayStatus($payment);

              if ($gatewayStatus === 'successful') {
                  $payment->reconciled = true;
                  $payment->reconciled_at = now();
                  $payment->save();

                  // Update order status
                  $payment->order->status = 'payment_confirmed';
                  $payment->order->save();
              } elseif ($gatewayStatus === 'failed') {
                  $payment->order->status = 'payment_failed';
                  $payment->order->save();

                  SendPaymentFailedEmail::dispatch($payment->order);
              }
          }

          \Log::info("Payment reconciliation completed. {$payments->count()} payments processed.");
      }

      private function checkGatewayStatus(Payment $payment): string {
          // Gateway-specific logic
      }
  }

📋 Queue Configuration (.env):
  QUEUE_CONNECTION=database

  Tables created:
  - jobs (stores queued jobs)
  - job_batches (for batch operations)
  - failed_jobs (failed job history)

📋 Running Queue Worker:
  php artisan queue:work --tries=3 --timeout=90
  // Automatically processes jobs from queue
```

#### Step 4: RBAC (Role-Based Access Control) hoàn thiện

```
📋 Roles to create:
  1. super_admin    - Full system access
  2. admin          - Manage products, categories
  3. warehouse_mgr  - Manage warehouse operations
  4. staff          - Data entry, picking
  5. finance        - View payments, invoices
  6. customer       - Place orders, view account

📋 Permissions:
  - products.create, products.read, products.update, products.delete
  - orders.view, orders.approve, orders.cancel
  - inventory.view, inventory.adjust
  - payments.view, payments.reconcile
  - reports.view
  - settings.manage
  - users.manage
  - roles.manage

📋 Models:
  - Role
  - Permission
  - RolePermission (pivot)
  - UserRole (pivot)

📋 Middleware: CheckPermission
  public function handle(Request $request, Closure $next, string $permission) {
      if (!auth()->user()->hasPermission($permission)) {
          return ApiResponse::forbidden("You don't have permission to {$permission}");
      }

      return $next($request);
  }

📋 Route Protection:
  Route::group(['middleware' => ['auth:api', 'check.permission:products.create']], function () {
      Route::post('/products', [ProductController::class, 'store']);
  });

📋 Seeded Roles:
  - Super Admin (all permissions)
  - Admin (products, categories, users)
  - Warehouse Manager (inventory, locations, stocks)
  - Staff (view-only)
  - Customer (self-service)
```

---

## 📌 GIAI ĐOẠN 6: TRẢI NGHIỆM KHÁCH HÀNG & HOÀN THIỆN (CRM, CMS & Engagement)

**🎯 Mục tiêu giai đoạn:**
Giữ chân khách hàng và chuẩn bị Release

### ⏳ TODO LIST

#### Step 1: Tính năng Đánh giá, Sổ địa chỉ, Điểm thưởng

```
📋 Models:
  - Review (product reviews)
    * Columns: id, product_id, user_id, rating (1-5), title, content, helpful_count, images
    * Relations: belongsTo(Product), belongsTo(User)

  - Address (customer address book)
    * Columns: id, user_id, type (home, work, other), street, city, state, postal_code, country, is_default
    * Relations: belongsTo(User)

  - LoyaltyAccount (customer rewards)
    * Columns: id, user_id, points, tier (bronze, silver, gold, platinum), total_redeemed, created_at
    * Relations: belongsTo(User), hasMany(LoyaltyTransaction)

  - LoyaltyTransaction
    * Columns: id, loyalty_account_id, points, type (earn, redeem), reference_id, created_at
    * Relations: belongsTo(LoyaltyAccount)

📋 Services:
  - ReviewService
    * submitReview(int $productId, int $userId, int $rating, string $content): Review
    * flagInappropriateReview(int $reviewId): void
    * generateRecommendations(User $user): array

  - LoyaltyService
    * awardPoints(User $user, int $points, string $reason): void
    * redeemPoints(User $user, int $points): float // Returns discount amount
    * upgradeCustomerTier(User $user): void
    * getCustomerBenefits(User $user): array

📋 Loyalty Tiers:
  Bronze (0-499 points)
    - 1 point per $1 spent
    - Birthday bonus: 50 points

  Silver (500-1499 points)
    - 1.5 points per $1 spent
    - Birthday bonus: 100 points
    - Free shipping on orders >$50

  Gold (1500-4999 points)
    - 2 points per $1 spent
    - Birthday bonus: 200 points
    - Free shipping always
    - 5% discount on all orders

  Platinum (5000+ points)
    - 3 points per $1 spent
    - Birthday bonus: 500 points
    - Free express shipping
    - 10% discount on all orders
    - Priority customer service
    - Exclusive product access

📋 Review Workflow:
  1. Customer purchases product
  2. After 3 days, receive email: "Tell us what you think!"
  3. Submit review (text + images + rating)
  4. Review shown on product page (after moderation if flagged)
  5. Helpful votes system
  6. Reviews influence product ranking

📋 Address Management:
  public function addAddress(User $user, array $data) {
      if ($data['is_default']) {
          $user->addresses()->update(['is_default' => false]);
      }

      return $user->addresses()->create($data);
  }

  public function getAddressForOrder(User $user, ?int $addressId = null) {
      if ($addressId) {
          return $user->addresses()->findOrFail($addressId);
      }

      return $user->addresses()->where('is_default', true)->first();
  }
```

#### Step 2: Feature Tests bằng Pest/PHPUnit

```
📋 Critical Workflows to Test:
  1. /tests/Feature/CheckoutTest.php
     - test_customer_can_add_items_to_cart()
     - test_customer_can_apply_coupon()
     - test_customer_can_checkout()
     - test_stock_is_decremented_after_checkout()
     - test_order_is_created_with_correct_total()
     - test_payment_processing()

  2. /tests/Feature/InventoryTest.php
     - test_stock_deduction_is_atomic()
     - test_fifo_algorithm_picks_oldest_batch()
     - test_stock_movement_is_logged()
     - test_concurrent_stock_updates_dont_conflict()
     - test_warehouse_location_capacity_respected()

  3. /tests/Feature/OrderLifecycleTest.php
     - test_order_transitions_through_states()
     - test_order_cannot_transition_invalid_state()
     - test_picking_creates_pick_list()
     - test_shipment_syncs_with_carrier()
     - test_order_delivered_awards_points()

  4. /tests/Feature/AuthenticationTest.php
     - test_admin_can_access_admin_routes()
     - test_customer_cannot_access_admin_routes()
     - test_middleware_blocks_unauthorized_users()
     - test_role_permissions_enforced()

📋 Example Test (Pest syntax):
  test('customer can checkout with discount', function () {
      $customer = User::factory()->create(['role' => 'customer']);
      $product = Product::factory()->create(['price' => 100]);

      $this->actingAs($customer);

      $response = $this->post('/api/orders', [
          'items' => [
              ['product_id' => $product->id, 'quantity' => 2]
          ],
          'coupon' => 'SAVE10'
      ]);

      $response->assertStatus(201);

      $order = Order::latest()->first();
      expect($order->total)->toBe(180); // 200 - 10% + tax + shipping
      expect($order->status)->toBe('pending');
      expect($product->fresh()->quantity)->toBe($product->quantity - 2);
  });

📋 Database Testing (use transactions):
  use Illuminate\Foundation\Testing\DatabaseTransactions;

  class OrderTest extends TestCase {
      use DatabaseTransactions; // Rollback after each test

      test('stock is decremented atomically', function () {
          $product = Product::factory()->create(['quantity' => 10]);

          DB::transaction(function () use ($product) {
              $this->deductStock($product->id, 5);
          });

          expect($product->fresh()->quantity)->toBe(5);
      });
  }

📋 Running Tests:
  php artisan test --parallel
  // Runs all tests in parallel for speed

  php artisan test tests/Feature/CheckoutTest.php
  // Run single test file

  php artisan test --filter test_customer_can_checkout
  // Run tests matching pattern
```

#### Step 3: Rà soát lỗi N+1 Query

```
📋 Finding N+1 Queries:
  Laravel Debugbar (development)
    - Shows query count & execution time
    - Highlights N+1 issues

  Query logging:
    DB::listen(function ($query) {
        \Log::info($query->sql);
    });

📋 Common N+1 Scenarios:
  ❌ BAD:
    $orders = Order::all();
    foreach ($orders as $order) {
        echo $order->customer->name; // 1 + N queries!
    }

  ✅ GOOD:
    $orders = Order::with('customer')->get(); // 2 queries total
    foreach ($orders as $order) {
        echo $order->customer->name;
    }

📋 Nested Relationships (Eager Loading):
  ❌ BAD:
    $orders = Order::all();
    foreach ($orders as $order) {
        foreach ($order->items as $item) {
            echo $item->product->name; // 1 + N + (N*M) queries!
        }
    }

  ✅ GOOD:
    $orders = Order::with('items.product', 'customer', 'shipment').get();
    // 4 queries total regardless of order count

📋 Automated Testing (Pest):
  test('no n+1 queries in order listing', function () {
      Order::factory(10)->create();

      $this->expectQueryCount(2); // 1 for orders + 1 for customers

      $orders = Order::with('customer', 'items.product').get();

      foreach ($orders as $order) {
          $order->customer->name;
          foreach ($order->items as $item) {
              $item->product->name;
          }
      }
  });

📋 Query Optimization:
  1. Eager load relationships: with()
  2. Use select() to limit columns: select('id', 'name')
  3. Use whereHas() instead of hasMany + filter in PHP
  4. Add database indexes on foreign keys
  5. Use pagination for large datasets
  6. Cache expensive queries (via Proxy pattern)

📋 Index Strategy:
  - Foreign keys: Always indexed
  - Frequently queried columns: Indexed
  - Status columns: Indexed (orders.status, shipments.status)
  - Date ranges: Indexed (created_at, delivered_at)
  - Avoid indexing: Boolean columns (unless filtering heavily)
```

---

## 📝 TESTING CHECKLIST

### Unit Tests

- [ ] BaseService error handling
- [ ] BaseRepository CRUD operations
- [ ] Category hierarchy (parent-child)
- [ ] Product variant calculations
- [ ] FIFO batch selection
- [ ] Price decorator chain
- [ ] Order state transitions

### Integration Tests

- [ ] Complete checkout flow
- [ ] Stock deduction with transactions
- [ ] Pick list generation
- [ ] Shipment carrier integration
- [ ] Payment reconciliation
- [ ] Email queue dispatch
- [ ] Loyalty points award

### Feature Tests

- [ ] Admin can create products
- [ ] Customer can checkout
- [ ] Stock prevents overselling
- [ ] Orders move through states correctly
- [ ] Shipments sync with carriers
- [ ] Reports generate correctly
- [ ] RBAC permissions enforced

### Performance Tests

- [ ] No N+1 queries in product listing
- [ ] Cart operations complete <100ms
- [ ] Order checkout <2s
- [ ] Stock lookup <50ms
- [ ] Handle 1000+ concurrent users
- [ ] Redis cart handles spike traffic

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Environment configuration (.env.production)
- [ ] Database backup strategy
- [ ] Error logging (Sentry/Rollbar)
- [ ] Redis cluster setup
- [ ] Queue worker supervision (Supervisor)
- [ ] Cache warming strategy
- [ ] CDN for static assets
- [ ] SSL certificate
- [ ] Load balancing
- [ ] Monitoring (New Relic, DataDog)
- [ ] Backup & disaster recovery plan
- [ ] Documentation complete
- [ ] Security audit passed
- [ ] Load tested at peak capacity

---

**Lộ trình này bao gồm tất cả chi tiết cần thiết để xây dựng một hệ thống e-commerce WMS hoàn chỉnh và sáng trong!**
