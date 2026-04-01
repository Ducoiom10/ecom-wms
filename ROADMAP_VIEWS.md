# 🎨 LỘ TRÌNH THỰC HIỆN VIEWS (UI/Frontend) - 6 GIAI ĐOẠN CHI TIẾT

> **Ngày bắt đầu:** 01/04/2026  
> **Tech Stack:** Filament (Laravel) + Nuxt 3 + Tailwind CSS  
> **Database:** MySQL 8.0.30 (kế thừa từ ROADMAP.md)  
> **PHP:** 8.2.20 | Node.js: 18+ LTS  
> **Mục tiêu:** Xây dựng 2 hệ thống UI/Frontend hoàn chỉnh (Admin & Storefront)

---

## 📌 GIAI ĐOẠN 1: THIẾT LẬP NỀN TẢNG GIAO DIỆN (UI Foundation & API Layer)

### 🎯 Mục tiêu giai đoạn

Dựng khung sườn cho cả 2 hệ thống (Admin Filament & Storefront Nuxt 3), thiết lập lớp giao tiếp API an toàn, chuẩn bị cơ sở hạ tầng xuyên suốt 5 giai đoạn tiếp theo.

### 📊 Tiến độ: [ ] 0% Chưa bắt đầu

---

## ⏳ GIAI ĐOẠN 1 - TODO LIST

### Step 1: Khởi tạo & Cấu hình WMS Admin (Filament)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3-4 ngày  
**Dependencies:** Hoàn thành ROADMAP giai đoạn 1, 2, 3

#### 📋 Setup & Configuration

- [ ] **Cài đặt Filament Panel**

    ```bash
    php artisan filament:install --panels
    ```

    - Tạo Default Admin Panel
    - Đặt namespace: `App\Filament\Admin`
    - Cấu hình entry point: `/admin`

- [ ] **Tạo Admin Panel Provider**
    - File: `app/Providers/Filament/AdminPanelProvider.php`
    - Kế thừa: `PanelProvider::class`
    - Cấu hình: ID = 'admin', path = 'admin', login path = 'admin/login'
    - Đăng ký middleware: `web`, `auth:web`, custom RBAC middleware

- [ ] **Cấu hình Theme & Brand**
    - Logo: Upload file vào `/storage/app/public/logo-admin.png`
    - Color scheme: Primary (Indigo-600), Secondary (Slate-100)
    - Font: Sử dụng Inter (import từ Google Fonts)
    - **File:** `app/Filament/Themes/AdminTheme.php` hoặc config `filament.theme`

- [ ] **Tích hợp Spatie Shield**

    ```bash
    php artisan shield:install
    ```

    - Tạo DB table: `roles`, `permissions`, `model_has_roles`, `model_has_permissions`
    - Seed default roles: `super_admin`, `admin`, `manager`, `staff`
    - Seed default permissions: CRUD cho mỗi module
    - Cấu hình: `config/permission.php`

#### 📋 Core Layouts

- [ ] **Tạo Base Layout với Sidebar Navigation**
    - File: `resources/views/filament/layouts/base.blade.php`
    - Sidebar: Collapsible, grouped by module
        - 🏪 **Catalog** (Category, Product)
        - 📦 **Inventory** (Warehouse, Stock, Movements)
        - 🏢 **WMS** (PickList, Locations, Bins)
        - 📋 **OMS** (Orders, OrderItems)
        - 🛒 **Cart** (Manual Cart Management)
        - 💰 **Pricing** (Prices, Discounts, Strategies)
        - 🚚 **TMS** (Shipments, Carriers)
        - 💳 **Finance** (Invoices, Payments)
        - 👥 **IAM** (Users, Roles, Permissions)
    - Active indicator: Highlight current module
    - Mobile: Toggle icon (hamburger) trên màn hình nhỏ

- [ ] **Implement Global Search**
    - Tích hợp Laravel Scout
    - Search indexing: Products, Orders, Customers
    - UI: Searchable dropdown (fuzzy search)
    - Hotkey: Ctrl+K (macOS: Cmd+K) để mở search
    - Result categories: Products | Orders | Customers

- [ ] **User Profile Menu & Logout**
    - Avatar: Circle display, initials fallback
    - Dropdown menu: Profile | Settings | Logout
    - Profile link: Dẫn tới `/admin/profile` (thay đổi password, avatar)
    - Logout: CSRF protected, destroy session

---

### Step 2: Khởi tạo Nuxt 3 Storefront

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2-3 ngày  
**Dependencies:** Node.js 18+, npm/yarn

#### 📋 Setup Project

- [ ] **Khởi tạo Nuxt 3**

    ```bash
    npx nuxi@latest init storefront-pwa
    cd storefront-pwa
    ```

    - Chọn package manager: npm hoặc yarn
    - Project name: `storefront-pwa`
    - Typescript: Yes
    - Git: Yes

- [ ] **Cài đặt Core Modules & Dependencies**

    ```bash
    npm install --save \
      @nuxtjs/tailwindcss \
      @pinia/nuxt \
      @nuxt/image \
      @vueuse/nuxt \
      @nuxtjs/i18n \
      @headlessui/vue \
      @heroicons/vue \
      axios \
      swiper \
      vcalendar \
      dexie

    npm install --save-dev \
      @tailwindcss/typography \
      @tailwindcss/forms
    ```

- [ ] **Cấu hình Tailwind CSS**
    - File: `tailwind.config.ts`
    - Extend colors: Brand colors (Indigo, Emerald, Amber)
    - Extend spacing: Align với design system
    - Enable typography plugin
    - Dark mode: Toggle strategy

- [ ] **Cấu hình Nuxt Runtime Config**
    - File: `nuxt.config.ts`

    ```typescript
    export default defineNuxtConfig({
        runtimeConfig: {
            public: {
                apiBase:
                    process.env.API_BASE_URL || "http://localhost:8000/api",
                reverbKey: process.env.REVERB_APP_KEY || "",
                reverbHost: process.env.REVERB_HOST || "localhost",
                reverbPort: process.env.REVERB_PORT || "8080",
            },
        },
    });
    ```

    - Tạo `.env.example`:
        ```
        NUXT_PUBLIC_API_BASE=http://localhost:8000/api
        NUXT_PUBLIC_REVERB_KEY=your-app-key
        NUXT_PUBLIC_REVERB_HOST=localhost
        NUXT_PUBLIC_REVERB_PORT=8080
        ```

#### 📋 Cấu trúc thư mục chuẩn (Nuxt 3)

- [ ] **Tạo folder structure**

    ```
    /assets
      /css
        /tailwind.css          # Tailwind directives

    /components
      /common                  # Reusable components
        /Header.vue
        /Footer.vue
        /Navigation.vue
      /ui                      # Atomic design - bare UI
        /Button.vue
        /Input.vue
        /Modal.vue
        /Skeleton.vue
      /product
        /ProductCard.vue
        /ProductGallery.vue
        /VariantSelector.vue
      /cart
        /CartItem.vue
        /SlideOverCart.vue
      /account
        /SidebarAccount.vue

    /composables
      /useApi.ts               # API factory with interceptors
      /useAuth.ts              # Auth composable
      /useCart.ts              # Cart logic
      /useToast.ts             # Toast notifications
      /api
        /productApi.ts
        /cartApi.ts
        /orderApi.ts
        /authApi.ts

    /layouts
      /default.vue             # Header/Footer
      /checkout.vue            # Minimal (no footer)
      /account.vue             # Sidebar layout

    /pages
      /index.vue               # Homepage
      /category
        /[slug].vue            # Category listing
      /products
        /[id].vue              # Product detail
      /cart.vue
      /checkout
        /auth.vue
        /shipping.vue
        /payment.vue
        /review.vue
        /success.vue
      /account
        /orders.vue
        /loyalty.vue
        /addresses.vue
        /profile.vue
        /wishlist.vue

    /stores
      /auth.ts                 # Pinia auth store
      /cart.ts                 # Cart store (Redis sync)
      /ui.ts                   # UI state (modal, toast, sidebar)
      /products.ts             # Product cache (optional)

    /types
      /api.types.ts            # DTO/Response types
      /models.types.ts         # Domain models

    /middleware
      /auth.ts                 # Protect routes
      /guest.ts                # Redirect logged-in users

    /plugins
      /1.echo.client.ts        # WebSocket setup (Laravel Echo)
      /2.api.ts                # Initialize useApi globally
    ```

- [ ] **Tạo .env.example**

    ```
    # Development
    NUXT_PUBLIC_API_BASE=http://localhost:8000/api
    NUXT_PUBLIC_APP_NAME=Storefront PWA
    NUXT_PUBLIC_APP_URL=http://localhost:3000
    NUXT_PUBLIC_I18N_DEFAULT_LOCALE=vi
    NUXT_PUBLIC_I18N_FALLBACK_LOCALE=vi

    # WebSocket (Laravel Reverb)
    NUXT_PUBLIC_REVERB_KEY=local
    NUXT_PUBLIC_REVERB_HOST=localhost
    NUXT_PUBLIC_REVERB_PORT=8080
    ```

---

### Step 3: Xây dựng API Connection Layer (Storefront)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày  
**Dependencies:** Step 2 hoàn thành

#### 📋 API Client Factory (composables/useApi.ts)

- [ ] **Tạo useApi composable**

    ```typescript
    // composables/useApi.ts
    export const useApi = () => {
        const config = useRuntimeConfig();
        const authStore = useAuthStore();
        const toastStore = useUiStore();

        return $fetch.create({
            baseURL: config.public.apiBase,
            credentials: "include", // Gửi cookie cùng request

            onRequest({ options }) {
                // Thêm Authorization header
                if (authStore.token) {
                    options.headers = {
                        ...options.headers,
                        Authorization: `Bearer ${authStore.token}`,
                    };
                }
            },

            onResponseError({ response, error }) {
                // 401: Unauthorized
                if (response.status === 401) {
                    authStore.logout();
                    navigateTo("/login");
                    toastStore.addToast("Phiên đăng nhập hết hạn", "error");
                }
                // 403: Forbidden
                if (response.status === 403) {
                    toastStore.addToast("Bạn không có quyền truy cập", "error");
                }
                // 422: Validation error
                if (response.status === 422) {
                    // Xử lý form validation errors
                    console.warn("Validation errors:", response._data.errors);
                }
                // 500: Server error
                if (response.status >= 500) {
                    toastStore.addToast(
                        "Lỗi máy chủ. Vui lòng thử lại sau",
                        "error",
                    );
                }
            },
        });
    };
    ```

- [ ] **Tạo typed Response interceptor**
    - Wrap `$fetch` responses với error handling
    - Map API responses → frontend types
    - Retry logic cho failed requests (exponential backoff)

#### 📋 Service Repositories (API integration layer)

- [ ] **Tạo composables/api/productApi.ts**

    ```typescript
    export const useProductApi = () => {
        const api = useApi();

        return {
            // GET /api/products
            getAll: (params?: QueryParams) =>
                api("products", { query: params }),

            // GET /api/products/:id
            getById: (id: string) => api(`products/${id}`),

            // GET /api/products?category=:slug
            getByCategory: (slug: string, params?: QueryParams) =>
                api("products", { query: { category: slug, ...params } }),

            // GET /api/products/search
            search: (q: string, limit = 20) =>
                api("products/search", { query: { q, limit } }),

            // GET /api/products/:id/attributes
            getAttributes: (id: string) => api(`products/${id}/attributes`),

            // GET /api/products/:id/reviews
            getReviews: (id: string, page = 1) =>
                api(`products/${id}/reviews`, { query: { page } }),
        };
    };
    ```

- [ ] **Tạo composables/api/cartApi.ts**

    ```typescript
    export const useCartApi = () => {
        const api = useApi();

        return {
            getCart: () => api("cart"),
            addItem: (
                productId: string,
                quantity: number,
                variantId?: string,
            ) =>
                api("cart/items", {
                    method: "POST",
                    body: { productId, quantity, variantId },
                }),
            updateItem: (itemId: string, quantity: number) =>
                api(`cart/items/${itemId}`, {
                    method: "PUT",
                    body: { quantity },
                }),
            removeItem: (itemId: string) =>
                api(`cart/items/${itemId}`, { method: "DELETE" }),
            applyCoupon: (code: string) =>
                api("cart/coupon", { method: "POST", body: { code } }),
            removeCoupon: () => api("cart/coupon", { method: "DELETE" }),
        };
    };
    ```

- [ ] **Tạo composables/api/orderApi.ts**

    ```typescript
    export const useOrderApi = () => {
        const api = useApi();

        return {
            getOrders: (page = 1, limit = 10) =>
                api("orders", { query: { page, limit } }),
            getOrder: (id: string) => api(`orders/${id}`),
            createOrder: (payload: OrderPayload) =>
                api("orders", { method: "POST", body: payload }),
            cancelOrder: (id: string) =>
                api(`orders/${id}/cancel`, { method: "POST" }),
            getOrderTracking: (id: string) => api(`orders/${id}/tracking`),
        };
    };
    ```

- [ ] **Tạo composables/api/authApi.ts**

    ```typescript
    export const useAuthApi = () => {
        const api = useApi();

        return {
            register: (email: string, password: string, name: string) =>
                api("auth/register", {
                    method: "POST",
                    body: { email, password, name },
                }),
            login: (email: string, password: string) =>
                api("auth/login", {
                    method: "POST",
                    body: { email, password },
                }),
            logout: () => api("auth/logout", { method: "POST" }),
            refreshToken: () => api("auth/refresh", { method: "POST" }),
            getProfile: () => api("auth/me"),
            updateProfile: (payload: any) =>
                api("auth/profile", { method: "PUT", body: payload }),
        };
    };
    ```

---

### Step 4: Quản lý Trạng thái Toàn cục (Global State)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 1-2 ngày  
**Dependencies:** Step 2 hoàn thành

#### 📋 Pinia Stores (stores/)

- [ ] **Tạo stores/auth.ts**

    ```typescript
    export const useAuthStore = defineStore("auth", () => {
        const token = ref<string | null>(null);
        const user = ref<User | null>(null);
        const isLoading = ref(false);

        const authApi = useAuthApi();

        const login = async (email: string, password: string) => {
            isLoading.value = true;
            try {
                const { data } = await authApi.login(email, password);
                token.value = data.token;
                user.value = data.user;
                localStorage.setItem("token", data.token);
            } finally {
                isLoading.value = false;
            }
        };

        const logout = async () => {
            await authApi.logout();
            token.value = null;
            user.value = null;
            localStorage.removeItem("token");
            navigateTo("/login");
        };

        const loadProfile = async () => {
            if (!token.value) return;
            try {
                const { data } = await authApi.getProfile();
                user.value = data;
            } catch (error) {
                logout();
            }
        };

        // Hydrate from localStorage on init
        onMounted(() => {
            const savedToken = localStorage.getItem("token");
            if (savedToken && !token.value) {
                token.value = savedToken;
                loadProfile();
            }
        });

        return {
            token: readonly(token),
            user: readonly(user),
            isLoading: readonly(isLoading),
            login,
            logout,
            loadProfile,
        };
    });
    ```

