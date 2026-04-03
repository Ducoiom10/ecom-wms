# 🔧 BACKEND SETUP GUIDE - Laravel API

## 📁 Cấu trúc thư mục Backend

```
backend/
├── app/
│   ├── Models/              # Eloquent models
│   ├── Http/
│   │   ├── Controllers/     # API controllers
│   │   ├── Requests/        # FormRequest validation
│   │   ├── Resources/       # API Resource transformers
│   │   └── Middleware/
│   ├── Actions/             # Business logic
│   ├── Queries/             # Read operations
│   ├── Policies/            # Authorization
│   ├── Exceptions/          # Custom exceptions
│   ├── Jobs/                # Background jobs
│   ├── Events/              # Domain events
│   ├── Listeners/           # Event listeners
│   ├── Enums/               # Status enums
│   ├── Observers/           # Model observers
│   └── Providers/
├── Modules/
│   ├── Catalog/             # Quản lý sản phẩm
│   ├── Inventory/           # Quản lý kho
│   ├── PIM/                 # Product Info Management
│   ├── WMS/                 # Warehouse Management
│   ├── OMS/                 # Order Management
│   ├── Cart/                # Giỏ hàng
│   ├── Pricing/             # Tính giá
│   ├── TMS/                 # Transport Management
│   └── Finance/             # Tài chính
├── database/
│   ├── migrations/
│   ├── factories/
│   └── seeders/
├── routes/
│   ├── api.php
│   └── console.php
├── tests/
│   ├── Feature/
│   └── Unit/
├── config/
├── bootstrap/
├── storage/
├── public/
├── artisan
├── composer.json
└── .env.example
```

---

## 🚀 Hướng dẫn Setup

### Bước 1: Copy files từ root

```bash
# Từ root directory của project
BACKEND_DIR="backend"
mkdir -p $BACKEND_DIR

# Copy Laravel core files
for dir in app Modules database routes tests config bootstrap storage public stubs; do
    if [ -d "$dir" ]; then
        echo "Copying $dir..."
        cp -r "$dir" "$BACKEND_DIR/"
    fi
done

# Copy root files
for file in artisan composer.json composer.lock phpunit.xml .env.example .editorconfig .gitattributes; do
    if [ -f "$file" ]; then
        echo "Copying $file..."
        cp "$file" "$BACKEND_DIR/"
    fi
done

echo "✅ Copy completed!"
ls "$BACKEND_DIR/"
```

---

### Bước 2: Xóa frontend files khỏi backend/

```bash
cd backend/

# Xóa vite configs trong các modules
echo "Removing Vite configs from modules..."
find Modules/ -name "vite.config.js" -type f -delete
find Modules/ -name "package.json" -type f -delete

# Xóa resources JS/CSS trong modules (chỉ giữ views nếu dùng Blade)
echo "Removing frontend assets from modules..."
for module in Modules/*/resources/; do
    if [ -d "${module}js" ]; then
        rm -rf "${module}js"
        echo "Removed ${module}js"
    fi
    if [ -d "${module}css" ]; then
        rm -rf "${module}css"
        echo "Removed ${module}css"
    fi
    if [ -d "${module}sass" ]; then
        rm -rf "${module}sass"
        echo "Removed ${module}sass"
    fi
done

echo "✅ Frontend cleanup in modules completed!"
```

---

### Bước 3: Tạo backend/.gitignore

```bash
cat > backend/.gitignore << 'EOF'
/node_modules
/public/hot
/public/storage
/storage/*.key
/storage/app/public
/vendor
.env
.env.backup
.env.production
.env.testing
.phpunit.result.cache
Homestead.json
Homestead.yaml
npm-debug.log
yarn-error.log
/.idea
/.vscode
*.DS_Store
/public/build
EOF
```

---

### Bước 4: Cấu hình composer.json

File `backend/composer.json` nên có dạng:

```json
{
    "$schema": "https://getcomposer.org/schema.json",
    "name": "ducoiom10/ecom-wms-backend",
    "type": "project",
    "description": "EcomWMS Backend - Laravel API",
    "keywords": ["laravel", "wms", "ecommerce"],
    "license": "MIT",
    "require": {
        "php": "^8.2",
        "filament/filament": "^3.3",
        "laravel/framework": "^12.0",
        "laravel/reverb": "^1.9",
        "laravel/sanctum": "^4.3",
        "laravel/tinker": "^2.10.1",
        "nwidart/laravel-modules": "^12.0",
        "predis/predis": "^3.4",
        "wikimedia/composer-merge-plugin": "^2.1"
    },
    "require-dev": {
        "fakerphp/faker": "^1.23",
        "laravel/pail": "^1.2.2",
        "laravel/pint": "^1.24",
        "laravel/sail": "^1.41",
        "mockery/mockery": "^1.6",
        "nunomaduro/collision": "^8.6",
        "pestphp/pest": "^3.8",
        "pestphp/pest-plugin-laravel": "^3.2"
    }
}
```

---

### Bước 5: Cài đặt Dependencies

