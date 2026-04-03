# 🔍 VERIFICATION GUIDE - Xác minh sau Refactor

## 📋 Tổng quan

Guide này giúp verify rằng refactor đã thành công và hệ thống hoạt động đúng.

---

## ✅ Checklist 1: Language Composition

### Kiểm tra thành phần ngôn ngữ sau refactor

```bash
# Cài GitHub Linguist (nếu chưa có)
gem install github-linguist

# Chạy trong backend/
cd backend/
github-linguist --breakdown
# Expected: PHP 90%+, Blade 5%+

# Chạy trong frontend/
cd ../frontend/
github-linguist --breakdown
# Expected: TypeScript 50%+, JavaScript 35%+, Vue 10%+
```

**Hoặc đếm thủ công:**

```bash
# Backend - đếm PHP files
find backend/ -name "*.php" -not -path "*/vendor/*" | wc -l
# Expected: Nhiều PHP files

# Backend - đếm JS files (phải rất ít hoặc 0)
find backend/ -name "*.js" -not -path "*/vendor/*" | wc -l
# Expected: 0 hoặc rất ít

# Frontend - đếm TypeScript files
find frontend/ -name "*.ts" -not -path "*/node_modules/*" | wc -l

# Frontend - đếm Vue files
find frontend/ -name "*.vue" -not -path "*/node_modules/*" | wc -l
```

### Expected Results

| Thành phần | Trước | Sau Backend | Sau Frontend |
| ---------- | ----- | ----------- | ------------ |
| PHP        | 24.2% | **95%+**    | -            |
| JavaScript | 66.6% | 0%          | **35%+**     |
| TypeScript | 1%    | 0%          | **50%+**     |
| Vue        | 4.3%  | 0%          | **10%+**     |
| Blade      | 1.6%  | 4%+         | -            |

---

## ✅ Checklist 2: File Structure Validation

### Kiểm tra cấu trúc thư mục

```bash
# Root structure
echo "=== ROOT STRUCTURE ==="
ls -la /path/to/ecom-wms/
# Expected output:
# backend/
# frontend/
# docs/
# README.md
# .gitignore

# Backend structure
echo "=== BACKEND STRUCTURE ==="
ls backend/
# Expected:
# app/ Modules/ database/ routes/ tests/ config/
# bootstrap/ storage/ public/ artisan composer.json

# Frontend structure
echo "=== FRONTEND STRUCTURE ==="
ls frontend/
# Expected:
# pages/ components/ composables/ layouts/ stores/
# nuxt.config.ts package.json
```

### Verify không còn mixed files ở root

```bash
echo "=== FILES THAT SHOULD NOT BE IN ROOT ==="

# PHP files ở root (chỉ nên có 0)
find . -maxdepth 1 -name "*.php" | wc -l
echo "PHP files in root: (expected 0)"

# artisan ở root (không nên có)
ls -la artisan 2>/dev/null && echo "❌ artisan in root" || echo "✅ artisan not in root"

# package.json ở root (không nên có)
ls -la package.json 2>/dev/null && echo "❌ package.json in root" || echo "✅ package.json not in root"

# composer.json ở root (không nên có)
ls -la composer.json 2>/dev/null && echo "❌ composer.json in root" || echo "✅ composer.json not in root"

# storefront-pwa/ (không nên có)
ls -d storefront-pwa/ 2>/dev/null && echo "❌ storefront-pwa in root" || echo "✅ storefront-pwa not in root"
```

---

## ✅ Checklist 3: Dependency Verification

### Backend dependencies

```bash
cd backend/

echo "=== BACKEND DEPENDENCIES ==="

# PHP version
php --version
# Expected: PHP 8.2+

# Composer packages installed
ls vendor/ | wc -l
# Expected: Nhiều packages (50+)

# Check critical packages
composer show laravel/framework | head -5
composer show nwidart/laravel-modules | head -5

# Check platform requirements
composer check-platform-reqs
# Expected: All requirements met
```

### Frontend dependencies