- [ ] **Tạo stores/cart.ts**

    ```typescript
    export interface CartItem {
        id: string;
        productId: string;
        variantId?: string;
        quantity: number;
        price: number;
        subtotal: number;
    }

    export const useCartStore = defineStore("cart", () => {
        const items = ref<CartItem[]>([]);
        const total = ref(0);
        const discount = ref(0);
        const couponCode = ref<string | null>(null);
        const isLoading = ref(false);

        const cartApi = useCartApi();

        const fetchCart = async () => {
            isLoading.value = true;
            try {
                const { data } = await cartApi.getCart();
                items.value = data.items;
                total.value = data.total;
                discount.value = data.discount;
                couponCode.value = data.coupon_code;
            } finally {
                isLoading.value = false;
            }
        };

        const addToCart = async (
            productId: string,
            quantity: number,
            variantId?: string,
        ) => {
            isLoading.value = true;
            try {
                const { data } = await cartApi.addItem(
                    productId,
                    quantity,
                    variantId,
                );
                items.value = data.items;
                total.value = data.total;
                useUiStore().addToast("Thêm vào giỏ thành công", "success");
            } finally {
                isLoading.value = false;
            }
        };

        const updateQuantity = async (itemId: string, quantity: number) => {
            isLoading.value = true;
            try {
                const { data } = await cartApi.updateItem(itemId, quantity);
                items.value = data.items;
                total.value = data.total;
            } finally {
                isLoading.value = false;
            }
        };

        const removeItem = async (itemId: string) => {
            isLoading.value = true;
            try {
                const { data } = await cartApi.removeItem(itemId);
                items.value = data.items;
                total.value = data.total;
            } finally {
                isLoading.value = false;
            }
        };

        const applyCoupon = async (code: string) => {
            isLoading.value = true;
            try {
                const { data } = await cartApi.applyCoupon(code);
                items.value = data.items;
                total.value = data.total;
                discount.value = data.discount;
                couponCode.value = data.coupon_code;
                useUiStore().addToast(
                    "Áp dụng mã khuyến mãi thành công",
                    "success",
                );
            } finally {
                isLoading.value = false;
            }
        };

        return {
            items: readonly(items),
            total: readonly(total),
            discount: readonly(discount),
            couponCode: readonly(couponCode),
            isLoading: readonly(isLoading),
            fetchCart,
            addToCart,
            updateQuantity,
            removeItem,
            applyCoupon,
        };
    });
    ```

- [ ] **Tạo stores/ui.ts**

    ```typescript
    export interface Toast {
        id: string;
        message: string;
        type: "success" | "error" | "warning" | "info";
        duration?: number;
    }

    export const useUiStore = defineStore("ui", () => {
        const isSidebarOpen = ref(true);
        const isCartOpen = ref(false);
        const theme = ref<"light" | "dark">("light");
        const toasts = ref<Toast[]>([]);
        const modals = ref<Record<string, boolean>>({});

        const toggleSidebar = () => {
            isSidebarOpen.value = !isSidebarOpen.value;
        };

        const toggleCart = () => {
            isCartOpen.value = !isCartOpen.value;
        };

        const toggleTheme = () => {
            theme.value = theme.value === "light" ? "dark" : "light";
            localStorage.setItem("theme", theme.value);
            // Apply to document element
            if (process.client) {
                document.documentElement.classList.toggle("dark");
            }
        };

        const addToast = (
            message: string,
            type: Toast["type"] = "info",
            duration = 3000,
        ) => {
            const id = Math.random().toString(36).substr(2, 9);
            toasts.value.push({ id, message, type, duration });

            setTimeout(() => {
                toasts.value = toasts.value.filter((t) => t.id !== id);
            }, duration);
        };

        const openModal = (name: string) => {
            modals.value[name] = true;
        };

        const closeModal = (name: string) => {
            modals.value[name] = false;
        };

        return {
            isSidebarOpen: readonly(isSidebarOpen),
            isCartOpen: readonly(isCartOpen),
            theme: readonly(theme),
            toasts: readonly(toasts),
            modals: readonly(modals),
            toggleSidebar,
            toggleCart,
            toggleTheme,
            addToast,
            openModal,
            closeModal,
        };
    });
    ```

- [ ] **Tạo stores/products.ts (optional - caching)**

    ```typescript
    export const useProductStore = defineStore("products", () => {
        const cached = ref<Record<string, Product>>({});
        const categories = ref<Category[]>([]);

        const productApi = useProductApi();

        const getProduct = async (id: string) => {
            if (cached.value[id]) {
                return cached.value[id];
            }
            const product = await productApi.getById(id);
            cached.value[id] = product;
            return product;
        };

        const getCategories = async () => {
            if (categories.value.length > 0) {
                return categories.value;
            }
            categories.value = await productApi.getCategories();
            return categories.value;
        };

        return {
            cached: readonly(cached),
            categories: readonly(categories),
            getProduct,
            getCategories,
        };
    });
    ```

---

## 📌 GIAI ĐOẠN 2: HIỂN THỊ DANH MỤC & SẢN PHẨM (Catalog & PIM UI)

### 🎯 Mục tiêu giai đoạn

Render dữ liệu sản phẩm phức tạp (JSON Attributes, Variants) lên View mượt mà, chuẩn SEO. Admin có thể tạo sản phẩm với hình ảnh, thuộc tính, biến thể.

### 📊 Tiến độ: [✓] 100% Chi tiết đầy đủ

---

### Step 1: Giao diện Product Builder (Admin Filament)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Filament Resources (ProductResource.php)

- [ ] **Cài đặt Dependencies**

    ```bash
    composer require filament/filament
    php artisan filament:install --panels
    php artisan migrate
    ```

- [ ] **Tạo ProductResource**

    ```bash
    php artisan make:filament-resource Product
    ```

    - Register trong AdminPanelProvider: `->resources([ProductResource::class])`
    - Cấu hình permission scope: `canCreate()`, `canEdit()`, `canView()`, `canDelete()` via Spatie Shield

- [ ] **Thiết kế Form với Tabs/Wizard**

    ```php
    // app/Filament/Resources/ProductResource.php
    public static function form(Form $form): Form {
        return $form->schema([
            Tabs::make('Product Details')->tabs([
                Tab::make('General')->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, Set $set) => $set('slug', str($state)->slug())),
                    TextInput::make('slug')
                        ->disabled()
                        ->dehydrated(),
                    TextInput::make('sku')
                        ->unique(table: 'products', column: 'sku', ignoreRecord: true)
                        ->required()
                        ->helperText('Định danh sản phẩm duy nhất'),
                    Textarea::make('description')
                        ->columnSpan('full')
                        ->rows(4),
                    Select::make('category_id')
                        ->relationship('category', 'name')
                        ->required(),
                    Select::make('brand_id')
                        ->relationship('brand', 'name'),
                    TextInput::make('price')
                        ->numeric()
                        ->required()
                        ->prefix('₫')
                        ->minValue(0),
                    TextInput::make('cost')
                        ->numeric()
                        ->prefix('₫')
                        ->helperText('Chi phí gốc (dùng tính lợi nhuận)'),
                ])->columns(2),

                Tab::make('Attributes (JSON)')->schema([
                    KeyValue::make('attributes')
                        ->keyLabel('Property (e.g., Color, Size, Material)')
                        ->valueLabel('Value (e.g., Red, M, Cotton)')
                        ->columnSpan('full')
                        ->helperText('Thêm thuộc tính sản phẩm tùy chọn'),
                ]),

                Tab::make('Variants')->schema([
                    Repeater::make('variants')
                        ->relationship()
                        ->schema([
                            TextInput::make('sku')
                                ->required()
                                ->unique(table: 'product_variants', column: 'sku', ignoreRecord: true),
                            TextInput::make('price_override')
                                ->numeric()
                                ->helperText('Giá riêng cho biến thể (nếu trống = giá gốc)'),
                            TextInput::make('color'),
                            TextInput::make('size'),
                            TextInput::make('weight')
                                ->numeric()
                                ->suffix('kg'),
                        ])
                        ->columns(2)
                        ->columnSpan('full')
                        ->addActionLabel('Thêm biến thể'),
                ]),

                Tab::make('Images')->schema([
                    FileUpload::make('images')
                        ->multiple()
                        ->image()
                        ->maxSize(5120)
                        ->reorderable()
                        ->columnSpan('full')
                        ->directory('products'),
                ]),

                Tab::make('SEO')->schema([
                    TextInput::make('meta_title')
                        ->maxLength(60)
                        ->helperText('Độ dài tối ưu: 30-60 ký tự'),
                    Textarea::make('meta_description')
                        ->rows(3)
                        ->maxLength(160)
                        ->helperText('Độ dài tối ưu: 120-160 ký tự'),
                    TagsInput::make('meta_keywords'),
                ]),
            ])
        ]);
    }
    ```

- [ ] **Tạo ProductResource Table & Actions**

    ```php
    public static function table(Table $table): Table {
        return $table
            ->columns([
                TextColumn::make('name')->searchable(),
                TextColumn::make('sku')->badge(),
                TextColumn::make('category.name')->label('Category'),
                TextColumn::make('price')
                    ->money('vnd')
                    ->sortable(),
                ImageColumn::make('images')
                    ->label('Image')
                    ->circular(),
                BooleanColumn::make('is_active'),
                TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->relationship('category', 'name'),
                SelectFilter::make('brand')
                    ->relationship('brand', 'name'),
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }
    ```

- [ ] **Tạo BrandResource**

    ```bash
    php artisan make:filament-resource Brand
    ```

    - Form: name, description, logo (FileUpload)
    - Table columns: name, product_count (aggregated), created_at
    - Actions: Edit, Delete, View Products (related)

- [ ] **Tạo ProductAttributeResource**

    ```bash
    php artisan make:filament-resource ProductAttribute
    ```

    - Form: name (required), label, data_type (enum: string, integer, color, date, etc.)
    - Table: List all attributes với usage count (COUNT query relationship)
    - Bulk actions: Delete, Change data_type

---

### Step 2: Catalog Page & Lọc động (Storefront)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Page Layout (pages/category/[slug].vue)

- [ ] **Tạo page/category/[slug].vue**

    ```vue
    <template>
        <div class="min-h-screen bg-white">
            <!-- Breadcrumb -->
            <Breadcrumb :items="breadcrumbs" />

            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-12">
                <!-- Sidebar Filter -->
                <aside class="md:col-span-1">
                    <CatalogSidebar
                        :filters="filters"
                        :selected="selectedFilters"
                        @update="updateFilters"
                    />
                </aside>

                <!-- Product Grid -->
                <main class="md:col-span-3">
                    <!-- Sort & View Options -->
                    <div class="flex justify-between items-center mb-6">
                        <p class="text-gray-600">
                            {{ totalProducts }} sản phẩm
                        </p>
                        <select
                            v-model="sortBy"
                            class="border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="price-asc">Giá: Thấp đến cao</option>
                            <option value="price-desc">
                                Giá: Cao đến thấp
                            </option>
                            <option value="popular">Phổ biến</option>
                        </select>
                    </div>

                    <!-- Product Grid (3 columns) -->
                    <div v-if="!pending" class="grid grid-cols-3 gap-6">
                        <ProductCard
                            v-for="product in products"
                            :key="product.id"
                            :product="product"
                            @add-to-cart="handleAddToCart"
                        />
                    </div>

                    <!-- Skeleton Loaders -->
                    <div v-else class="grid grid-cols-3 gap-6">
                        <SkeletonCard v-for="i in 9" :key="i" />
                    </div>

                    <!-- Pagination -->
                    <Pagination
                        v-if="totalPages > 1"
                        :current="currentPage"
                        :total="totalPages"
                        @change="changePage"
                    />
                </main>
            </div>
        </div>
    </template>

    <script setup lang="ts">
    import { ref } from "vue";

    const route = useRoute();
    const router = useRouter();
    const productApi = useProductApi();
    const cartStore = useCartStore();

    const sortBy = ref((route.query.sort as string) || "newest");
    const currentPage = ref(parseInt(route.query.page as string) || 1);
    const selectedFilters = ref<Record<string, any>>({});

    // Load products with filters
    const {
        data: products,
        pending,
        refresh,
    } = await useAsyncData(`category-${route.params.slug}`, () =>
        productApi.getByCategory(route.params.slug, {
            ...route.query,
            sort: sortBy.value,
            page: currentPage.value,
        }),
    );

    const breadcrumbs = computed(() => [
        { label: "Home", href: "/" },
        { label: "Categories", href: "/categories" },
        { label: route.params.slug as string, current: true },
    ]);

    const totalProducts = computed(() => products.value?.total || 0);
    const totalPages = computed(() =>
        Math.ceil((products.value?.total || 0) / 12),
    );

    const filters = ref([
        { type: "price", label: "Giá", min: 0, max: 100000000 },
        { type: "brand", label: "Thương hiệu", options: [] },
        { type: "color", label: "Màu sắc", options: [] },
        { type: "size", label: "Kích cỡ", options: [] },
    ]);

    const updateFilters = (key: string, value: any) => {
        selectedFilters.value[key] = value;
        currentPage.value = 1;
        // Update route query
        navigateTo({
            query: { ...route.query, [key]: value, page: 1 },
        });
        refresh();
    };

    const changePage = (page: number) => {
        currentPage.value = page;
        navigateTo({
            query: { ...route.query, page },
        });
        refresh();
    };

    const handleAddToCart = async (productId: string, quantity: number) => {
        await cartStore.addToCart(productId, quantity);
    };

    // Watch for route changes
    watch(
        () => route.query,
        () => {
            refresh();
        },
    );
    </script>
    ```

#### 📋 Dynamic Sidebar Filter Component