```bash
cd backend/

# Install PHP dependencies
composer install

# Hoặc production (không có dev dependencies)
composer install --no-dev --optimize-autoloader
```

---

### Bước 6: Cấu hình Environment Variables

```bash
cd backend/

# Copy .env
cp .env.example .env

# Generate app key
php artisan key:generate
```

Nội dung file `backend/.env`:

```dotenv
APP_NAME=EcomWMS
APP_ENV=local
APP_KEY=  # Tự động tạo bởi php artisan key:generate
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecom_wms
DB_USERNAME=root
DB_PASSWORD=secret

BROADCAST_DRIVER=reverb
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database
SESSION_DRIVER=database

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# CORS - Allow Frontend
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000

# Reverb WebSocket
REVERB_APP_ID=your-app-id
REVERB_APP_KEY=your-app-key
REVERB_APP_SECRET=your-app-secret
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http
```

---

### Bước 7: Cấu hình CORS

Cập nhật `backend/config/cors.php`:

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:3000'),
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

### Bước 8: Database Migration

```bash
cd backend/

# Tạo database (nếu chưa có)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS ecom_wms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations
php artisan migrate

# Seed data (development)
php artisan db:seed

# Hoặc chỉ seed specific seeder
php artisan db:seed --class=ProductSeeder
```

---

### Bước 9: Cấu hình Storage

```bash
cd backend/

# Tạo storage symlink
php artisan storage:link

# Set permissions
chmod -R 775 storage/
chmod -R 775 bootstrap/cache/
```

---

### Bước 10: Testing Setup

```bash
cd backend/

# Copy .env.testing
cp .env.example .env.testing
# Chỉnh sửa .env.testing với database test
# DB_DATABASE=ecom_wms_test

# Run tests
php artisan test

# Run với coverage
php artisan test --coverage

# Run specific test
php artisan test --filter ProductTest
php artisan test tests/Feature/OrderLifecycleTest.php
```

---

### Bước 11: Caching (Production)

```bash
cd backend/

# Cache config, routes, views
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Clear cache nếu cần
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
```

---

### Bước 12: Queue Worker

```bash
cd backend/

# Run queue worker (development)
php artisan queue:work

# Run queue worker (production - daemon)
php artisan queue:work --daemon --quiet --queue=default,emails

# Hoặc dùng Supervisor
# Xem DEPLOYMENT_GUIDE.md
```

---

## 📦 Cấu trúc Module Chi Tiết

Mỗi module trong `Modules/` có cấu trúc:

```
Modules/Catalog/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── ProductController.php
│   │   ├── Requests/
│   │   │   ├── StoreProductRequest.php
│   │   │   └── UpdateProductRequest.php
│   │   └── Resources/
│   │       └── ProductResource.php
│   ├── Models/
│   │   ├── Product.php
│   │   ├── Category.php
│   │   └── Brand.php
│   ├── Actions/
│   │   ├── CreateProductAction.php
│   │   ├── UpdateProductAction.php
│   │   └── DeleteProductAction.php
│   ├── Queries/
│   │   ├── GetProductsQuery.php
│   │   └── GetProductByIdQuery.php
│   └── Providers/
│       ├── CatalogServiceProvider.php
│       └── RouteServiceProvider.php
├── database/
│   ├── migrations/
│   │   ├── 2024_01_01_000001_create_products_table.php
│   │   ├── 2024_01_01_000002_create_categories_table.php
│   │   └── 2024_01_01_000003_create_brands_table.php
│   ├── factories/
│   │   ├── ProductFactory.php
│   │   └── CategoryFactory.php
│   └── seeders/
│       └── CatalogDatabaseSeeder.php
├── routes/
│   └── api.php
├── tests/
│   ├── Feature/
│   │   └── ProductTest.php
│   └── Unit/
│       └── ProductActionTest.php
├── config/
│   └── config.php
└── module.json
```

---

## ✅ Verification Checklist

```bash
# 1. PHP version
php --version  # Phải là 8.2+

# 2. Composer dependencies
composer check-platform-reqs

# 3. App key exists
php artisan about | grep "Application Key"

# 4. Database connection
php artisan db:show

# 5. Migrations ran
php artisan migrate:status

# 6. Tests pass
php artisan test

# 7. Routes loaded
php artisan route:list | head -20

# 8. Server starts
php artisan serve
```

---

## 🔧 Xử lý lỗi thường gặp

### Lỗi: "Class not found"
```bash
composer dump-autoload
php artisan clear-compiled
```

### Lỗi: "Connection refused" (Database)
```bash
# Kiểm tra MySQL đang chạy
mysql -u root -p -e "SELECT 1"
# Kiểm tra .env database credentials
cat .env | grep DB_
```

### Lỗi: "Permission denied" (Storage)
```bash
chmod -R 775 storage/
chmod -R 775 bootstrap/cache/
chown -R www-data:www-data storage/
```

### Lỗi: Module không load
```bash
php artisan module:list
php artisan module:enable Catalog
```