```bash
cd frontend/

echo "=== FRONTEND DEPENDENCIES ==="

# Node version
node --version
# Expected: v18+

# npm version
npm --version

# Check node_modules exists
ls node_modules/ | wc -l
# Expected: Nhiều packages (50+)

# Check critical packages
ls node_modules/nuxt/
ls node_modules/vue/
ls node_modules/pinia/
```

---

## ✅ Checklist 4: Test Execution

### Backend tests

```bash
cd backend/

echo "=== RUNNING BACKEND TESTS ==="

# Run all tests
php artisan test
# Expected: All tests pass

# Run với verbose output
php artisan test --verbose

# Run specific test files
php artisan test tests/Feature/AuthenticationTest.php
php artisan test tests/Feature/OrderLifecycleTest.php
php artisan test tests/Feature/InventoryTest.php
php artisan test tests/Feature/PricingTest.php
php artisan test tests/Feature/CheckoutTest.php

# Run với coverage (cần Xdebug hoặc pcov)
php artisan test --coverage --min=70
# Expected: Coverage 70%+
```

**Expected output:**

```
PASS  Tests\Feature\AuthenticationTest
PASS  Tests\Feature\OrderLifecycleTest
PASS  Tests\Feature\InventoryTest
PASS  Tests\Feature\PricingTest
PASS  Tests\Feature\CheckoutTest

Tests:  X passed (Y assertions)
Duration: Z.XXs
```

### Frontend type check

```bash
cd frontend/

echo "=== FRONTEND TYPE CHECK ==="

# TypeScript type check
npm run typecheck
# Expected: No errors

# Hoặc
npx tsc --noEmit
# Expected: No output (no errors)
```

### Frontend build test

```bash
cd frontend/

echo "=== FRONTEND BUILD TEST ==="

# Build production
npm run build
# Expected: Build success, .output/ created

# Kiểm tra build output
ls .output/
# Expected: server/ public/ (Nuxt output)
```

---

## ✅ Checklist 5: Server Startup Tests

### Start backend server

```bash
cd backend/

echo "=== BACKEND SERVER TEST ==="

# Start server
php artisan serve --port=8000 &
BACKEND_PID=$!

# Wait for server
sleep 3

# Test health endpoint
curl -s http://localhost:8000/api/health
# Expected: {"status":"ok"} hoặc 200 response

# Test routes list
php artisan route:list | head -20
# Expected: API routes hiển thị

# Stop server
kill $BACKEND_PID
```

### Start frontend server

```bash
cd frontend/

echo "=== FRONTEND SERVER TEST ==="

# Start dev server
npm run dev &
FRONTEND_PID=$!

# Wait for server
sleep 10

# Test frontend
curl -s http://localhost:3000 | head -5
# Expected: HTML response with <html>

# Stop server
kill $FRONTEND_PID
```

### Test API Communication

```bash
echo "=== API COMMUNICATION TEST ==="

# Start both servers
cd backend && php artisan serve --port=8000 &
BACKEND_PID=$!

cd ../frontend && npm run dev &
FRONTEND_PID=$!

# Wait
sleep 15

# Test API directly from backend
curl -s http://localhost:8000/api/

# Test frontend loads
curl -s http://localhost:3000 | grep -q "EcomWMS" && echo "✅ Frontend loaded" || echo "❌ Frontend failed"

# Cleanup
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
```

---

## ✅ Checklist 6: Module Verification

### Verify các modules hoạt động

```bash
cd backend/

echo "=== MODULE VERIFICATION ==="

# List modules
php artisan module:list
# Expected:
# +----------+---------+
# | Name     | Status  |
# +----------+---------+
# | Catalog  | Enabled |
# | Inventory| Enabled |
# | PIM      | Enabled |
# | WMS      | Enabled |
# | OMS      | Enabled |
# | Cart     | Enabled |
# | Pricing  | Enabled |
# | TMS      | Enabled |
# | Finance  | Enabled |
# +----------+---------+

# Check module migrations
php artisan migrate:status | grep -E "Catalog|Inventory|OMS|Cart"

# Check module routes
php artisan route:list | grep -E "catalog|inventory|orders|cart"
```