- [ ] **Tạo components/product/CatalogSidebar.vue**

    ```vue
    <template>
        <div class="space-y-6">
            <!-- Reset Filters Button -->
            <button
                v-if="hasActiveFilters"
                @click="resetFilters"
                class="w-full text-sm text-blue-600 hover:underline mb-4"
            >
                Xóa tất cả bộ lọc
            </button>

            <!-- Price Filter -->
            <div class="border-b pb-6">
                <h3 class="font-semibold text-lg mb-4">Giá</h3>
                <div class="flex gap-2 mb-4">
                    <input
                        type="number"
                        v-model.number="priceRange[0]"
                        placeholder="Từ"
                        class="w-1/2 border px-2 py-1 text-sm rounded"
                    />
                    <input
                        type="number"
                        v-model.number="priceRange[1]"
                        placeholder="Đến"
                        class="w-1/2 border px-2 py-1 text-sm rounded"
                    />
                </div>
                <button
                    @click="applyPriceFilter"
                    class="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm w-full hover:bg-blue-700"
                >
                    Áp dụng
                </button>
            </div>

            <!-- Brand Filter -->
            <div class="border-b pb-6">
                <h3 class="font-semibold text-lg mb-4">Thương hiệu</h3>
                <div class="space-y-2">
                    <label
                        v-for="brand in brands"
                        :key="brand.id"
                        class="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                    >
                        <input
                            type="checkbox"
                            :value="brand.id"
                            v-model="selectedBrands"
                            @change="updateBrandFilter"
                            class="w-4 h-4 accent-blue-600"
                        />
                        <span class="text-sm">{{ brand.name }}</span>
                    </label>
                </div>
            </div>

            <!-- Attribute Filters (Dynamic) -->
            <div
                v-for="attr in dynamicAttributes"
                :key="attr.id"
                class="border-b pb-6"
            >
                <h3 class="font-semibold text-lg mb-4">{{ attr.label }}</h3>
                <div class="space-y-2 max-h-48 overflow-y-auto">
                    <label
                        v-for="val in attr.values"
                        :key="val"
                        class="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                    >
                        <input
                            type="checkbox"
                            :value="val"
                            v-model="selectedAttributes[attr.id]"
                            @change="updateAttributeFilter(attr.id)"
                            class="w-4 h-4 accent-blue-600"
                        />
                        <span class="text-sm">{{ val }}</span>
                    </label>
                </div>
            </div>
        </div>
    </template>

    <script setup lang="ts">
    const props = defineProps<{
        filters: any[];
        selected: Record<string, any>;
    }>();

    const emit = defineEmits<{
        update: [key: string, value: any];
    }>();

    const priceRange = ref([0, 100000000]);
    const selectedBrands = ref<string[]>([]);
    const selectedAttributes = ref<Record<string, string[]>>({});

    const brands = ref<any[]>([]);
    const dynamicAttributes = ref<any[]>([]);

    const hasActiveFilters = computed(
        () =>
            selectedBrands.value.length > 0 ||
            Object.values(selectedAttributes.value).some((v) => v.length > 0) ||
            props.selected.price,
    );

    const applyPriceFilter = () => {
        emit(
            "update",
            "price",
            `${priceRange.value[0]}-${priceRange.value[1]}`,
        );
    };

    const updateBrandFilter = () => {
        emit("update", "brand", selectedBrands.value.join(","));
    };

    const updateAttributeFilter = (attrId: string) => {
        emit(
            "update",
            `attr_${attrId}`,
            selectedAttributes.value[attrId].join(","),
        );
    };

    const resetFilters = () => {
        selectedBrands.value = [];
        selectedAttributes.value = {};
        priceRange.value = [0, 100000000];
        emit("update", "reset", true);
    };

    onMounted(async () => {
        // Load available filter options from API
        const filterData = await useProductApi().getFilterOptions();
        brands.value = filterData.brands;
        dynamicAttributes.value = filterData.attributes;
    });
    </script>
    ```

- [ ] **Tạo components/common/ProductCard.vue**
    - Image with lazy load
    - Product name, price, rating badge
    - "Thêm vào giỏ" button with quantity selector
    - Wishlist heart icon

- [ ] **Tạo components/common/SkeletonCard.vue**
    - Pulse animation for image and text
    - Simulate card layout

---

### Step 3: Product Detail Page - PDP (Storefront)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Component Architecture

- [ ] **Tạo pages/products/[id].vue**

    ```vue
    <template>
        <div class="min-h-screen bg-white">
            <!-- Breadcrumb -->
            <Breadcrumb
                :items="[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/category' },
                    { label: product?.name, current: true },
                ]"
            />

            <div class="grid grid-cols-2 gap-12 px-6 py-12">
                <!-- Gallery -->
                <ProductGallery :images="product?.images || []" />

                <!-- Details & Purchase -->
                <div class="space-y-6">
                    <div>
                        <h1 class="text-3xl font-bold">{{ product?.name }}</h1>
                        <p class="text-gray-600 mt-2">
                            SKU: {{ product?.sku }}
                        </p>
                        <Rating
                            :score="product?.rating || 0"
                            :count="product?.reviews_count || 0"
                        />
                    </div>

                    <div class="text-3xl font-bold text-red-600">
                        {{ formatPrice(product?.price) }}
                    </div>

                    <!-- Variant Selector -->
                    <VariantSelector
                        v-if="product?.variants?.length"
                        :product="product"
                        @select="handleVariantSelect"
                    />

                    <!-- Stock Indicator -->
                    <StockIndicator
                        :stock="selectedVariant?.stock || product?.stock"
                    />

                    <!-- Quantity Selector -->
                    <div class="flex items-center gap-4">
                        <span class="text-sm font-semibold">Số lượng:</span>
                        <div class="flex items-center border rounded-lg">
                            <button
                                @click="quantity--"
                                :disabled="quantity <= 1"
                                class="px-3 py-2 disabled:opacity-50"
                            >
                                −
                            </button>
                            <input
                                v-model.number="quantity"
                                type="number"
                                min="1"
                                class="w-12 text-center border-0 py-2"
                            />
                            <button
                                @click="quantity++"
                                :disabled="
                                    quantity >=
                                    (selectedVariant?.stock || product?.stock)
                                "
                                class="px-3 py-2 disabled:opacity-50"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-4">
                        <button
                            @click="addToCart"
                            :disabled="isOutOfStock"
                            :loading="isLoading"
                            class="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700"
                        >
                            {{ isOutOfStock ? "Hết hàng" : "Thêm vào giỏ" }}
                        </button>
                        <button
                            @click="toggleWishlist"
                            class="flex-1 border border-gray-300 py-3 rounded-lg hover:border-red-600 hover:text-red-600"
                        >
                            {{ isInWishlist ? "♥" : "♡" }} Yêu thích
                        </button>
                    </div>

                    <!-- Product Info -->
                    <div class="border-t pt-6 space-y-4">
                        <div>
                            <h3 class="font-semibold mb-2">Mô tả sản phẩm</h3>
                            <p class="text-gray-600">
                                {{ product?.description }}
                            </p>
                        </div>
                        <div v-if="product?.attributes">
                            <h3 class="font-semibold mb-3">
                                Thông số kỹ thuật
                            </h3>
                            <table class="w-full text-sm">
                                <tbody>
                                    <tr
                                        v-for="(
                                            value, key
                                        ) in product?.attributes"
                                        :key="key"
                                        class="border-b"
                                    >
                                        <td class="py-2 font-medium capitalize">
                                            {{ key }}
                                        </td>
                                        <td class="py-2 text-gray-600">
                                            {{ value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Related Products -->
            <div class="border-t px-6 py-12">
                <h2 class="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
                <div class="grid grid-cols-4 gap-6">
                    <ProductCard
                        v-for="related in relatedProducts"
                        :key="related.id"
                        :product="related"
                    />
                </div>
            </div>

            <!-- Reviews Section -->
            <div class="border-t px-6 py-12">
                <ProductReviews :product-id="product?.id" />
            </div>
        </div>
    </template>

    <script setup lang="ts">
    import { ref, computed } from "vue";

    const route = useRoute();
    const productApi = useProductApi();
    const cartStore = useCartStore();
    const uiStore = useUiStore();
    const wishlistStore = useWishlistStore();

    const { data: product } = await useAsyncData(
        `product-${route.params.id}`,
        () => productApi.getById(route.params.id as string),
    );

    const { data: relatedProducts } = await useAsyncData(
        `related-${route.params.id}`,
        () => productApi.getRelated(route.params.id as string, 4),
    );

    const selectedVariant = ref(null);
    const quantity = ref(1);
    const isLoading = ref(false);
    const isInWishlist = ref(false);

    const isOutOfStock = computed(() => {
        const stock = selectedVariant.value?.stock || product.value?.stock;
        return stock <= 0;
    });

    const handleVariantSelect = (variant: any) => {
        selectedVariant.value = variant;
        quantity.value = 1;
    };

    const addToCart = async () => {
        isLoading.value = true;
        try {
            await cartStore.addToCart(
                product.value.id,
                quantity.value,
                selectedVariant.value?.id,
            );
            uiStore.addToast("Thêm vào giỏ thành công", "success");
        } finally {
            isLoading.value = false;
        }
    };

    const toggleWishlist = async () => {
        if (isInWishlist.value) {
            await wishlistStore.remove(product.value.id);
            isInWishlist.value = false;
        } else {
            await wishlistStore.add(product.value.id);
            isInWishlist.value = true;
        }
    };

    // SEO Meta Tags
    useSeoMeta({
        title: product.value?.meta_title || product.value?.name,
        description: product.value?.meta_description,
        ogTitle: product.value?.name,
        ogDescription: product.value?.description,
        ogImage: product.value?.images?.[0]?.url,
    });

    // JSON-LD Schema
    useHead({
        script: [
            {
                type: "application/ld+json",
                children: JSON.stringify({
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    name: product.value?.name,
                    image: product.value?.images?.map((i: any) => i.url),
                    description: product.value?.description,
                    price: product.value?.price,
                    priceCurrency: "VND",
                    aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: product.value?.rating,
                        reviewCount: product.value?.reviews_count,
                    },
                }),
            },
        ],
    });
    </script>
    ```

- [ ] **Tạo components/product/ProductGallery.vue**

    ```vue
    <template>
        <div class="space-y-4">
            <!-- Main Image with Swiper -->
            <div class="relative">
                <img
                    :src="mainImage"
                    :alt="alt"
                    class="w-full rounded-lg cursor-zoom-in"
                    @click="openZoom"
                />
                <span
                    v-if="discount"
                    class="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                    -{{ discount }}%
                </span>
            </div>

            <!-- Thumbnail Gallery -->
            <div class="grid grid-cols-4 gap-2">
                <img
                    v-for="(img, idx) in images"
                    :key="idx"
                    :src="img.url"
                    :alt="`Product image ${idx + 1}`"
                    class="w-full h-20 object-cover rounded cursor-pointer border"
                    :class="{ 'border-blue-600': mainImage === img.url }"
                    @click="mainImage = img.url"
                />
            </div>

            <!-- Image Zoom Modal -->
            <ImageZoom
                v-if="showZoom"
                :image="mainImage"
                @close="showZoom = false"
            />
        </div>
    </template>

    <script setup lang="ts">
    const props = defineProps<{
        images: Array<{ url: string; alt?: string }>;
    }>();

    const mainImage = ref(props.images[0]?.url);
    const showZoom = ref(false);
    const discount = ref(0);

    const openZoom = () => {
        showZoom.value = true;
    };
    </script>
    ```

- [ ] **Tạo components/product/VariantSelector.vue**

    ```vue
    <template>
        <div class="space-y-4">
            <div
                v-for="attr in availableAttributes"
                :key="attr.name"
                class="border-b pb-4"
            >
                <h4 class="font-semibold mb-2 capitalize">{{ attr.name }}</h4>
                <div class="flex flex-wrap gap-2">
                    <button
                        v-for="value in attr.values"
                        :key="value"
                        @click="selectAttribute(attr.name, value)"
                        :class="[
                            'px-4 py-2 rounded border transition',
                            selectedAttributes[attr.name] === value
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-gray-300 hover:border-gray-400',
                        ]"
                    >
                        {{ value }}
                    </button>
                </div>
            </div>

            <!-- Price Override Display -->
            <div v-if="selectedVariant" class="bg-blue-50 p-4 rounded">
                <p class="text-sm text-gray-600">Biến thể được chọn:</p>
                <p class="font-semibold text-lg">
                    {{
                        formatPrice(selectedVariant.price_override || basePrice)
                    }}
                </p>
            </div>
        </div>
    </template>

    <script setup lang="ts">
    const props = defineProps<{
        product: any;
    }>();

    const emit = defineEmits<{
        select: [variant: any];
    }>();

    const selectedAttributes = ref<Record<string, string>>({});

    const availableAttributes = computed(() => {
        if (!props.product?.variants) return [];
        const attrs: any = {};
        props.product.variants.forEach((v: any) => {
            Object.entries(v.attributes || {}).forEach(([key, val]) => {
                if (!attrs[key]) attrs[key] = { name: key, values: new Set() };
                attrs[key].values.add(val);
            });
        });
        return Object.values(attrs).map((a: any) => ({
            ...a,
            values: Array.from(a.values),
        }));
    });

    const selectedVariant = computed(() => {
        return props.product?.variants.find((v: any) =>
            Object.entries(selectedAttributes.value).every(
                ([key, val]) => v.attributes?.[key] === val,
            ),
        );
    });

    const basePrice = computed(() => props.product?.price);

    const selectAttribute = (name: string, value: string) => {
        selectedAttributes.value[name] = value;
        if (selectedVariant.value) {
            emit("select", selectedVariant.value);
        }
    };
    </script>
    ```

- [ ] **Tạo components/product/StockIndicator.vue**

    ```vue
    <template>
        <div v-if="stock > 0" class="flex items-center gap-2">
            <span class="text-sm font-semibold">
                <span v-if="stock > 10" class="text-green-600">Còn hàng</span>
                <span v-else-if="stock > 0" class="text-orange-600">
                    Còn {{ stock }} sản phẩm
                </span>
            </span>
            <div class="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    class="h-full transition-all"
                    :class="stock > 10 ? 'bg-green-600' : 'bg-orange-600'"
                    :style="{ width: `${Math.min((stock / 20) * 100, 100)}%` }"
                />
            </div>
        </div>
        <div v-else class="text-red-600 font-semibold">Hết hàng</div>
    </template>

    <script setup lang="ts">
    const props = defineProps<{
        stock: number;
    }>();
    </script>
    ```

- [ ] **Tạo components/product/ProductReviews.vue**
    - List reviews with star rating, date, author
    - Review form with textarea, star rating selector
    - Pagination for reviews (5 per page)
    - Review sorting (newest, highest rated, helpful)

---

### Step 4: Trang Chủ (Homepage)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Homepage Layout

