# 🎨 FRONTEND SETUP GUIDE - Nuxt.js PWA

## 📁 Cấu trúc thư mục Frontend

```
frontend/
├── assets/              # Static assets (CSS, images)
│   └── css/
│       └── main.css
├── components/          # Vue components
│   ├── common/
│   ├── catalog/
│   ├── cart/
│   ├── checkout/
│   └── orders/
├── composables/         # Vue composables (hooks)
│   ├── useCart.ts
│   ├── useProducts.ts
│   └── useAuth.ts
├── layouts/             # Page layouts
│   ├── default.vue
│   └── admin.vue
├── middleware/          # Route middleware
│   └── auth.ts
├── pages/               # Nuxt pages (file-based routing)
│   ├── index.vue
│   ├── products/
│   │   ├── index.vue
│   │   └── [id].vue
│   ├── cart.vue
│   ├── checkout.vue
│   └── orders/
│       ├── index.vue
│       └── [id].vue
├── plugins/             # Nuxt plugins
│   └── axios.ts
├── stores/              # Pinia stores
│   ├── auth.ts
│   ├── cart.ts
│   ├── products.ts
│   └── orders.ts
├── types/               # TypeScript types
│   ├── api.ts
│   ├── product.ts
│   ├── cart.ts
│   └── order.ts
├── public/              # Public static files
├── app.vue              # Root app component
├── error.vue            # Error page
├── nuxt.config.ts       # Nuxt configuration
├── tsconfig.json        # TypeScript config
├── tailwind.config.ts   # Tailwind config
├── package.json
└── .env.example
```

---

## 🚀 Hướng dẫn Setup

### Bước 1: Khởi tạo và cài dependencies trong frontend/

```bash
cd frontend
npm install
npm run typecheck
npm run build
```

`frontend/` hiện là source storefront chính thức. Không copy code từ `storefront-pwa/`; thư mục đó chỉ còn là artefact legacy rỗng đang chờ Windows giải phóng lock để xóa hẳn.

---

### Bước 2: Tạo frontend/.gitignore

```bash
cat > frontend/.gitignore << 'EOF'
# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Nuxt build output
.nuxt/
.output/
dist/

# Environment files
.env
.env.local
.env.*.local

# Editor
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS
.DS_Store
Thumbs.db

# Test coverage
coverage/
EOF
```

---

### Bước 3: Tạo frontend/.env.example

```bash
cat > frontend/.env.example << 'EOF'
# ====================================
# Backend API Configuration
# ====================================
NUXT_PUBLIC_API_BASE=http://localhost:8000/api

# ====================================
# App Configuration
# ====================================
NUXT_PUBLIC_APP_NAME=EcomWMS

# ====================================
# WebSocket (Laravel Reverb)
# ====================================
NUXT_PUBLIC_REVERB_HOST=localhost
NUXT_PUBLIC_REVERB_PORT=8080
NUXT_PUBLIC_REVERB_KEY=your-reverb-app-key
EOF
```

---

### Bước 4: Cập nhật package.json

File `frontend/package.json` nên được cập nhật:

```json
{
    "name": "ecom-wms-frontend",
    "private": true,
    "type": "module",
    "scripts": {
        "build": "nuxt build",
        "dev": "nuxt dev",
        "generate": "nuxt generate",
        "preview": "nuxt preview",
        "postinstall": "nuxt prepare",
        "typecheck": "nuxt typecheck",
        "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts"
    },
    "dependencies": {
        "@headlessui/vue": "^1.7.23",
        "@heroicons/vue": "^2.2.0",
        "@nuxtjs/i18n": "^9.5.5",
        "@nuxtjs/tailwindcss": "^6.14.0",
        "@pinia/nuxt": "^0.11.1",
        "@vueuse/nuxt": "^13.3.0",
        "axios": "^1.9.0",
        "laravel-echo": "^1.17.1",
        "nuxt": "^3.21.2",
        "pinia": "^3.0.4",
        "pusher-js": "^8.4.0",
        "swiper": "^12.1.3",
        "vue": "^3.5.31"
    },
    "devDependencies": {
        "@tailwindcss/forms": "^0.5.10",
        "@tailwindcss/typography": "^0.5.16",
        "@types/node": "^25.5.0",
        "typescript": "^5.9.3"
    }
}
```

---

### Bước 5: Cấu hình nuxt.config.ts

File `frontend/nuxt.config.ts` đầy đủ:

```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },

    modules: [
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "@vueuse/nuxt",
        "@nuxtjs/i18n",
    ],

    runtimeConfig: {
        public: {
            apiBase:
                process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000/api",
            reverbKey: process.env.NUXT_PUBLIC_REVERB_KEY || "local",
            reverbHost: process.env.NUXT_PUBLIC_REVERB_HOST || "localhost",
            reverbPort: process.env.NUXT_PUBLIC_REVERB_PORT || "8080",
            appName: process.env.NUXT_PUBLIC_APP_NAME || "Storefront PWA",
        },
    },

    app: {
        pageTransition: { name: "page", mode: "out-in" },
        head: {
            link: [{ rel: "preconnect", href: "https://fonts.bunny.net" }],
        },
    },

    css: ["~/assets/css/tailwind.css", "~/assets/css/transitions.css"],

    typescript: {
        strict: true,
    },

    nitro: {
        prerender: {
            crawlLinks: false,
            routes: ["/"],
        },
    },

    i18n: {
        defaultLocale: "vi",
        locales: [{ code: "vi", name: "Tiếng Việt" }],
        bundle: {
            optimizeTranslationDirective: false,
        },
    },
});
```

