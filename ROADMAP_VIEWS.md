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

### 📊 Tiến độ: [ ] 0% Chưa bắt đầu

---

### Step 1: Giao diện Product Builder (Admin Filament)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Filament Resources (ProductResource.php)

- [ ] **Tạo ProductResource**

    ```bash
    php artisan make:filament-resource Product
    ```

- [ ] **Thiết kế Form với Tabs/Wizard**

    ```php
    // app/Filament/Resources/ProductResource.php
    public static function form(Form $form): Form {
        return $form->schema([
            Tabs::make('Product Details')->tabs([
                Tab::make('General')->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255),
                    TextInput::make('sku')
                        ->unique(ignoreRecord: true)
                        ->required(),
                    Textarea::make('description')
                        ->columnSpan('full'),
                    Select::make('category_id')
                        ->relationship('category', 'name')
                        ->required(),
                    Select::make('brand_id')
                        ->relationship('brand', 'name'),
                    TextInput::make('price')
                        ->numeric()
                        ->required()
                        ->prefix('₫'),
                ])->columns(2),

                Tab::make('Attributes (JSON)')->schema([
                    KeyValue::make('attributes')
                        ->keyLabel('Property (e.g., Color)')
                        ->valueLabel('Value (e.g., Red)')
                        ->columnSpan('full'),
                ]),

                Tab::make('Variants')->schema([
                    Repeater::make('variants')
                        ->relationship()
                        ->schema([
                            TextInput::make('sku')->required(),
                            TextInput::make('price_override')
                                ->numeric()
                                ->helperText('Giá riêng cho biến thể (nếu trống = giá gốc)'),
                            TextInput::make('color'),
                            TextInput::make('size'),
                        ])
                        ->columns(2)
                        ->columnSpan('full'),
                ]),

                Tab::make('Images')->schema([
                    FileUpload::make('product_images')
                        ->multiple()
                        ->image()
                        ->maxSize(5120)
                        ->reorderable()
                        ->columnSpan('full'),
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

- [ ] **Tạo BrandResource**
    - Form: name, description, logo
    - Table columns: name, product_count, created_at
    - Actions: Edit, Delete, View Products

- [ ] **Tạo ProductAttributeResource**
    - Form: name, data_type (string, integer, color, date, etc.)
    - Table: List all attributes với usage count

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
                        <skeleton-card v-for="i in 9" :key="i" />
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
    const route = useRoute();
    const productApi = useProductApi();
    const cartStore = useCartStore();

    // Load products with filters
    const { data: products, pending } = await useAsyncData(
      `category-${route.params.slug}`,
      () => productApi.getByCategory(route.params.slug, {
        ...route.query,
        sort: sortBy.value,
        page: currentPage.value,
      })
    );

    const filters = ref([
      { type: 'price', label: 'Giá', min: 0, max: 100000000 },
      { type: 'brand', label: 'Thương hiệu', options: [...] },
      { type: 'color', label: 'Màu sắc', options: [...] },
      { type: 'size', label: 'Kích cỡ', options: [...] },
    ]);

    const selectedFilters = ref<Record<string, any>>({});
    const sortBy = ref('newest');
    const currentPage = ref(1);

    const updateFilters = (key: string, value: any) => {
      selectedFilters.value[key] = value;
      currentPage.value = 1;
      // Update route query
      navigateTo({
        query: { ...route.query, [key]: value }
      });
    };

    const handleAddToCart = async (productId: string, quantity: number) => {
      await cartStore.addToCart(productId, quantity);
    };
    </script>
    ```

#### 📋 Dynamic Sidebar Filter Component

- [ ] **Tạo components/product/CatalogSidebar.vue**

    ```vue
    <template>
        <div class="space-y-6">
            <!-- Price Filter -->
            <div class="border-b pb-6">
                <h3 class="font-semibold text-lg mb-4">Giá</h3>
                <div class="flex gap-2">
                    <input
                        type="number"
                        v-model.number="priceRange[0]"
                        placeholder="Từ"
                        class="w-1/2 border px-2 py-1 text-sm"
                    />
                    <input
                        type="number"
                        v-model.number="priceRange[1]"
                        placeholder="Đến"
                        class="w-1/2 border px-2 py-1 text-sm"
                    />
                </div>
                <button
                    @click="applyPriceFilter"
                    class="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm w-full"
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
                        class="flex items-center gap-2 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            :value="brand.id"
                            v-model="selectedBrands"
                            @change="updateBrandFilter"
                            class="w-4 h-4"
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
                <div class="space-y-2">
                    <label
                        v-for="val in attr.values"
                        :key="val"
                        class="flex items-center gap-2 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            :value="val"
                            v-model="selectedAttributes[attr.id]"
                            @change="updateAttributeFilter(attr.id)"
                            class="w-4 h-4"
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

    const applyPriceFilter = () => {
        emit("update", "price", priceRange.value.join("-"));
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
    </script>
    ```