---

## 📊 Summary Report Script

Tạo script để generate full verification report:

```bash
cat > /tmp/verify_refactor.sh << 'EOF'
#!/bin/bash

echo "======================================"
echo "  REFACTOR VERIFICATION REPORT"
echo "======================================"
echo ""

PASS=0
FAIL=0

check() {
    local description="$1"
    local command="$2"
    local expected="$3"

    result=$(eval "$command" 2>&1)
    if echo "$result" | grep -q "$expected"; then
        echo "✅ PASS: $description"
        ((PASS++))
    else
        echo "❌ FAIL: $description"
        echo "   Expected: $expected"
        echo "   Got: $result"
        ((FAIL++))
    fi
}

echo "--- Root Structure ---"
check "backend/ exists" "ls ." "backend"
check "frontend/ exists" "ls ." "frontend"
check "README.md exists" "ls ." "README.md"
check "No PHP in root" "find . -maxdepth 1 -name '*.php' | wc -l" "0"
check "No artisan in root" "ls artisan 2>&1" "No such file"
check "No package.json in root" "ls package.json 2>&1" "No such file"

echo ""
echo "--- Backend ---"
cd backend/ 2>/dev/null || { echo "❌ backend/ not found!"; exit 1; }
check "app/ exists" "ls ." "app"
check "Modules/ exists" "ls ." "Modules"
check "artisan exists" "ls ." "artisan"
check "composer.json exists" "ls ." "composer.json"
check "vendor/ exists" "ls ." "vendor"
check "PHP 8.2+" "php --version" "8\."

echo ""
echo "--- Frontend ---"
cd ../frontend/ 2>/dev/null || { echo "❌ frontend/ not found!"; exit 1; }
check "nuxt.config.ts exists" "ls ." "nuxt.config.ts"
check "package.json exists" "ls ." "package.json"
check "node_modules exists" "ls ." "node_modules"
check "Node 18+" "node --version" "v1[89]\|v2[0-9]"

echo ""
echo "======================================"
echo "  RESULTS: $PASS passed, $FAIL failed"
echo "======================================"

[ $FAIL -eq 0 ] && echo "🎉 ALL CHECKS PASSED!" || echo "⚠️  Some checks failed. Review above."
EOF

chmod +x /tmp/verify_refactor.sh
bash /tmp/verify_refactor.sh
```

---

## 🔍 Kiểm tra GitHub Language Stats

Sau khi push lên GitHub, kiểm tra tỷ lệ ngôn ngữ:

1. Mở repository trên GitHub
2. Scroll xuống phần **Languages** sidebar
3. Kiểm tra tỷ lệ:

**Nếu repo root chỉ có backend/ + frontend/:**

- PHP (from backend/): ~60-70% của toàn repo
- TypeScript (from frontend/): ~15-20%
- JavaScript (from frontend/): ~10-15%
- Vue (from frontend/): ~3-5%

**Nếu muốn tách thành 2 repos riêng:**

- `ecom-wms-backend`: PHP 95%
- `ecom-wms-frontend`: TypeScript 50%, JS 40%, Vue 8%

---

## ⚠️ Những vấn đề thường gặp sau refactor

### 1. Module paths bị sai

```bash
# Kiểm tra config/modules.php
cat backend/config/modules.php | grep path

# Nếu sai, cập nhật path
# 'path' => base_path('Modules')  # Đúng
```

### 2. Storage symlinks bị hỏng

```bash
cd backend/
php artisan storage:link
```

### 3. Cache cũ

```bash
cd backend/
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
composer dump-autoload
```

### 4. Frontend không connect được backend

```bash
# Kiểm tra .env trong frontend/
cat frontend/.env | grep API_BASE
# Phải là: NUXT_PUBLIC_API_BASE=http://localhost:8000/api

# Kiểm tra CORS trong backend
cat backend/config/cors.php | grep allowed_origins
# Phải có: localhost:3000
```