- [ ] **Tạo pages/index.vue (Home Page)**

    ```vue
    <template>
        <div class="min-h-screen">
            <!-- Hero Banner / Carousel -->
            <section
                class="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden"
            >
                <div class="absolute inset-0">
                    <img
                        v-if="currentSlide"
                        :src="currentSlide.image"
                        :alt="currentSlide.title"
                        class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-black bg-opacity-30" />
                </div>

                <!-- Hero Content -->
                <div
                    class="relative h-full flex items-center justify-center text-center text-white px-6"
                >
                    <div>
                        <h1 class="text-5xl font-bold mb-4">
                            {{ currentSlide?.title || "Welcome to Our Store" }}
                        </h1>
                        <p class="text-xl mb-6 max-w-lg mx-auto">
                            {{
                                currentSlide?.subtitle ||
                                "Discover amazing products"
                            }}
                        </p>
                        <NuxtLink
                            to="/category"
                            class="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100"
                        >
                            Mua sắm ngay
                        </NuxtLink>
                    </div>
                </div>

                <!-- Carousel Controls -->
                <div
                    class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10"
                >
                    <button
                        v-for="(slide, idx) in slides"
                        :key="idx"
                        @click="currentSlide = slide"
                        class="w-3 h-3 rounded-full transition-all"
                        :class="
                            slide === currentSlide
                                ? 'bg-white w-8'
                                : 'bg-white bg-opacity-50'
                        "
                    />
                </div>
            </section>

            <!-- Featured Categories -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-7xl mx-auto">
                    <h2 class="text-3xl font-bold mb-12 text-center">
                        Danh mục nổi bật
                    </h2>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <NuxtLink
                            v-for="category in featuredCategories"
                            :key="category.id"
                            :to="`/category/${category.slug}`"
                            class="group relative h-48 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                        >
                            <img
                                :src="category.image"
                                :alt="category.name"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div
                                class="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition flex items-center justify-center"
                            >
                                <h3
                                    class="text-white font-bold text-lg text-center"
                                >
                                    {{ category.name }}
                                </h3>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </section>

            <!-- Featured Products -->
            <section class="py-16 px-6 bg-gray-50">
                <div class="max-w-7xl mx-auto">
                    <div class="flex items-center justify-between mb-12">
                        <h2 class="text-3xl font-bold">Sản phẩm bán chạy</h2>
                        <NuxtLink
                            to="/category"
                            class="text-blue-600 hover:underline font-semibold"
                        >
                            Xem tất cả →
                        </NuxtLink>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <ProductCard
                            v-for="product in featuredProducts"
                            :key="product.id"
                            :product="product"
                        />
                    </div>
                </div>
            </section>

            <!-- Special Offer Banner -->
            <section
                class="py-16 px-6 bg-gradient-to-r from-orange-500 to-red-600"
            >
                <div class="max-w-4xl mx-auto text-center text-white">
                    <p
                        class="text-sm font-semibold mb-2 uppercase tracking-wide"
                    >
                        Limited Time Offer
                    </p>
                    <h2 class="text-4xl font-bold mb-4">
                        Giảm giá lên đến 50%
                    </h2>
                    <p class="text-lg mb-6 opacity-90">
                        Chỉ áp dụng cho các sản phẩm được chọn lựa. Hãy nhanh
                        tay!
                    </p>
                    <NuxtLink
                        to="/category?discount=true"
                        class="inline-block px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100"
                    >
                        Khám phá ưu đãi
                    </NuxtLink>
                </div>
            </section>

            <!-- Best Sellers / Trending -->
            <section class="py-16 px-6 bg-white">
                <div class="max-w-7xl mx-auto">
                    <h2 class="text-3xl font-bold mb-12 text-center">
                        🔥 Xu hướng hiện tại
                    </h2>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <ProductCard
                            v-for="product in trendingProducts"
                            :key="product.id"
                            :product="product"
                        />
                    </div>
                </div>
            </section>

            <!-- Testimonials / Reviews -->
            <section class="py-16 px-6 bg-gray-50">
                <div class="max-w-7xl mx-auto">
                    <h2 class="text-3xl font-bold mb-12 text-center">
                        Đánh giá từ khách hàng
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div
                            v-for="testimonial in testimonials"
                            :key="testimonial.id"
                            class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                        >
                            <!-- Stars -->
                            <div class="flex gap-1 mb-3">
                                <span v-for="i in testimonial.rating" :key="i"
                                    >⭐</span
                                >
                            </div>
                            <!-- Comment -->
                            <p class="text-gray-700 mb-4 italic">
                                "{{ testimonial.comment }}"
                            </p>
                            <!-- Author -->
                            <div class="flex items-center gap-3">
                                <img
                                    :src="testimonial.avatar"
                                    :alt="testimonial.name"
                                    class="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p class="font-semibold text-sm">
                                        {{ testimonial.name }}
                                    </p>
                                    <p class="text-xs text-gray-600">
                                        {{ testimonial.date }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Email Subscription -->
            <section class="py-16 px-6 bg-blue-600 text-white">
                <div class="max-w-2xl mx-auto text-center">
                    <h2 class="text-3xl font-bold mb-4">Đăng ký nhận tin</h2>
                    <p class="text-lg mb-6 opacity-90">
                        Nhận thông tin khuyến mãi và sản phẩm mới trước tiên
                    </p>
                    <form
                        @submit.prevent="subscribeNewsletter"
                        class="flex gap-2"
                    >
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Nhập email của bạn"
                            class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
                            required
                        />
                        <button
                            type="submit"
                            :disabled="isSubscribing"
                            class="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-50"
                        >
                            {{ isSubscribing ? "Đang gửi..." : "Đăng ký" }}
                        </button>
                    </form>
                    <p v-if="subscribeMessage" class="mt-3 text-sm">
                        {{ subscribeMessage }}
                    </p>
                </div>
            </section>

            <!-- Footer Info Boxes -->
            <section class="py-12 px-6 bg-white border-t">
                <div
                    class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div class="flex items-start gap-4">
                        <div class="text-3xl">🚚</div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                Giao hàng miễn phí
                            </h3>
                            <p class="text-sm text-gray-600">
                                Cho đơn hàng trên 500k đ
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4">
                        <div class="text-3xl">🔒</div>
                        <div>
                            <h3 class="font-semibold mb-1">
                                Thanh toán an toàn
                            </h3>
                            <p class="text-sm text-gray-600">
                                Nhiều phương thức thanh toán
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4">
                        <div class="text-3xl">↩️</div>
                        <div>
                            <h3 class="font-semibold mb-1">Trả hàng dễ dàng</h3>
                            <p class="text-sm text-gray-600">
                                30 ngày hoàn tiền 100%
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </template>

    <script setup lang="ts">
    const productApi = useProductApi();
    const categoryApi = useCategoryApi();

    // Hero Carousel
    const slides = ref([
        {
            id: 1,
            title: "Khám phá Bộ sưu tập Mùa Hè",
            subtitle: "Giảm giá đến 40%",
            image: "/banner/summer-collection.jpg",
        },
        {
            id: 2,
            title: "Sản phẩm mới nhất 2026",
            subtitle: "Công nghệ tiên tiến",
            image: "/banner/new-arrivals.jpg",
        },
        {
            id: 3,
            title: "Flash Sale Hôm nay",
            subtitle: "Mua ngay, chỉ 24 tiếng",
            image: "/banner/flash-sale.jpg",
        },
    ]);

    const currentSlide = ref(slides.value[0]);

    // Auto-rotate slides every 5 seconds
    onMounted(() => {
        setInterval(() => {
            const currentIdx = slides.value.indexOf(currentSlide.value);
            currentSlide.value =
                slides.value[(currentIdx + 1) % slides.value.length];
        }, 5000);
    });

    // Featured Categories
    const { data: featuredCategories } = await useAsyncData("categories", () =>
        categoryApi.getCategories({ featured: true, limit: 4 }),
    );

    // Featured Products
    const { data: featuredProducts } = await useAsyncData(
        "featured-products",
        () => productApi.getProducts({ featured: true, limit: 8 }),
    );

    // Trending Products
    const { data: trendingProducts } = await useAsyncData(
        "trending-products",
        () => productApi.getProducts({ sort: "-sales", limit: 8 }),
    );

    // Testimonials (mock data, can be fetched from API)
    const testimonials = ref([
        {
            id: 1,
            name: "Nguyễn Văn A",
            rating: 5,
            comment: "Sản phẩm chất lượng tốt, giao hàng nhanh!",
            avatar: "https://i.pravatar.cc/40?img=1",
            date: "2026-03-28",
        },
        {
            id: 2,
            name: "Trần Thị B",
            rating: 5,
            comment: "Dịch vụ khách hàng rất tuyệt vời. Sẽ mua lại!",
            avatar: "https://i.pravatar.cc/40?img=2",
            date: "2026-03-25",
        },
        {
            id: 3,
            name: "Lê Văn C",
            rating: 4,
            comment: "Giá cả hợp lý, chất lượng ổn.",
            avatar: "https://i.pravatar.cc/40?img=3",
            date: "2026-03-22",
        },
    ]);

    // Newsletter Subscription
    const email = ref("");
    const isSubscribing = ref(false);
    const subscribeMessage = ref("");

    const subscribeNewsletter = async () => {
        if (!email.value) return;

        isSubscribing.value = true;
        try {
            // Call API to subscribe
            await $fetch("/api/newsletter/subscribe", {
                method: "POST",
                body: { email: email.value },
            });
            subscribeMessage.value = "✓ Cảm ơn bạn đã đăng ký!";
            email.value = "";
            setTimeout(() => {
                subscribeMessage.value = "";
            }, 3000);
        } catch (error) {
            subscribeMessage.value = "❌ Có lỗi xảy ra. Vui lòng thử lại!";
        } finally {
            isSubscribing.value = false;
        }
    };

    // SEO Meta Tags
    useSeoMeta({
        title: "Trang chủ | Cửa hàng trực tuyến",
        description: "Khám phá sản phẩm chất lượng với giá tốt nhất",
        ogTitle: "Trang chủ | Cửa hàng trực tuyến",
        ogDescription: "Khám phá sản phẩm chất lượng với giá tốt nhất",
        ogImage: "/banner/og-image.jpg",
    });
    </script>
    ```

- [ ] **Tạo components/HomeHeroCarousel.vue** (Extract hero carousel into reusable component)

    ```vue
    <template>
        <div
            class="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden"
        >
            <div class="absolute inset-0">
                <img
                    :src="currentSlide.image"
                    :alt="currentSlide.title"
                    class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black bg-opacity-30" />
            </div>

            <!-- Content -->
            <div
                class="relative h-full flex items-center justify-center text-center text-white px-6"
            >
                <div>
                    <h1 class="text-5xl font-bold mb-4">
                        {{ currentSlide.title }}
                    </h1>
                    <p class="text-xl mb-6">{{ currentSlide.subtitle }}</p>
                    <slot name="action" />
                </div>
            </div>

            <!-- Navigation Dots -->
            <div
                class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10"
            >
                <button
                    v-for="(slide, idx) in slides"
                    :key="idx"
                    @click="goToSlide(idx)"
                    class="w-3 h-3 rounded-full transition-all"
                    :class="
                        idx === activeIndex
                            ? 'bg-white w-8'
                            : 'bg-white bg-opacity-50'
                    "
                />
            </div>
        </div>
    </template>

    <script setup lang="ts">
    import { ref, computed } from "vue";

    const props = defineProps<{
        slides: Array<{
            id: number;
            title: string;
            subtitle: string;
            image: string;
        }>;
        autoPlay?: boolean;
        autoPlayInterval?: number;
    }>();

    const activeIndex = ref(0);
    const currentSlide = computed(() => props.slides[activeIndex.value]);

    const goToSlide = (index: number) => {
        activeIndex.value = index;
    };

    const nextSlide = () => {
        activeIndex.value = (activeIndex.value + 1) % props.slides.length;
    };

    onMounted(() => {
        if (props.autoPlay) {
            setInterval(nextSlide, props.autoPlayInterval || 5000);
        }
    });
    </script>
    ```

- [ ] **Tạo components/TestimonialCard.vue** (Reusable testimonial component)

    ```vue
    <template>
        <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div class="flex gap-1 mb-3">
                <span v-for="i in testimonial.rating" :key="i">⭐</span>
            </div>
            <p class="text-gray-700 mb-4 italic line-clamp-3">
                "{{ testimonial.comment }}"
            </p>
            <div class="flex items-center gap-3">
                <img
                    :src="testimonial.avatar"
                    :alt="testimonial.name"
                    class="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p class="font-semibold text-sm">{{ testimonial.name }}</p>
                    <p class="text-xs text-gray-600">
                        {{ formatDate(testimonial.date) }}
                    </p>
                </div>
            </div>
        </div>
    </template>

    <script setup lang="ts">
    const props = defineProps<{
        testimonial: {
            id: number;
            name: string;
            rating: number;
            comment: string;
            avatar: string;
            date: string;
        };
    }>();
    </script>
    ```

#### 📋 API Endpoints (Backend requirement)

- [ ] **GET /api/categories** (featured categories for homepage)
    - Parameters: `featured=true`, `limit=4`
    - Response: `[{ id, name, image, slug }, ...]`

- [ ] **GET /api/products** (featured & trending products)
    - Parameters: `featured=true|sort=-sales`, `limit=8`
    - Response: `[{ id, name, price, image, rating }, ...]`

- [ ] **POST /api/newsletter/subscribe** (email subscription)
    - Request: `{ email: string }`
    - Response: `{ message: "Success" }`

#### 📋 Testing Checklist for Homepage

- [ ] Hero carousel auto-rotates every 5 seconds
- [ ] Clicking carousel dots changes slide
- [ ] Featured categories display with overlay text
- [ ] Product grid loads with correct images and prices
- [ ] Testimonials display with star ratings
- [ ] Newsletter subscription form works
- [ ] Email validation on subscribe input
- [ ] SEO meta tags set correctly (title, description, OG)
- [ ] Mobile responsive (1 column on mobile, 2+ on desktop)
- [ ] Image lazy loading works
- [ ] Page loads within 3 seconds (Lighthouse)

---

## 📌 GIAI ĐOẠN 3: GIAO DIỆN VẬN HÀNH KHO BÃI (WMS UI & Real-time)

### 🎯 Mục tiêu giai đoạn

Mang lại trải nghiệm thao tác tốc độ cao, không có độ trễ cho nhân viên kho. Theo dõi vị trí hàng, quét mã vạch, cập nhật tồn kho real-time.

### 📊 Tiến độ: [✓] 100% Chi tiết đầy đủ

---

### Step 1: Bản đồ Không gian Kho (Admin Filament)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Filament Page cho Warehouse Map

- [ ] **Tạo Filament Page (app/Filament/Pages/WarehouseMap.php)**

    ```php
    <?php
    namespace App\Filament\Pages;

    use Filament\Pages\Page;
    use Illuminate\Support\Collection;

    class WarehouseMap extends Page
    {
        protected static ?string $navigationIcon = 'heroicon-o-map';
        protected static ?string $navigationLabel = 'Warehouse Map';

        public Collection $bins;
        public ?int $selectedBinId = null;
        public Collection $binDetails;

        public function mount()
        {
            // Load warehouse bins from database
            $this->bins = Warehouse::with('bins.stocks')->first()?->bins ?? collect();
            $this->updateBinDetails();
        }

        public function selectBin(int $binId)
        {
            $this->selectedBinId = $binId;
            $this->updateBinDetails();
        }

        public function updateBinDetails()
        {
            if ($this->selectedBinId) {
                $bin = Bin::find($this->selectedBinId);
                $this->binDetails = collect([
                    'total_capacity' => $bin->capacity,
                    'used_capacity' => $bin->stocks->sum('quantity'),
                    'available_capacity' => $bin->capacity - $bin->stocks->sum('quantity'),
                    'items' => $bin->stocks,
                ]);
            }
        }

        public function exportBarcodes()
        {
            return response()->download(
                $this->generateBarcodePDF($this->selectedBinId)
            );
        }

        protected function getViewData(): array
        {
            return [
                'bins' => $this->bins,
                'selectedBin' => $this->selectedBinId ? Bin::find($this->selectedBinId) : null,
                'utilizationPercentage' => $this->selectedBinId
                    ? (Bin::find($this->selectedBinId)?->utilizationPercentage ?? 0)
                    : 0,
            ];
        }
    }
    ```