---

### Step 3: Product Detail Page - PDP (Storefront)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Component Architecture

- [ ] **Tạo pages/products/[id].vue**

    ```vue
    <template>
        <div class="min-h-screen bg-white">
            <div class="grid grid-cols-2 gap-12 px-6 py-12">
                <!-- Gallery -->
                <ProductGallery :images="product.images" />

                <!-- Details & Purchase -->
                <div class="space-y-6">
                    <div>
                        <h1 class="text-3xl font-bold">{{ product.name }}</h1>
                        <p class="text-gray-600 mt-2">SKU: {{ product.sku }}</p>
                        <Rating
                            :score="product.rating"
                            :count="product.reviews_count"
                        />
                    </div>

                    <div class="text-3xl font-bold text-red-600">
                        {{ formatPrice(product.price) }}
                    </div>

                    <!-- Variant Selector -->
                    <VariantSelector
                        :product="product"
                        @select="handleVariantSelect"
                    />

                    <!-- Stock Indicator -->
                    <StockIndicator
                        :stock="selectedVariant?.stock || product.stock"
                    />

                    <!-- Action Buttons -->
                    <div class="flex gap-4">
                        <button
                            @click="addToCart"
                            :disabled="selectedVariant?.stock === 0"
                            class="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                        >
                            Thêm vào giỏ
                        </button>
                        <button
                            class="flex-1 border border-gray-300 py-3 rounded-lg"
                        >
                            ♡ Yêu thích
                        </button>
                    </div>

                    <!-- Product Info -->
                    <div class="border-t pt-6 space-y-4">
                        <div>
                            <h3 class="font-semibold">Mô tả sản phẩm</h3>
                            <p class="text-gray-600 mt-2">
                                {{ product.description }}
                            </p>
                        </div>
                        <div>
                            <h3 class="font-semibold">Thông số kỹ thuật</h3>
                            <table class="w-full text-sm mt-2">
                                <tbody>
                                    <tr
                                        v-for="(
                                            value, key
                                        ) in product.attributes"
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
                <ProductReviews :product-id="product.id" />
            </div>
        </div>
    </template>

    <script setup lang="ts">
    const route = useRoute();
    const productApi = useProductApi();
    const cartStore = useCartStore();
    const uiStore = useUiStore();

    const { data: product } = await useAsyncData(
        `product-${route.params.id}`,
        () => productApi.getById(route.params.id),
    );

    const selectedVariant = ref(null);
    const quantity = ref(1);

    const handleVariantSelect = (variant: any) => {
        selectedVariant.value = variant;
    };

    const addToCart = async () => {
        await cartStore.addToCart(
            product.value.id,
            quantity.value,
            selectedVariant.value?.id,
        );
    };

    // SEO Meta Tags
    useSeoMeta({
        title: product.value?.meta_title || product.value?.name,
        description: product.value?.meta_description,
        ogTitle: product.value?.name,
        ogDescription: product.value?.description,
        ogImage: product.value?.images[0]?.url,
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
                    image: product.value?.images?.map((i) => i.url),
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
    - Swiper.js integration
    - Image zoom on hover
    - Thumbnail sync

- [ ] **Tạo components/product/VariantSelector.vue**
    - Multi-select logic (Color + Size → SKU)
    - Update price on variant change
    - Handle stock availability

- [ ] **Tạo components/product/StockIndicator.vue**
    - Badge "Còn X sản phẩm"
    - "Hết hàng" state
    - "Sắp hết hàng" warning

---

## 📌 GIAI ĐOẠN 3: GIAO DIỆN VẬN HÀNH KHO BÃI (WMS UI & Real-time)

### 🎯 Mục tiêu giai đoạn

Mang lại trải nghiệm thao tác tốc độ cao, không có độ trễ cho nhân viên kho. Theo dõi vị trí hàng, quét mã vạch, cập nhật tồn kho real-time.

### 📊 Tiến độ: [ ] 0% Chưa bắt đầu

---

### Step 1: Bản đồ Không gian Kho (Admin)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

#### 📋 Custom Filament View (LocationMap.blade.php)

- [ ] **Tạo Filament Page cho Warehouse Map**
    - Grid layout mô phỏng kho hàng
    - Tooltip: Tỷ lệ lấp đầy (%.Capacity/Utilization)
    - Hover effect: Highlight bin location
    - Button: In mã vạch hàng loạt (PDF generation)

---

### Step 2: App Quét Mã Nhập/Xuất Kho (Livewire/Alpine)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

#### 📋 Scanner Interface (Mobile-first)

- [ ] **Tạo Blade view cho quét mã**
    - Full-screen input field
    - Alpine.js event listener (bắt sự kiện từ súng bắn mã vạch)
    - Feedback zone: Hiển thị kết quả
    - Back-end: Xử lý barcode logic

---

### Step 3: Tích hợp WebSockets (Laravel Echo)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

#### 📋 Setup Laravel Echo & Reverb

- [ ] **Tạo plugins/echo.client.ts**
    - Kết nối với Laravel Reverb
    - Listen on channels

- [ ] **Real-time updates**
    - `StockUpdated` event: Highlight ô tồn kho
    - `PickListCreated` event: Notification toast

---

## 📌 GIAI ĐOẠN 4: LUỒNG CHUYỂN ĐỔI DOANH THU (Cart, Checkout & OMS UI)

### 🎯 Mục tiêu giai đoạn

Tối ưu hóa tỷ lệ chuyển đổi (CR) bằng UI giỏ hàng và thanh toán mượt mà nhất.

### 📊 Tiến độ: [ ] 0% Chưa bắt đầu

---

### Step 1: Giỏ hàng Slide-over & Cart Engine

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

- [ ] **Tạo components/cart/SlideOverCart.vue**
    - Headless UI Dialog
    - Cart items list
    - Increase/decrease buttons (debounce 300ms)
    - Coupon input

---

### Step 2: Multi-step Checkout Flow

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 4 ngày

- [ ] **Routing structure**
    - `/checkout/auth`
    - `/checkout/shipping`
    - `/checkout/payment`
    - `/checkout/review`
    - `/checkout/success`

- [ ] **State sync** (useCheckoutStore)

---

### Step 3: Order Management (Admin Filament)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

- [ ] **Kanban Board** (Filament Kanban plugin)
    - Drag-drop orders
    - State machine validation

- [ ] **Order Timeline** component

---

## 📌 GIAI ĐOẠN 5: VẬN CHUYỂN, TÀI CHÍNH & PHÂN QUYỀN (TMS, Finance & IAM)

### 🎯 Mục tiêu giai đoạn

Hiển thị dữ liệu phức tạp (báo cáo, vận trình) một cách trực quan, bảo mật View theo Role.

### 📊 Tiến độ: [ ] 0% Chưa bắt đầu

---

### Step 1: Tracking Map (Storefront & Admin)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

- [ ] **Stepper component** (Vertical)
- [ ] **Map integration** (Google Maps)

### Step 2: Finance Dashboard (Admin)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

- [ ] **Filament Table** (Payments, Invoices)
- [ ] **Chart.js/ApexCharts** (Revenue, Cancellation rate)

### Step 3: RBAC UI (Storefront & Admin)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

- [ ] **Custom directive** `v-can`
- [ ] **Filament Shield** configuration

---

## 📌 GIAI ĐOẠN 6: TRẢI NGHIỆM KHÁCH HÀNG & TỐI ƯU (CRM, Customer Portal & Polish)

### 🎯 Mục tiêu giai đoạn

Hoàn thiện góc khách hàng, tối ưu hiệu suất (Web Vitals) để sẵn sàng ra mắt.

### 📊 Tiến độ: [ ] 0% Chưa bắt đầu

---

### Step 1: Customer Portal (Storefront)

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

- [ ] **Nested Routes** (pages/account/)
    - `/account/orders`
    - `/account/loyalty`
    - `/account/addresses`
    - `/account/profile`

### Step 2: Review System

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 2 ngày

- [ ] **Review Form** (star rating, images)
- [ ] **Review List** (filter, pagination)

### Step 3: Performance & UX Polish

**Status:** ⏳ TODO  
**Thời gian dự kiến:** 3 ngày

- [ ] **Skeleton Loaders**
- [ ] **Route Transitions**
- [ ] **Empty States**
- [ ] **Nuxt optimization**
    - HTTP/2, Brotli compression
    - Image lazy loading
    - Component lazy loading

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