---

### Bước 6: Cấu hình API Client

Tạo file `frontend/composables/useApi.ts`:

```typescript
// Composable để call API
export const useApi = () => {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiUrl;

    const get = async <T>(endpoint: string): Promise<T> => {
        const { data, error } = await useFetch<T>(`${baseURL}${endpoint}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (error.value) throw error.value;
        return data.value as T;
    };

    const post = async <T>(endpoint: string, body: object): Promise<T> => {
        const { data, error } = await useFetch<T>(`${baseURL}${endpoint}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (error.value) throw error.value;
        return data.value as T;
    };

    return { get, post };
};
```

---

### Bước 7: Cấu hình Authentication

Tạo file `frontend/stores/auth.ts`:

```typescript
import { defineStore } from "pinia";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        user: null,
        token: null,
        isAuthenticated: false,
    }),

    actions: {
        async login(email: string, password: string) {
            const config = useRuntimeConfig();
            const response = await $fetch(
                `${config.public.apiUrl}/auth/login`,
                {
                    method: "POST",
                    body: { email, password },
                },
            );

            this.token = (response as any).token;
            this.user = (response as any).user;
            this.isAuthenticated = true;

            // Persist token
            if (process.client) {
                localStorage.setItem("auth_token", this.token || "");
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;
            if (process.client) {
                localStorage.removeItem("auth_token");
            }
        },
    },

    persist: true,
});
```

---

### Bước 8: TypeScript Types

Tạo file `frontend/types/api.ts`:

```typescript
// API Response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
}

// Product types
export interface Product {
    id: number;
    name: string;
    sku: string;
    slug: string;
    price: number;
    category_id: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    category?: Category;
}

// Category types
export interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
}

// Cart types
export interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    product?: Product;
}

export interface Cart {
    id: number;
    user_id: number;
    items: CartItem[];
    total: number;
}

// Order types
export interface Order {
    id: number;
    order_number: string;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    total: number;
    items: OrderItem[];
    created_at: string;
}

export interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    product?: Product;
}
```

---

### Bước 9: Install Dependencies

```bash
cd frontend/

# Install all dependencies
npm install

# Hoặc với npm ci (sử dụng package-lock.json chính xác)
npm ci
```

---

### Bước 10: Copy và cấu hình .env

```bash
cd frontend/

# Copy .env
cp .env.example .env

# Chỉnh sửa .env
nano .env
```

Cấu hình `.env`:

```dotenv
NUXT_PUBLIC_API_BASE=http://localhost:8000/api
NUXT_PUBLIC_APP_NAME=EcomWMS
NUXT_PUBLIC_REVERB_HOST=localhost
NUXT_PUBLIC_REVERB_PORT=8080
NUXT_PUBLIC_REVERB_KEY=your-reverb-app-key
```

---

### Bước 11: Dev Server

```bash
cd frontend/

# Start development server
npm run dev

# Server sẽ chạy tại http://localhost:3000
```

---

### Bước 12: Production Build

```bash
cd frontend/

# Build cho production
npm run build

# Output sẽ ở .output/
ls .output/

# Preview production build
npm run preview
```

---

### Bước 13: TypeScript Check

```bash
cd frontend/

# Type check
npm run typecheck

# Hoặc
npx tsc --noEmit
```

---

## ✅ Verification Checklist

```bash
# 1. Node.js version
node --version  # Phải là v18+

# 2. npm version
npm --version

# 3. Dependencies installed
ls node_modules/ | wc -l  # Nhiều packages

# 4. TypeScript check
npm run typecheck
# Expected: No errors

# 5. Dev server starts
npm run dev
# Expected: Server at http://localhost:3000

# 6. Build succeeds
npm run build
# Expected: .output/ created

# 7. API calls work
# Mở browser -> Network tab -> reload
# Expected: API calls to localhost:8000/api/* success
```

---

## 🔧 Xử lý lỗi thường gặp

### Lỗi: "Cannot find module"

```bash
rm -rf node_modules
npm install
```

### Lỗi: "TypeScript error"

```bash
# Kiểm tra tsconfig.json
cat tsconfig.json

# Run typecheck
npm run typecheck
```

### Lỗi: CORS từ backend

```bash
# Kiểm tra backend/.env
# FRONTEND_URL=http://localhost:3000
# SANCTUM_STATEFUL_DOMAINS=localhost:3000

# Restart backend
cd backend && php artisan serve
```

### Lỗi: "nuxt: command not found"

```bash
npm install -g nuxi
# Hoặc dùng npx
npx nuxt dev
```

### Port đã bị dùng

```bash
# Đổi port
npm run dev -- --port 3001

# Hoặc trong nuxt.config.ts
devServer: {
  port: 3001
}
```