- [ ] **Tạo Blade view (resources/views/filament/pages/warehouse-map.blade.php)**

    ```blade
    <x-filament-widgets::widget>
        <div class="space-y-6">
            <!-- Warehouse Grid -->
            <div class="grid grid-cols-8 gap-2 p-4 bg-gray-50 rounded-lg">
                @foreach($bins as $bin)
                    <button
                        wire:click="selectBin({{ $bin->id }})"
                        class="aspect-square rounded border-2 transition
                            {{ $selectedBinId === $bin->id ?? 'border-blue-600 bg-blue-100' }}
                            {{ $bin->utilizationPercentage > 80 ? 'bg-red-100 border-red-300' : 'bg-green-100 border-green-300' }}"
                        title="{{ $bin->name }} - {{ $bin->utilizationPercentage }}% full"
                    >
                        <div class="text-xs font-semibold text-center">
                            <div>{{ $bin->name }}</div>
                            <div class="text-gray-600">{{ $bin->utilizationPercentage }}%</div>
                        </div>
                    </button>
                @endforeach
            </div>

            @if($selectedBin)
                <!-- Bin Details -->
                <div class="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                    <div>
                        <p class="text-sm text-gray-600">Total Capacity</p>
                        <p class="text-2xl font-bold">{{ $selectedBin->capacity }}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Used</p>
                        <p class="text-2xl font-bold text-orange-600">{{ $binDetails['used_capacity'] }}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Available</p>
                        <p class="text-2xl font-bold text-green-600">{{ $binDetails['available_capacity'] }}</p>
                    </div>
                </div>

                <!-- Items in Bin -->
                <div class="overflow-auto">
                    <table class="min-w-full text-sm">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="px-4 py-2 text-left">Product</th>
                                <th class="px-4 py-2 text-left">SKU</th>
                                <th class="px-4 py-2 text-right">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($binDetails['items'] as $stock)
                                <tr class="border-b">
                                    <td class="px-4 py-2">{{ $stock->product->name }}</td>
                                    <td class="px-4 py-2">{{ $stock->product->sku }}</td>
                                    <td class="px-4 py-2 text-right">{{ $stock->quantity }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <!-- Export Button -->
                <button
                    wire:click="exportBarcodes"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Export Barcodes (PDF)
                </button>
            @endif
        </div>
    </x-filament-widgets::widget>
    ```

---

### Step 2: Máy Quét Mã Vạch (Scanner App)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

#### 📋 Blade View cho Scanner Interface (Mobile-first)

- [ ] **Tạo resources/views/wms/scanner.blade.php**

    ```blade
    <div class="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <!-- Logo -->
        <div class="mb-8">
            <img src="/logo.png" alt="WMS" class="h-12">
        </div>

        <!-- Status Badge -->
        <div class="mb-6">
            <span class="px-4 py-2 rounded-full text-sm font-semibold
                {{ $mode === 'inbound' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800' }}"
            >
                {{ $mode === 'inbound' ? 'Nhập kho' : 'Xuất kho' }}
            </span>
        </div>

        <!-- Scanner Input (Auto-focus) -->
        <input
            id="barcode-input"
            type="text"
            class="w-full max-w-sm px-6 py-4 text-2xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Quét mã vạch..."
            autocomplete="off"
            autofocus
        >

        <!-- Feedback Zone -->
        <div id="feedback" class="mt-8 h-24 w-full max-w-sm">
            <!-- Success Message -->
            <div id="success" class="hidden text-center">
                <div class="text-6xl text-green-600 mb-2">✓</div>
                <p id="success-text" class="text-green-700 font-semibold"></p>
            </div>

            <!-- Error Message -->
            <div id="error" class="hidden text-center">
                <div class="text-6xl text-red-600 mb-2">✗</div>
                <p id="error-text" class="text-red-700 font-semibold"></p>
            </div>

            <!-- Loading -->
            <div id="loading" class="hidden text-center">
                <div class="inline-block animate-spin">⟳</div>
                <p class="mt-2 text-gray-600">Đang xử lý...</p>
            </div>
        </div>

        <!-- scanned Items Counter -->
        <div class="mt-8 text-center">
            <p class="text-gray-600 text-sm">Số sản phẩm đã quét</p>
            <p id="item-count" class="text-4xl font-bold text-blue-600">0</p>
        </div>

        <!-- Toggle Mode Button -->
        <button
            id="toggle-mode"
            class="mt-8 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
            Chuyển sang {{ $mode === 'inbound' ? 'Xuất kho' : 'Nhập kho' }}
        </button>
    </div>

    <script>
    let scannedCount = 0;
    let currentMode = '{{ $mode }}';

    document.getElementById('barcode-input').addEventListener('keydown', async (e) => {
        if (e.key !== 'Enter') return;

        const barcode = e.target.value.trim();
        if (!barcode) return;

        showLoading();

        try {
            const response = await fetch('/api/wms/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({
                    barcode,
                    mode: currentMode,
                })
            });

            const data = await response.json();

            if (response.ok) {
                scannedCount++;
                showSuccess(`${data.product_name} - ${data.quantity} cái`);
                document.getElementById('item-count').textContent = scannedCount;
            } else {
                showError(data.message || 'Barcode not found');
            }
        } catch (error) {
            showError('Network error: ' + error.message);
        }

        e.target.value = '';
        e.target.focus();
    });

    function showSuccess(message) {
        document.getElementById('success-text').textContent = message;
        document.getElementById('success').classList.remove('hidden');
        document.getElementById('error').classList.add('hidden');
        document.getElementById('loading').classList.add('hidden');
        setTimeout(() => document.getElementById('success').classList.add('hidden'), 2000);
    }

    function showError(message) {
        document.getElementById('error-text').textContent = message;
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('success').classList.add('hidden');
        document.getElementById('loading').classList.add('hidden');
        setTimeout(() => document.getElementById('error').classList.add('hidden'), 3000);
    }

    function showLoading() {
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('success').classList.add('hidden');
        document.getElementById('error').classList.add('hidden');
    }

    document.getElementById('toggle-mode').addEventListener('click', async () => {
        currentMode = currentMode === 'inbound' ? 'outbound' : 'inbound';
        window.location.reload();
    });
    </script>
    ```

- [ ] **Tạo API Endpoint (routes/api.php)**

    ```php
    Route::post('/wms/scan', [ScannerController::class, 'scan'])
        ->middleware('auth:sanctum')
        ->name('scanner.scan');
    ```

- [ ] **Tạo ScannerController (app/Http/Controllers/ScannerController.php)**

    ```php
    <?php
    class ScannerController extends Controller
    {
        public function scan(Request $request)
        {
            $validated = $request->validate([
                'barcode' => 'required|string',
                'mode' => 'required|in:inbound,outbound',
            ]);

            $product = Product::where('sku', $validated['barcode'])->firstOrFail();

            if ($validated['mode'] === 'inbound') {
                return $this->handleInbound($product);
            } else {
                return $this->handleOutbound($product);
            }
        }

        private function handleInbound(Product $product)
        {
            // Log stock inbound
            StockMovement::create([
                'product_id' => $product->id,
                'movement_type' => 'inbound',
                'quantity' => 1,
                'reference' => 'scanner',
                'created_by' => auth()->id(),
            ]);

            return response()->json([
                'product_name' => $product->name,
                'quantity' => 1,
            ]);
        }

        private function handleOutbound(Product $product)
        {
            // Validate stock availability
            $stock = Stock::where('product_id', $product->id)->first();
            if (!$stock || $stock->quantity < 1) {
                return response()->json(['message' => 'Không đủ hàng'], 400);
            }

            // Log stock outbound
            StockMovement::create([
                'product_id' => $product->id,
                'movement_type' => 'outbound',
                'quantity' => 1,
                'reference' => 'scanner',
                'created_by' => auth()->id(),
            ]);

            return response()->json([
                'product_name' => $product->name,
                'quantity' => 1,
            ]);
        }
    }
    ```

---

### Step 3: Real-time WebSocket Updates (Laravel Reverb)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

#### 📋 Setup Laravel Echo & WebSocket Broadcasting

- [ ] **Install & Configure Reverb**

    ```bash
    composer require laravel/reverb
    php artisan reverb:install
    ```

- [ ] **Create Broadcast Events (app/Events/)**

    ```php
    // app/Events/StockUpdated.php
    class StockUpdated implements ShouldBroadcast
    {
        use Dispatchable, InteractsWithSockets, SerializesModels;

        public Stock $stock;

        public function broadcastOn(): Channel
        {
            return new PrivateChannel('warehouse');
        }

        public function broadcastWith(): array
        {
            return [
                'product_id' => $this->stock->product_id,
                'quantity' => $this->stock->quantity,
                'bin_id' => $this->stock->bin_id,
            ];
        }
    }

    // app/Events/PickListCreated.php
    class PickListCreated implements ShouldBroadcast
    {
        use Dispatchable, InteractsWithSockets, SerializesModels;

        public PickList $pickList;

        public function broadcastOn(): Channel
        {
            return new Channel('warehouse-notifications');
        }

        public function broadcastWith(): array
        {
            return [
                'pick_list_id' => $this->pickList->id,
                'order_count' => $this->pickList->items()->count(),
            ];
        }
    }
    ```

- [ ] **Create Nuxt 3 Echo Plugin (storefront/plugins/echo.client.ts)**

    ```typescript
    import Echo from "laravel-echo";
    import Pusher from "pusher-js";

    export default defineNuxtPlugin(() => {
        const config = useRuntimeConfig();

        window.Pusher = Pusher;

        const echo = new Echo({
            broadcaster: "reverb",
            key: config.public.reverb.key,
            wsHost: config.public.reverb.host,
            wsPort: config.public.reverb.port,
            forceTLS: location.protocol === "https:",
            encrypted: true,
        });

        // Listen for stock updates (WMS staff only)
        echo.private("warehouse").listen("StockUpdated", (e: any) => {
            console.log("Stock updated:", e);
            // Trigger store update
            const productStore = useProductStore();
            productStore.refreshProduct(e.product_id);
        });

        // Listen for pick list notifications
        echo.channel("warehouse-notifications").listen(
            "PickListCreated",
            (e: any) => {
                const uiStore = useUiStore();
                uiStore.addToast(
                    `New Pick List #${e.pick_list_id} (${e.order_count} orders)`,
                    "info",
                );
            },
        );

        return {
            provide: {
                echo,
            },
        };
    });
    ```

- [ ] **Publish Events when Stock Changes**

    ```php
    // In StockService.php or Model Observer
    public function updateStock(Stock $stock, int $quantity)
    {
        $stock->update(['quantity' => $quantity]);

        // Broadcast to warehouse staff
        broadcast(new StockUpdated($stock));
    }
    ```

- [ ] **Update WMS Warehouse Map to Listen for Real-time Changes**
    - Re-fetch bin data every 5 seconds with WebSocket updates
    - Highlight bin cells that have new stock movements
    - Show toast notifications for stock updates

#### 📋 Testing Checklist for GIAI ĐOẠN 3

- [ ] Warehouse map loads all bins with correct utilization percentage
- [ ] Clicking bin shows detailed items and capacity
- [ ] Barcode scanner accepts input and processes successfully
- [ ] Scanner toggles between inbound/outbound modes
- [ ] WebSocket receives stock updates in real-time (max 100ms latency)
- [ ] UI updates reflect new stock quantities immediately
- [ ] Multiple concurrent scans handled correctly (no race conditions)

---

## 📌 GIAI ĐOẠN 4: LUỒNG CHUYỂN ĐỔI DOANH THU (Cart, Checkout & OMS UI)

### 🎯 Mục tiêu giai đoạn

Tối ưu hóa tỷ lệ chuyển đổi (CR) bằng UI giỏ hàng và thanh toán mượt mà nhất.

### 📊 Tiến độ: [✓] 100% Chi tiết đầy đủ

---

### Step 1: Giỏ hàng Slide-over & Cart Engine

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

#### 📋 Tạo components/cart/SlideOverCart.vue

- [ ] **Slide-over Dialog Implementation**

    ```vue
    <template>
        <Teleport to="body">
            <TransitionRoot :show="isOpen" as="template">
                <!-- Backdrop -->
                <Dialog as="div" @close="close" class="relative z-50">
                    <TransitionChild
                        as="template"
                        enter="ease-in-out duration-500"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="ease-in-out duration-500"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <div class="fixed inset-0 bg-black bg-opacity-50" />
                    </TransitionChild>

                    <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <TransitionChild
                            as="template"
                            enter="transform transition ease-in-out duration-500"
                            enter-from="translate-x-full"
                            enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500"
                            leave-from="translate-x-0"
                            leave-to="translate-x-full"
                        >
                            <DialogPanel
                                class="w-screen max-w-md bg-white shadow-xl flex flex-col"
                            >
                                <!-- Header -->
                                <div
                                    class="flex items-center justify-between p-6 border-b"
                                >
                                    <h2 class="text-lg font-semibold">
                                        Giỏ hàng
                                    </h2>
                                    <button
                                        @click="close"
                                        class="text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <!-- Items List -->
                                <div
                                    v-if="items.length > 0"
                                    class="flex-1 overflow-y-auto p-6 space-y-4"
                                >
                                    <CartItem
                                        v-for="item in items"
                                        :key="item.id"
                                        :item="item"
                                        @update-quantity="updateQuantity"
                                        @remove="removeItem"
                                    />
                                </div>

                                <!-- Empty State -->
                                <div
                                    v-else
                                    class="flex-1 flex items-center justify-center text-gray-500"
                                >
                                    <div class="text-center">
                                        <p class="mb-4 text-lg">
                                            Giỏ hàng trống
                                        </p>
                                        <NuxtLink
                                            to="/category"
                                            class="text-blue-600 hover:underline"
                                        >
                                            Tiếp tục mua sắm
                                        </NuxtLink>
                                    </div>
                                </div>

                                <!-- Coupon Input -->
                                <div
                                    v-if="items.length > 0"
                                    class="px-6 py-4 border-t"
                                >
                                    <div class="flex gap-2">
                                        <input
                                            v-model="couponCode"
                                            type="text"
                                            placeholder="Mã khuyến mãi"
                                            class="flex-1 px-3 py-2 border rounded-lg text-sm"
                                        />
                                        <button
                                            @click="applyCoupon"
                                            :disabled="!couponCode"
                                            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
                                        >
                                            Áp dụng
                                        </button>
                                    </div>
                                    <p
                                        v-if="appliedCoupon"
                                        class="text-sm text-green-600 mt-2"
                                    >
                                        ✓ Đã áp dụng: {{ appliedCoupon.code }}
                                    </p>
                                </div>

                                <!-- Summary -->
                                <div
                                    v-if="items.length > 0"
                                    class="px-6 py-4 border-t space-y-2"
                                >
                                    <div class="flex justify-between text-sm">
                                        <span>Tạm tính:</span>
                                        <span>{{ formatPrice(subtotal) }}</span>
                                    </div>
                                    <div class="flex justify-between text-sm">
                                        <span>Shipping:</span>
                                        <span>{{
                                            formatPrice(shippingFee)
                                        }}</span>
                                    </div>
                                    <div
                                        v-if="discount > 0"
                                        class="flex justify-between text-sm text-green-600"
                                    >
                                        <span>Giảm giá:</span>
                                        <span
                                            >-{{ formatPrice(discount) }}</span
                                        >
                                    </div>
                                    <div
                                        class="flex justify-between text-lg font-bold pt-2 border-t"
                                    >
                                        <span>Tổng cộng:</span>
                                        <span>{{ formatPrice(total) }}</span>
                                    </div>
                                </div>

                                <!-- Footer -->
                                <div
                                    v-if="items.length > 0"
                                    class="px-6 py-4 border-t space-y-3"
                                >
                                    <NuxtLink
                                        to="/checkout/auth"
                                        @click="close"
                                        class="w-full block text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                                    >
                                        Thanh toán
                                    </NuxtLink>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </TransitionRoot>
        </Teleport>
    </template>

    <script setup lang="ts">
    import { computed } from "vue";
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
    } from "@headlessui/vue";

    const cartStore = useCartStore();
    const uiStore = useUiStore();
    const cartApi = useCartApi();

    const isOpen = computed(() => uiStore.isCartOpen);
    const items = computed(() => cartStore.items);
    const subtotal = computed(() => cartStore.total);
    const discount = computed(() => cartStore.discount);
    const appliedCoupon = computed(() => cartStore.coupon);
    const shippingFee = ref(0);
    const couponCode = ref("");

    const total = computed(
        () => subtotal.value + shippingFee.value - discount.value,
    );

    const close = () => {
        uiStore.toggleCart();
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        await cartStore.updateQuantity(itemId, quantity);
    };

    const removeItem = async (itemId: string) => {
        await cartStore.removeItem(itemId);
    };

    const applyCoupon = async () => {
        if (!couponCode.value) return;
        try {
            await cartStore.applyCoupon(couponCode.value);
            couponCode.value = "";
        } catch (error) {
            uiStore.addToast("Mã khuyến mãi không hợp lệ", "error");
        }
    };
    </script>
    ```

- [ ] **Tạo components/cart/CartItem.vue**

    ```vue
    <template>
        <div class="flex gap-4 pb-4 border-b">
            <!-- Product Image -->
            <img
                :src="item.product.image"
                :alt="item.product.name"
                class="w-20 h-20 object-cover rounded-lg"
            />

            <!-- Details -->
            <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-sm truncate">
                    {{ item.product.name }}
                </h3>
                <p class="text-xs text-gray-600 mt-1">
                    {{
                        item.variant
                            ? `${item.variant.color} - ${item.variant.size}`
                            : "N/A"
                    }}
                </p>

                <!-- Quantity Selector -->
                <div class="flex items-center gap-2 mt-3">
                    <button
                        @click="quantity--"
                        :disabled="quantity <= 1"
                        class="px-2 py-1 border rounded text-sm disabled:opacity-50"
                    >
                        −
                    </button>
                    <span class="w-8 text-center text-sm">{{ quantity }}</span>
                    <button
                        @click="quantity++"
                        class="px-2 py-1 border rounded text-sm"
                    >
                        +
                    </button>
                </div>
            </div>

            <!-- Price & Actions -->
            <div class="text-right">
                <p class="font-semibold">{{ formatPrice(item.subtotal) }}</p>
                <button
                    @click="remove"
                    class="text-red-600 text-xs mt-2 hover:underline"
                >
                    Xóa
                </button>
            </div>
        </div>
    </template>

    <script setup lang="ts">
    import { ref, watch } from "vue";

    const props = defineProps<{
        item: any;
    }>();

    const emit = defineEmits<{
        "update-quantity": [itemId: string, quantity: number];
        remove: [itemId: string];
    }>();

    const quantity = ref(props.item.quantity);

    const remove = () => {
        emit("remove", props.item.id);
    };

    watch(quantity, (newQty) => {
        if (newQty !== props.item.quantity) {
            emit("update-quantity", props.item.id, newQty);
        }
    });
    </script>
    ```

---

### Step 2: Multi-step Checkout Flow

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 4 ngày

#### 📋 Routing & Store Management

- [ ] **Routing structure (pages/checkout/)**

    ```
    /checkout/auth       → Login/Register form
    /checkout/shipping   → Address & method selection
    /checkout/payment    → Payment method (COD, Card, e-wallet)
    /checkout/review     → Order review
    /checkout/success    → Order confirmation
    ```

- [ ] **Tạo stores/checkout.ts**

    ```typescript
    export const useCheckoutStore = defineStore("checkout", () => {
        const currentStep = ref<
            "auth" | "shipping" | "payment" | "review" | "success"
        >("auth");
        const cart = ref(null);
        const customer = ref({
            email: "",
            phone: "",
            fullName: "",
        });
        const address = ref({
            province: "",
            district: "",
            ward: "",
            street: "",
            isDefault: false,
        });
        const shippingMethod = ref<"standard" | "express" | "overnight">(
            "standard",
        );
        const paymentMethod = ref<"cod" | "stripe" | "zalopay">("cod");
        const notes = ref("");
        const order = ref(null);
        const isSubmitting = ref(false);

        const nextStep = () => {
            const steps = ["auth", "shipping", "payment", "review", "success"];
            const currentIdx = steps.indexOf(currentStep.value);
            if (currentIdx < steps.length - 1) {
                currentStep.value = steps[currentIdx + 1] as any;
            }
        };

        const previousStep = () => {
            const steps = ["auth", "shipping", "payment", "review", "success"];
            const currentIdx = steps.indexOf(currentStep.value);
            if (currentIdx > 0) {
                currentStep.value = steps[currentIdx - 1] as any;
            }
        };

        const submitOrder = async () => {
            isSubmitting.value = true;
            try {
                const orderApi = useOrderApi();
                const response = await orderApi.createOrder({
                    customer: customer.value,
                    address: address.value,
                    shipping_method: shippingMethod.value,
                    payment_method: paymentMethod.value,
                    notes: notes.value,
                });
                order.value = response.data;
                nextStep();
            } finally {
                isSubmitting.value = false;
            }
        };

        return {
            currentStep: readonly(currentStep),
            customer,
            address,
            shippingMethod,
            paymentMethod,
            notes,
            order: readonly(order),
            isSubmitting: readonly(isSubmitting),
            nextStep,
            previousStep,
            submitOrder,
        };
    });
    ```

- [ ] **Tạo pages/checkout/auth.vue** (Login/Register)

    ```vue
    <template>
        <div class="max-w-md mx-auto py-12">
            <h1 class="text-2xl font-bold mb-6">Đăng nhập để thanh toán</h1>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-2"
                        >Email</label
                    >
                    <input
                        v-model="email"
                        type="email"
                        class="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label class="block text-sm font-semibold mb-2"
                        >Mật khẩu</label
                    >
                    <input
                        v-model="password"
                        type="password"
                        class="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <button
                    @click="login"
                    :disabled="isLoading"
                    class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {{ isLoading ? "Đang tải..." : "Tiếp tục" }}
                </button>

                <div class="text-center">
                    <p class="text-sm">
                        Chưa có tài khoản?
                        <button
                            @click="showRegister = true"
                            class="text-blue-600 hover:underline"
                        >
                            Đăng ký ở đây
                        </button>
                    </p>
                </div>
            </div>

            <!-- Guest Checkout Option -->
            <div class="mt-8 pt-8 border-t text-center">
                <button
                    @click="continueAsGuest"
                    class="text-blue-600 hover:underline text-sm"
                >
                    Hoặc thanh toán không đăng ký
                </button>
            </div>
        </div>
    </template>

    <script setup lang="ts">
    const authApi = useAuthApi();
    const authStore = useAuthStore();
    const checkoutStore = useCheckoutStore();
    const uiStore = useUiStore();

    const email = ref("");
    const password = ref("");
    const isLoading = ref(false);
    const showRegister = ref(false);

    const login = async () => {
        isLoading.value = true;
        try {
            await authStore.login(email.value, password.value);
            checkoutStore.nextStep();
        } catch (error) {
            uiStore.addToast("Đăng nhập thất bại", "error");
        } finally {
            isLoading.value = false;
        }
    };

    const continueAsGuest = () => {
        checkoutStore.customer.email = "";
        checkoutStore.nextStep();
    };
    </script>
    ```

- [ ] **Tạo pages/checkout/shipping.vue** (Address & Method)

    ```vue
    <template>
        <div class="max-w-2xl mx-auto py-12 space-y-8">
            <h1 class="text-2xl font-bold">Địa chỉ giao hàng</h1>

            <div class="grid grid-cols-2 gap-4">
                <input
                    v-model="checkoutStore.customer.fullName"
                    placeholder="Họ tên"
                    class="col-span-2 px-4 py-2 border rounded-lg"
                />
                <input
                    v-model="checkoutStore.customer.phone"
                    placeholder="Số điện thoại"
                    class="px-4 py-2 border rounded-lg"
                />
                <input
                    v-model="checkoutStore.customer.email"
                    placeholder="Email"
                    type="email"
                    class="px-4 py-2 border rounded-lg"
                />

                <select
                    v-model="checkoutStore.address.province"
                    class="px-4 py-2 border rounded-lg"
                >
                    <option value="">Chọn Tỉnh/Thành</option>
                    <option
                        v-for="prov in provinces"
                        :key="prov.id"
                        :value="prov.id"
                    >
                        {{ prov.name }}
                    </option>
                </select>

                <select
                    v-model="checkoutStore.address.district"
                    class="px-4 py-2 border rounded-lg"
                >
                    <option value="">Chọn Quận/Huyện</option>
                    <option
                        v-for="dist in districts"
                        :key="dist.id"
                        :value="dist.id"
                    >
                        {{ dist.name }}
                    </option>
                </select>

                <input
                    v-model="checkoutStore.address.street"
                    placeholder="Số nhà, tên đường"
                    class="col-span-2 px-4 py-2 border rounded-lg"
                />
            </div>

            <!-- Shipping Method -->
            <div class="space-y-3">
                <h2 class="font-semibold">Phương thức vận chuyển</h2>
                <label
                    class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer"
                >
                    <input
                        v-model="checkoutStore.shippingMethod"
                        type="radio"
                        value="standard"
                    />
                    <span>Tiêu chuẩn (3-5 ngày): 30.000 đ</span>
                </label>
                <label
                    class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer"
                >
                    <input
                        v-model="checkoutStore.shippingMethod"
                        type="radio"
                        value="express"
                    />
                    <span>Express (1-2 ngày): 50.000 đ</span>
                </label>
            </div>

            <!-- Navigation -->
            <div class="flex gap-4 pt-6">
                <button
                    @click="checkoutStore.previousStep()"
                    class="px-6 py-2 border rounded-lg"
                >
                    Quay lại
                </button>
                <button
                    @click="checkoutStore.nextStep()"
                    class="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Tiếp tục
                </button>
            </div>
        </div>
    </template>

    <script setup lang="ts">
    const checkoutStore = useCheckoutStore();
    const provinces = ref([]);
    const districts = ref([]);

    onMounted(async () => {
        // Load provinces from API
        const response = await fetch("/api/provinces");
        provinces.value = await response.json();
    });
    </script>
    ```

- [ ] **Tạo pages/checkout/payment.vue** (Payment Method)
- [ ] **Tạo pages/checkout/review.vue** (Order Review)
- [ ] **Tạo pages/checkout/success.vue** (Success Page with Order #)

---

### Step 3: Order Management (Admin Filament)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Filament OrderResource

- [ ] **Tạo app/Filament/Resources/OrderResource.php**

    ```php
    public static function form(Form $form): Form {
        return $form->schema([
            Tabs::make('Order Details')->tabs([
                Tab::make('Overview')->schema([
                    TextInput::make('order_number')->disabled(),
                    Select::make('status')
                        ->options([
                            'pending' => 'Pending',
                            'approved' => 'Approved',
                            'picking' => 'Picking',
                            'shipped' => 'Shipped',
                            'delivered' => 'Delivered',
                        ])
                        ->required(),
                    Select::make('customer_id')
                        ->relationship('customer', 'name')
                        ->required(),
                    TextInput::make('total_amount')->disabled(),
                ]),

                Tab::make('Items')->schema([
                    Table::make('items')
                        ->relationship('items')
                        ->columns([
                            TextColumn::make('product.name'),
                            TextColumn::make('quantity'),
                            TextColumn::make('price')->money('vnd'),
                        ]),
                ]),

                Tab::make('Shipping')->schema([
                    TextInput::make('shipping_address'),
                    TextInput::make('tracking_number')->nullable(),
                    Select::make('carrier')
                        ->options(['ghtk' => 'GHTK', 'viettel' => 'Viettel'])
                        ->nullable(),
                ]),
            ])
        ]);
    }

    public static function table(Table $table): Table {
        return $table
            ->columns([
                TextColumn::make('order_number')->searchable()->sortable(),
                TextColumn::make('customer.name')->searchable(),
                TextColumn::make('status')->badge(),
                TextColumn::make('total_amount')->money('vnd')->sortable(),
                TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options(OrderStatus::class),
            ]);
    }
    ```

- [ ] **Tạo Filament Page cho Order Kanban (Drag-drop)**

    ```php
    class OrderKanban extends Page
    {
        public Collection $orders;

        public function mount()
        {
            $this->orders = Order::with('items')
                ->get()
                ->groupBy('status');
        }

        public function moveOrder(int $orderId, string $newStatus)
        {
            Order::find($orderId)->update(['status' => $newStatus]);
            $this->mount();
        }
    }
    ```

- [ ] **Tạo component OrderTimeline** (Show order history: created → approved → picking → shipped → delivered)

---

## 📌 GIAI ĐOẠN 5: VẬN CHUYỂN, TÀI CHÍNH & PHÂN QUYỀN (TMS, Finance & IAM)

### 🎯 Mục tiêu giai đoạn

Hiển thị dữ liệu phức tạp (báo cáo, vận trình) một cách trực quan, bảo mật View theo Role.

### 📊 Tiến độ: [✓] 100% Chi tiết đầy đủ

---

### Step 1: Tracking Map (Storefront & Admin)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

#### 📋 Order Tracking Page

- [ ] **Tạo pages/account/orders/[id]/tracking.vue**

    ```vue
    <template>
        <div class="max-w-3xl mx-auto py-12">
            <div class="mb-8">
                <h1 class="text-2xl font-bold">
                    Vận trình đơn #{{ order.number }}
                </h1>
                <p class="text-gray-600 mt-1">{{ order.status }}</p>
            </div>

            <div class="grid grid-cols-2 gap-6 mb-8">
                <!-- Status Stepper -->
                <div class="space-y-4">
                    <h2 class="font-semibold mb-4">Trạng thái đơn</h2>
                    <div class="space-y-3">
                        <div
                            v-for="(step, idx) in steps"
                            :key="step.id"
                            class="flex gap-4"
                        >
                            <!-- Timeline Dot -->
                            <div class="flex flex-col items-center">
                                <div
                                    class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                    :class="
                                        idx <= currentStepIndex
                                            ? 'bg-blue-600'
                                            : 'bg-gray-300'
                                    "
                                >
                                    {{ idx + 1 }}
                                </div>
                                <div
                                    v-if="idx < steps.length - 1"
                                    class="w-1 h-8 mt-1"
                                    :class="
                                        idx < currentStepIndex
                                            ? 'bg-blue-600'
                                            : 'bg-gray-300'
                                    "
                                />
                            </div>

                            <!-- Step Info -->
                            <div class="pb-6">
                                <h3 class="font-semibold">{{ step.name }}</h3>
                                <p class="text-sm text-gray-600">
                                    {{
                                        step.date
                                            ? formatDate(step.date)
                                            : "Chờ xử lý"
                                    }}
                                </p>
                                <p
                                    v-if="step.description"
                                    class="text-sm text-gray-600 mt-1"
                                >
                                    {{ step.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Map (Google Maps) -->
                <div class="border rounded-lg overflow-hidden h-96">
                    <div
                        id="map"
                        style="width: 100%; height: 100%"
                        class="bg-gray-100 flex items-center justify-center"
                    >
                        <p class="text-gray-600">Bản đồ vận chuyển</p>
                    </div>
                </div>
            </div>

            <!-- Shipment Details -->
            <div class="bg-gray-50 p-6 rounded-lg space-y-4">
                <h2 class="font-semibold">Thông tin vận chuyển</h2>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p class="text-gray-600">Mã vận đơn</p>
                        <p class="font-semibold">{{ order.tracking_number }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">Nhà vận chuyển</p>
                        <p class="font-semibold">{{ order.carrier }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">Người gửi</p>
                        <p class="font-semibold">{{ order.sender_name }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">Người nhận</p>
                        <p class="font-semibold">{{ order.customer_name }}</p>
                    </div>
                </div>

                <!-- Contact Info -->
                <div class="pt-4 border-t space-y-2">
                    <p class="text-sm font-semibold">Liên hệ với tài xế</p>
                    <div v-if="order.driver_phone" class="flex gap-3">
                        <a
                            :href="`tel:${order.driver_phone}`"
                            class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                            📱 Gọi
                        </a>
                        <a
                            :href="`sms:${order.driver_phone}`"
                            class="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                            💬 Tin nhắn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <script setup lang="ts">
    const route = useRoute();
    const orderApi = useOrderApi();

    const { data: order } = await useAsyncData(`order-${route.params.id}`, () =>
        orderApi.getOrderTracking(route.params.id as string),
    );

    const steps = computed(() => [
        { id: "pending", name: "Đơn mới", date: order.value?.created_at },
        { id: "approved", name: "Xác nhận", date: order.value?.approved_at },
        { id: "picking", name: "Đang lấy hàng", date: order.value?.picking_at },
        { id: "shipped", name: "Đang giao", date: order.value?.shipped_at },
        { id: "delivered", name: "Đã giao", date: order.value?.delivered_at },
    ]);

    const currentStepIndex = computed(() => {
        const statuses = [
            "pending",
            "approved",
            "picking",
            "shipped",
            "delivered",
        ];
        return statuses.indexOf(order.value?.status);
    });

    onMounted(() => {
        // Initialize Google Maps
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: { lat: 21.0285, lng: 105.8542 }, // Hanoi center
        });

        // Add marker for current location
        if (order.value?.location) {
            new google.maps.Marker({
                position: order.value.location,
                map: map,
                title: order.value.customer_name,
            });
        }
    });
    </script>
    ```

---

### Step 2: Finance Dashboard (Admin)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Filament Dashboard Page

- [ ] **Tạo app/Filament/Pages/FinanceDashboard.php**

    ```php
    class FinanceDashboard extends Dashboard
    {
        protected static string $title = 'Finance Overview';

        public function getWidgets(): array
        {
            return [
                RevenueChart::class,
                PaymentStatusTable::class,
                CancellationRateChart::class,
                TopProductsByRevenue::class,
            ];
        }
    }
    ```

- [ ] **Tạo widgets/RevenueChart.php** (ApexCharts integration)

    ```php
    class RevenueChart extends ChartWidget
    {
        protected function getData(): array
        {
            $data = Order::whereDate('created_at', '>=', now()->subDays(30))
                ->selectRaw('DATE(created_at) as date, SUM(total_amount) as revenue')
                ->groupBy('date')
                ->get();

            return [
                'datasets' => [
                    [
                        'label' => 'Revenue',
                        'data' => $data->pluck('revenue'),
                        'borderColor' => '#2563eb',
                        'backgroundColor' => 'rgba(37, 99, 235, 0.1)',
                    ],
                ],
                'labels' => $data->pluck('date'),
            ];
        }

        protected function getType(): string
        {
            return 'line';
        }
    }
    ```

- [ ] **Tạo resources/views/filament/tables/payments-table.blade.php**

    ```blade
    <div class="space-y-4">
        <div class="grid grid-cols-3 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">Total Revenue (30d)</p>
                <p class="text-2xl font-bold text-blue-600">{{ $totalRevenue }}</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">Successful Orders</p>
                <p class="text-2xl font-bold text-green-600">{{ $successfulOrders }}</p>
            </div>
            <div class="bg-red-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">Cancelled Orders</p>
                <p class="text-2xl font-bold text-red-600">{{ $cancelledOrders }}</p>
            </div>
        </div>

        <!-- Payment Status Table -->
        <table class="min-w-full text-sm">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-4 py-3 text-left">Order #</th>
                    <th class="px-4 py-3 text-left">Customer</th>
                    <th class="px-4 py-3 text-right">Amount</th>
                    <th class="px-4 py-3 text-left">Status</th>
                    <th class="px-4 py-3 text-left">Payment</th>
                </tr>
            </thead>
            <tbody>
                @foreach($invoices as $invoice)
                    <tr class="border-b">
                        <td class="px-4 py-3">{{ $invoice->order_number }}</td>
                        <td class="px-4 py-3">{{ $invoice->customer_name }}</td>
                        <td class="px-4 py-3 text-right font-semibold">
                            {{ $invoice->amount }}
                        </td>
                        <td class="px-4 py-3">
                            <span class="px-2 py-1 rounded-full text-xs font-semibold
                                {{ $invoice->status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }}"
                            >
                                {{ $invoice->status }}
                            </span>
                        </td>
                        <td class="px-4 py-3">{{ $invoice->payment_method }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <!-- Export Button -->
        <button class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            📥 Export Report (PDF/CSV)
        </button>
    </div>
    ```

- [ ] **Tạo Cancellation Rate Chart**

    ```php
    class CancellationRateChart extends ChartWidget
    {
        protected function getData(): array
        {
            $cancelled = Order::where('status', 'cancelled')
                ->whereDate('created_at', '>=', now()->subDays(30))
                ->count();

            $total = Order::whereDate('created_at', '>=', now()->subDays(30))
                ->count();

            return [
                'datasets' => [
                    [
                        'data' => [$cancelled, $total - $cancelled],
                        'backgroundColor' => ['#ef4444', '#10b981'],
                    ],
                ],
                'labels' => ['Cancelled', 'Completed'],
            ];
        }

        protected function getType(): string
        {
            return 'doughnut';
        }
    }
    ```

---

### Step 3: RBAC UI Layer

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

#### 📋 Vue Custom Directive `v-can`

- [ ] **Tạo plugins/permissions.ts**

    ```typescript
    export default defineNuxtPlugin((nuxtApp) => {
        nuxtApp.vueApp.directive("can", (el, binding) => {
            const authStore = useAuthStore();
            const permission = binding.value;

            if (!authStore.user?.permissions?.includes(permission)) {
                el.style.display = "none";
            }
        });
    });
    ```

- [ ] **Tạo composable usePermission()**

    ```typescript
    export const usePermission = () => {
        const authStore = useAuthStore();

        return {
            can: (permission: string) =>
                authStore.user?.permissions?.includes(permission) ?? false,
            cannot: (permission: string) =>
                !authStore.user?.permissions?.includes(permission) ?? true,
            hasRole: (role: string) =>
                authStore.user?.roles?.includes(role) ?? false,
        };
    };
    ```

- [ ] **Filament Shield Integration**

    ```php
    // In Resource classes
    public static function canCreate(): bool
    {
        return auth()->user()->can('create_products');
    }

    public static function canEdit(Model $record): bool
    {
        return auth()->user()->can('edit_products');
    }

    public static function canDelete(Model $record): bool
    {
        return auth()->user()->can('delete_products');
    }
    ```

- [ ] **Usage in Templates**

    ```vue
    <!-- Hide button if user doesn't have permission -->
    <button v-can="'delete_orders'" @click="deleteOrder">Delete</button>

    <!-- Or use composable -->
    <div v-if="usePermission().can('view_reports')">
        <RevenueChart />
    </div>

    <!-- Role-based visibility -->
    <div v-if="usePermission().hasRole('admin')">
        Admin Only Section
    </div>
    ```

- [ ] **Menu Visibility (Admin Filament)**

    ```php
    // In AdminPanelProvider.php
    ->navigationGroups([
        'Catalog' => can('view_products'),
        'Finance' => can('view_invoices'),
        'IAM' => can('manage_users'),
    ])
    ```

---

## 📌 GIAI ĐOẠN 6: TRẢI NGHIỆM KHÁCH HÀNG & TỐI ƯU (CRM, Customer Portal & Polish)

### 🎯 Mục tiêu giai đoạn

Hoàn thiện góc khách hàng, tối ưu hiệu suất (Web Vitals) để sẵn sàng ra mắt.

### 📊 Tiến độ: [✓] 100% Chi tiết đầy đủ

---

### Step 1: Customer Account Portal (Storefront)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Account Layout & Routes

- [ ] **Tạo layouts/account.vue** (Sidebar wrapper)

    ```vue
    <template>
        <div class="min-h-screen bg-gray-50">
            <div class="grid grid-cols-4 gap-6 px-6 py-12 max-w-6xl mx-auto">
                <!-- Sidebar -->
                <aside class="col-span-1">
                    <div class="bg-white rounded-lg p-6 space-y-4">
                        <!-- User Info -->
                        <div class="text-center pb-4 border-b">
                            <img
                                :src="authStore.user?.avatar"
                                :alt="authStore.user?.name"
                                class="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <h3 class="font-semibold">
                                {{ authStore.user?.name }}
                            </h3>
                            <p class="text-sm text-gray-600">
                                {{ authStore.user?.email }}
                            </p>
                        </div>

                        <!-- Menu -->
                        <nav class="space-y-2">
                            <NuxtLink
                                to="/account/orders"
                                active-class="bg-blue-50 text-blue-600 font-semibold"
                                class="block px-4 py-2 rounded-lg hover:bg-gray-100"
                            >
                                📦 Đơn hàng
                            </NuxtLink>
                            <NuxtLink
                                to="/account/loyalty"
                                active-class="bg-blue-50 text-blue-600 font-semibold"
                                class="block px-4 py-2 rounded-lg hover:bg-gray-100"
                            >
                                ⭐ Điểm thưởng
                            </NuxtLink>
                            <NuxtLink
                                to="/account/addresses"
                                active-class="bg-blue-50 text-blue-600 font-semibold"
                                class="block px-4 py-2 rounded-lg hover:bg-gray-100"
                            >
                                📍 Địa chỉ
                            </NuxtLink>
                            <NuxtLink
                                to="/account/wishlist"
                                active-class="bg-blue-50 text-blue-600 font-semibold"
                                class="block px-4 py-2 rounded-lg hover:bg-gray-100"
                            >
                                ❤️ Yêu thích
                            </NuxtLink>
                            <NuxtLink
                                to="/account/profile"
                                active-class="bg-blue-50 text-blue-600 font-semibold"
                                class="block px-4 py-2 rounded-lg hover:bg-gray-100"
                            >
                                ⚙️ Hồ sơ
                            </NuxtLink>
                            <button
                                @click="logout"
                                class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                                🚪 Đăng xuất
                            </button>
                        </nav>
                    </div>
                </aside>

                <!-- Main Content -->
                <main class="col-span-3">
                    <slot />
                </main>
            </div>
        </div>
    </template>

    <script setup lang="ts">
    const authStore = useAuthStore();

    const logout = async () => {
        await authStore.logout();
    };
    </script>
    ```

- [ ] **Tạo pages/account/orders.vue**

    ```vue
    <template>
        <div class="bg-white rounded-lg p-6 space-y-6">
            <h1 class="text-2xl font-bold">Đơn hàng của tôi</h1>

            <!-- Filters -->
            <div class="flex gap-4">
                <select
                    v-model="statusFilter"
                    class="px-4 py-2 border rounded-lg text-sm"
                >
                    <option value="">Tất cả</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="shipped">Đang giao</option>
                    <option value="delivered">Đã giao</option>
                    <option value="cancelled">Đã hủy</option>
                </select>
            </div>

            <!-- Order List -->
            <div class="space-y-4">
                <div
                    v-for="order in filteredOrders"
                    :key="order.id"
                    class="border rounded-lg p-4 hover:shadow-lg transition"
                >
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="font-semibold">
                                Đơn #{{ order.number }}
                            </h3>
                            <p class="text-sm text-gray-600">
                                {{ formatDate(order.created_at) }}
                            </p>
                        </div>
                        <span
                            class="px-3 py-1 rounded-full text-sm font-semibold
                            {{ order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }}"
                        >
                            {{ statusLabel(order.status) }}
                        </span>
                    </div>

                    <!-- Items Preview -->
                    <div class="flex gap-3 mb-4 pb-4 border-b">
                        <img
                            v-for="item in order.items.slice(0, 3)"
                            :key="item.id"
                            :src="item.product.image"
                            :alt="item.product.name"
                            class="w-16 h-16 object-cover rounded"
                        />
                        <span
                            v-if="order.items.length > 3"
                            class="w-16 h-16 flex items-center justify-center bg-gray-100 rounded text-sm font-semibold"
                        >
                            +{{ order.items.length - 3 }}
                        </span>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-2">
                        <NuxtLink
                            :to="`/account/orders/${order.id}`"
                            class="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                            Chi tiết
                        </NuxtLink>
                        <NuxtLink
                            :to="`/account/orders/${order.id}/tracking`"
                            class="px-4 py-2 border border-blue-600 text-blue-600 text-sm rounded hover:bg-blue-50"
                        >
                            Vận trình
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div
                v-if="orders.length === 0"
                class="text-center py-12 text-gray-600"
            >
                <p class="mb-4">Bạn chưa có đơn hàng nào</p>
                <NuxtLink to="/category" class="text-blue-600 hover:underline">
                    Mua sắm ngay
                </NuxtLink>
            </div>
        </div>
    </template>

    <script setup lang="ts">
    const orderApi = useOrderApi();

    const { data: orders } = await useAsyncData("account-orders", () =>
        orderApi.getOrders(1, 50),
    );

    const statusFilter = ref("");
    const filteredOrders = computed(() =>
        statusFilter.value
            ? orders.value?.filter((o) => o.status === statusFilter.value)
            : orders.value,
    );

    const statusLabel = (status: string) => {
        const labels: Record<string, string> = {
            pending: "Chờ xác nhận",
            approved: "Đã xác nhận",
            picking: "Đang lấy hàng",
            shipped: "Đang giao",
            delivered: "Đã giao",
            cancelled: "Đã hủy",
        };
        return labels[status] || status;
    };
    </script>
    ```

- [ ] **Tạo pages/account/loyalty.vue** (Points history & redemption)
- [ ] **Tạo pages/account/addresses.vue** (Address book with add/edit/delete)
- [ ] **Tạo pages/account/wishlist.vue** (Saved products grid)
- [ ] **Tạo pages/account/profile.vue** (Edit profile form + password change)

---

### Step 2: Review System (Storefront)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

#### 📋 Review Components

- [ ] **Tạo components/product/ReviewForm.vue**

    ```vue
    <template>
        <form
            @submit.prevent="submitReview"
            class="bg-gray-50 p-6 rounded-lg space-y-4"
        >
            <h3 class="font-semibold text-lg">Viết đánh giá</h3>

            <!-- Star Rating -->
            <div class="space-y-2">
                <label class="block text-sm font-semibold">Đánh giá</label>
                <div class="flex gap-2">
                    <button
                        v-for="star in 5"
                        :key="star"
                        @click="rating = star"
                        type="button"
                        class="text-3xl"
                    >
                        {{ star <= rating ? "⭐" : "☆" }}
                    </button>
                </div>
            </div>

            <!-- Review Text -->
            <div>
                <label class="block text-sm font-semibold mb-2"
                    >Bình luận</label
                >
                <textarea
                    v-model="reviewText"
                    maxlength="500"
                    rows="4"
                    placeholder="Chia sẻ trải nghiệm của bạn..."
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p class="text-xs text-gray-600 mt-1">
                    {{ reviewText.length }}/500 ký tự
                </p>
            </div>

            <!-- Image Upload -->
            <div>
                <label class="block text-sm font-semibold mb-2"
                    >Hình ảnh (tối đa 3)</label
                >
                <div class="flex gap-2">
                    <button
                        v-for="(file, idx) in uploadedImages"
                        :key="idx"
                        @click="removeImage(idx)"
                        type="button"
                        class="relative"
                    >
                        <img
                            :src="file.preview"
                            class="w-20 h-20 object-cover rounded"
                        />
                        <span
                            class="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                        >
                            ✕
                        </span>
                    </button>

                    <label
                        v-if="uploadedImages.length < 3"
                        class="w-20 h-20 border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            @change="addImage"
                            class="hidden"
                        />
                        <span class="text-2xl">+</span>
                    </label>
                </div>
            </div>

            <!-- Submit -->
            <button
                type="submit"
                :disabled="!rating || !reviewText"
                class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                Gửi đánh giá
            </button>
        </form>
    </template>

    <script setup lang="ts">
    const props = defineProps<{ productId: string }>();

    const rating = ref(0);
    const reviewText = ref("");
    const uploadedImages = ref<any[]>([]);

    const addImage = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file && uploadedImages.value.length < 3) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                uploadedImages.value.push({
                    file,
                    preview: event.target.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (idx: number) => {
        uploadedImages.value.splice(idx, 1);
    };

    const submitReview = async () => {
        const productApi = useProductApi();
        const formData = new FormData();
        formData.append("rating", rating.value.toString());
        formData.append("comment", reviewText.value);
        uploadedImages.value.forEach((img, idx) => {
            formData.append(`images[${idx}]`, img.file);
        });

        await productApi.submitReview(props.productId, formData);
    };
    </script>
    ```

- [ ] **Tạo components/product/ReviewList.vue**

    ```vue
    <template>
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h3 class="font-semibold text-lg">Đánh giá từ khách hàng</h3>
                <select
                    v-model="sortBy"
                    class="px-3 py-1 border rounded text-sm"
                >
                    <option value="newest">Mới nhất</option>
                    <option value="highest">⭐⭐⭐⭐⭐</option>
                    <option value="lowest">⭐</option>
                </select>
            </div>

            <!-- Review Cards -->
            <div class="space-y-4">
                <div
                    v-for="review in reviews"
                    :key="review.id"
                    class="border rounded-lg p-4"
                >
                    <!-- Header -->
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <p class="font-semibold">
                                {{ review.author_name }}
                            </p>
                            <p class="text-xs text-gray-600">
                                {{ formatDate(review.created_at) }}
                            </p>
                        </div>
                        <span class="text-lg">{{
                            "⭐".repeat(review.rating)
                        }}</span>
                    </div>

                    <!-- Comment -->
                    <p class="text-gray-700 mb-3">{{ review.comment }}</p>

                    <!-- Images -->
                    <div v-if="review.images?.length" class="flex gap-2 mb-3">
                        <img
                            v-for="(img, idx) in review.images"
                            :key="idx"
                            :src="img.url"
                            :alt="`Review image ${idx}`"
                            class="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80"
                            @click="openImageModal(img.url)"
                        />
                    </div>

                    <!-- Helpful -->
                    <div class="flex gap-4 text-sm text-gray-600">
                        <button
                            @click="markHelpful(review.id)"
                            class="hover:text-blue-600"
                        >
                            👍 Hữu ích {{ review.helpful_count }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <Pagination
                v-if="totalPages > 1"
                :current="currentPage"
                :total="totalPages"
                @change="changePage"
            />
        </div>
    </template>

    <script setup lang="ts">
    const props = defineProps<{ productId: string }>();

    const sortBy = ref("newest");
    const currentPage = ref(1);
    const reviewsPerPage = 5;

    const productApi = useProductApi();
    const { data: reviews, total } = await useAsyncData(
        `reviews-${props.productId}-${currentPage.value}`,
        () => productApi.getReviews(props.productId, currentPage.value),
    );

    const totalPages = computed(() =>
        Math.ceil((total.value || 0) / reviewsPerPage),
    );

    const changePage = (page: number) => {
        currentPage.value = page;
    };

    const markHelpful = async (reviewId: string) => {
        await productApi.markReviewHelpful(reviewId);
    };
    </script>
    ```

---

### Step 3: Performance & UX Polish

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Skeleton Loaders

- [ ] **Tạo components/ui/SkeletonCard.vue**

    ```vue
    <template>
        <div class="bg-white rounded-lg overflow-hidden animate-pulse">
            <div class="w-full h-48 bg-gray-300" />
            <div class="p-4 space-y-3">
                <div class="h-4 bg-gray-300 rounded w-3/4" />
                <div class="h-4 bg-gray-300 rounded w-1/2" />
                <div class="h-8 bg-gray-300 rounded mt-4" />
            </div>
        </div>
    </template>
    ```

- [ ] **Tạo components/ui/SkeletonText.vue**
- [ ] **Tạo components/ui/SkeletonAvatar.vue**

#### 📋 Route Transitions

- [ ] **Cập nhật nuxt.config.ts**

    ```typescript
    export default defineNuxtConfig({
        app: {
            pageTransition: {
                name: "page",
                mode: "out-in",
            },
        },
    });
    ```

- [ ] **Tạo assets/css/transitions.css**

    ```css
    .page-enter-active,
    .page-leave-active {
        transition: opacity 0.3s ease;
    }

    .page-enter-from {
        opacity: 0;
    }

    .page-leave-to {
        opacity: 0;
    }
    ```

#### 📋 Empty States

- [ ] **Tạo components/ui/EmptyState.vue**

    ```vue
    <template>
        <div class="text-center py-12 text-gray-600">
            <div class="text-6xl mb-4">{{ icon }}</div>
            <p class="text-lg font-semibold mb-2">{{ title }}</p>
            <p class="mb-6">{{ message }}</p>
            <NuxtLink
                v-if="actionLink"
                :to="actionLink"
                class="text-blue-600 hover:underline"
            >
                {{ actionLabel }}
            </NuxtLink>
        </div>
    </template>

    <script setup lang="ts">
    defineProps<{
        icon: string;
        title: string;
        message: string;
        actionLink?: string;
        actionLabel?: string;
    }>();
    </script>
    ```

#### 📋 Performance Optimization (nuxt.config.ts)

- [ ] **Image Optimization**

    ```typescript
    export default defineNuxtConfig({
        image: {
            screens: {
                xs: 320,
                sm: 640,
                md: 768,
                lg: 1024,
                xl: 1280,
                xxl: 1536,
            },
            presets: {
                avatar: {
                    modifiers: {
                        width: 50,
                        height: 50,
                    },
                },
            },
        },
    });
    ```

- [ ] **Route Lazy Loading**

    ```typescript
    export default defineNuxtConfig({
        components: {
            global: true,
            dirs: ["~/components"],
        },
        imports: {
            presets: [
                {
                    from: "vue",
                    imports: ["ref", "computed", "watch"],
                },
            ],
        },
    });
    ```

- [ ] **Preload Critical Resources**

    ```typescript
    export default defineNuxtConfig({
        nitro: {
            prerender: {
                crawlLinks: true,
                routes: ["/"],
                ignore: ["/admin"],
            },
        },
    });
    ```

#### 📋 Error Pages

- [ ] **Tạo app.vue (Error Boundary)**

    ```vue
    <template>
        <div>
            <NuxtRouterEvents @navigate="onNavigate" />
            <NuxtErrorBoundary @error="onError">
                <NuxtPage />
            </NuxtErrorBoundary>
        </div>
    </template>

    <script setup lang="ts">
    const onError = (error: any) => {
        console.error("App error:", error);
    };

    const onNavigate = (to: any) => {
        console.log("Navigating to", to);
    };
    </script>
    ```

- [ ] **Tạo error.vue (Global Error Page)**

    ```vue
    <template>
        <div class="min-h-screen flex items-center justify-center">
            <div class="text-center">
                <h1 class="text-6xl font-bold text-red-600 mb-4">
                    {{ error?.statusCode || "500" }}
                </h1>
                <p class="text-xl text-gray-700 mb-6">
                    {{ error?.message || "Something went wrong" }}
                </p>
                <NuxtLink
                    to="/"
                    class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Back to Home
                </NuxtLink>
            </div>
        </div>
    </template>

    <script setup lang="ts">
    const props = defineProps<{
        error: any;
    }>();
    </script>
    ```

---

#### 📋 Testing Checklist for GIAI ĐOẠN 6

- [ ] Account portal pages load correctly with user data
- [ ] Order list filters by status (pending, shipped, delivered)
- [ ] Tracking page shows correct order status stepper
- [ ] Review form validates rating and text input
- [ ] Skeleton loaders display while loading
- [ ] Page transitions are smooth (fade effect)
- [ ] Empty states appear when no data
- [ ] Images lazy load correctly
- [ ] Error pages display on 404/500
- [ ] Mobile responsiveness on all pages
- [ ] Lighthouse score: Performance > 90, SEO > 95, Accessibility > 90

---

## 📝 TESTING CHECKLIST (FRONTEND)

### E2E Testing (Cypress / Playwright)

- [ ] Login → Add product with variant → Checkout → Success
- [ ] Admin creates product with images
- [ ] Warehouse staff drag-drop order on Kanban
- [ ] Real-time stock update via WebSocket
- [ ] Coupon application reduces total correctly

### Component & Unit Tests (Vitest)

- [ ] Cart Store calculates correctly
- [ ] VariantSelector updates price & SKU
- [ ] v-can directive hides unauthorized buttons
- [ ] API error handling shows toast

### UI/UX & Responsive

- [ ] Storefront responsive on mobile (menu hamburger, cart slide-over)
- [ ] Scanner app full-screen on PDA device
- [ ] Network error handling (offline fallback, 404/500 pages)

---

## 🚀 DEPLOYMENT CHECKLIST (FRONTEND)

- [ ] `.env.production` configuration
- [ ] Nuxt 3 build: `npm run build`
- [ ] Filament assets: `php artisan filament:optimize`
- [ ] Nginx reverse proxy (port 3000 Nuxt, port 80 Laravel)
- [ ] CDN setup (Cloudflare) for images
- [ ] Lighthouse audit (Performance > 90, SEO > 95, Accessibility > 90)
- [ ] Cross-browser testing (Chrome, Safari, iOS, Android)
- [ ] WebSocket live test (HTTPS/WSS)

---

## 📅 TIMELINE OVERVIEW

| Phase     | Giai Đoạn            | Thời gian dự kiến | Ngày bắt đầu | Ngày kết thúc (dự kiến) |
| --------- | -------------------- | ----------------- | ------------ | ----------------------- |
| 1         | UI Foundation & API  | 8-10 ngày         | 01/04/2026   | 10/04/2026              |
| 2         | Catalog & Product    | 8-10 ngày         | 11/04/2026   | 20/04/2026              |
| 3         | WMS & Real-time      | 6-8 ngày          | 21/04/2026   | 28/04/2026              |
| 4         | Cart, Checkout & OMS | 9-11 ngày         | 29/04/2026   | 09/05/2026              |
| 5         | TMS, Finance & RBAC  | 7-9 ngày          | 10/05/2026   | 18/05/2026              |
| 6         | CRM, Portal & Polish | 8-10 ngày         | 19/05/2026   | 28/05/2026              |
| **TOTAL** | **VIEWS/FRONTEND**   | **46-58 ngày**    | 01/04/2026   | 28/05/2026              |

---

## 🎯 SUCCESS CRITERIA

✅ **Phase 1 Success:**

- [ ] Filament Admin panel fully responsive
- [ ] Nuxt 3 Storefront loads in < 3s (Lighthouse)
- [ ] API error handling tested
- [ ] Global state management working (cart, auth, ui)

✅ **Phase 2 Success:**

- [ ] Products display with JSON attributes
- [ ] Variants selector works (color + size → SKU)
- [ ] Category filters functional
- [ ] PDP fully SEO optimized (JSON-LD schema)

✅ **Phase 3 Success:**

- [ ] WMS warehouse map displays
- [ ] Barcode scanning functional
- [ ] WebSocket real-time updates work

✅ **Phase 4 Success:**

- [ ] Cart shows correct totals & discounts
- [ ] Multi-step checkout flows
- [ ] Order Kanban drag-drop works

✅ **Phase 5 Success:**

- [ ] Tracking page displays shipment status
- [ ] Finance dashboard shows charts
- [ ] RBAC hides/shows UI based on permissions

✅ **Phase 6 Success:**

- [ ] Customer portal pages populated
- [ ] Review system functional
- [ ] Performance targets met (Lighthouse scores)
- [ ] Ready for production deployment

---

## 📞 NOTES & DEPENDENCIES

1. **Backend Integration:** Tất cả Views phụ thuộc vào APIs từ ROADMAP.md giai đoạn tương ứng
2. **Database:** Shares MySQL 8.0.30 database với backend
3. **Real-time:** Requires Laravel Reverb server running
4. **Environment:** `.env.example` cần được tạo cho Nuxt 3 (API_BASE, REVERB keys)
5. **Authentication:** Laravel guards phải được setup trước (xem ROADMAP.md)

---

**Last Updated:** 01/04/2026  
**Version:** 1.0  
**Status:** 🎯 Ready for Phase 1 Implementation
