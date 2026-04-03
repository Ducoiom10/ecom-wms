# 📋 REFACTOR CHECKLIST - Tách Frontend & Backend

## 🎯 Mục tiêu

| Trước | Sau |
|-------|-----|
| JavaScript: 66.6% | Backend PHP: ~95% |
| PHP: 24.2% | Frontend TypeScript: ~50%, JS: ~40% |
| Vue: 4.3% | Frontend Vue: ~8% |
| Cấu trúc lẫn lộn | Tách biệt hoàn toàn |

---

## ⏱️ Thời gian ước tính: 3-5 ngày

---

## Phase 1: Backup & Planning (Ngày 1)

### ✅ Step 1.1: Tạo full backup

```bash
# Tạo git tag backup
git tag backup/before-refactor-$(date +%Y%m%d)
git push origin backup/before-refactor-$(date +%Y%m%d)

# Backup toàn bộ folder (ngoài git)
cd /path/to/workspace
tar -czf ecom-wms-backup-$(date +%Y%m%d).tar.gz ecom-wms/
```

📝 **Giải thích:**
- `git tag` tạo điểm rollback trong git history
- `tar` tạo bản sao vật lý trên filesystem

⚠️ **Lưu ý:**
- Đảm bảo tag được push lên remote
- Lưu backup file ở nơi khác (không trong repo)

🔍 **Verify:**
```bash
git tag | grep backup
# Expected output: backup/before-refactor-YYYYMMDD
```

---

### ✅ Step 1.2: Kiểm tra trạng thái hiện tại

```bash
# Xem thống kê ngôn ngữ
github linguist --breakdown

# Đếm files
find . -name "*.php" -not -path "*/vendor/*" | wc -l
find . -name "*.js" -not -path "*/node_modules/*" | wc -l
find . -name "*.vue" -not -path "*/node_modules/*" | wc -l
find . -name "*.ts" -not -path "*/node_modules/*" | wc -l
```

📝 **Giải thích:** Ghi lại số lượng file để verify sau khi refactor

🔍 **Verify:** Lưu output để so sánh sau

---

### ✅ Step 1.3: Kiểm tra dependencies hiện tại

```bash
# PHP dependencies
cat composer.json

# Frontend dependencies
cat storefront-pwa/package.json
cat package.json  # root package.json (nếu có)

# Database migrations
php artisan migrate:status
```

⚠️ **Lưu ý:** Ghi lại tất cả biến .env đang dùng

---

## Phase 2: Backend Setup (Ngày 1-2)

### ✅ Step 2.1: Tạo thư mục backend/

```bash
mkdir -p backend/

# Copy tất cả PHP files
cp -r app/ backend/
cp -r Modules/ backend/
cp -r database/ backend/
cp -r routes/ backend/
cp -r tests/ backend/
cp -r config/ backend/
cp -r bootstrap/ backend/
cp -r storage/ backend/
cp -r public/ backend/
cp -r stubs/ backend/
cp artisan backend/
cp composer.json backend/
cp composer.lock backend/
cp phpunit.xml backend/
cp .env.example backend/
cp .editorconfig backend/
```

📝 **Giải thích:**
- `cp -r` sao chép đệ quy toàn bộ thư mục
- Giữ nguyên cấu trúc Laravel chuẩn trong `backend/`

⚠️ **Lưu ý:**
- KHÔNG copy `node_modules/`, `vendor/` (sẽ cài lại)
- KHÔNG copy `storefront-pwa/`, `resources/` (phần frontend)

🔍 **Verify:**
```bash
ls backend/
# Expected: app/ Modules/ database/ routes/ tests/ config/ composer.json artisan
```

---

### ✅ Step 2.2: Xóa frontend files khỏi backend/

```bash
# Xóa vite configs trong modules
find backend/Modules -name "vite.config.js" -delete
find backend/Modules -name "package.json" -delete

# Xóa resources/js và resources/css trong modules
find backend/Modules -type d -name "js" -exec rm -rf {} + 2>/dev/null
find backend/Modules -type d -name "css" -exec rm -rf {} + 2>/dev/null
find backend/Modules -type d -name "sass" -exec rm -rf {} + 2>/dev/null

# Chỉ giữ resources/views (Blade templates nếu dùng)
# Nếu dùng pure API, xóa luôn resources/
```

📝 **Giải thích:** Backend chỉ cần PHP, không cần JS/CSS/Vue files

⚠️ **Lưu ý:** Nếu modules có Blade views cần giữ, KHÔNG xóa resources/views

---

### ✅ Step 2.3: Tạo backend/.gitignore

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
.phpunit.result.cache
Homestead.json
Homestead.yaml
npm-debug.log
yarn-error.log
/.idea
/.vscode
*.DS_Store
EOF
```

---

### ✅ Step 2.4: Cài dependencies và test backend

```bash
cd backend/

# Install PHP dependencies
composer install --no-dev --optimize-autoloader  # Production
# Hoặc:
composer install  # Development

# Copy .env
cp .env.example .env
php artisan key:generate

# Chỉnh sửa .env với thông tin database
nano .env

# Run migrations
php artisan migrate

# Run tests
php artisan test
```

⚠️ **Lưu ý:** Phải cấu hình DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD

🔍 **Verify:**
```bash
php artisan test
# Expected: All tests passed
php artisan route:list
# Expected: Danh sách routes hiển thị
```

---

### ✅ Step 2.5: Verify backend hoạt động

```bash
cd backend/

# Start server
php artisan serve --port=8000

# Test API endpoint
curl http://localhost:8000/api/health
# Expected: {"status": "ok"}
```

---

## Phase 3: Frontend Setup (Ngày 2-3)

### ✅ Step 3.1: Tạo thư mục frontend/

```bash
mkdir -p frontend/

# Copy từ storefront-pwa (Nuxt.js app)
cp -r storefront-pwa/src/ frontend/ 2>/dev/null || true
cp -r storefront-pwa/pages/ frontend/ 2>/dev/null || true
cp -r storefront-pwa/components/ frontend/ 2>/dev/null || true
cp -r storefront-pwa/composables/ frontend/ 2>/dev/null || true
cp -r storefront-pwa/layouts/ frontend/ 2>/dev/null || true
cp -r storefront-pwa/stores/ frontend/ 2>/dev/null || true
cp -r storefront-pwa/middleware/ frontend/ 2>/dev/null || true
cp -r storefront-pwa/plugins/ frontend/ 2>/dev/null || true
cp -r storefront-pwa/assets/ frontend/ 2>/dev/null || true
cp -r storefront-pwa/types/ frontend/ 2>/dev/null || true
cp -r storefront-pwa/public/ frontend/ 2>/dev/null || true
cp storefront-pwa/package.json frontend/
cp storefront-pwa/package-lock.json frontend/ 2>/dev/null || true
cp storefront-pwa/nuxt.config.ts frontend/
cp storefront-pwa/tsconfig.json frontend/ 2>/dev/null || true
cp storefront-pwa/tailwind.config.ts frontend/ 2>/dev/null || true
cp storefront-pwa/app.vue frontend/ 2>/dev/null || true
cp storefront-pwa/error.vue frontend/ 2>/dev/null || true
```

📝 **Giải thích:** Copy toàn bộ Nuxt.js project từ storefront-pwa sang frontend/

---

### ✅ Step 3.2: Tạo frontend/.env.example

```bash
cat > frontend/.env.example << 'EOF'
# API Backend URL
NUXT_PUBLIC_API_URL=http://localhost:8000/api

# App settings
NUXT_PUBLIC_APP_NAME=EcomWMS
NUXT_PUBLIC_APP_ENV=development

# Optional: WebSocket (Laravel Reverb)
NUXT_PUBLIC_WS_HOST=localhost
NUXT_PUBLIC_WS_PORT=8080
EOF
```

---

### ✅ Step 3.3: Tạo frontend/.gitignore

```bash
cat > frontend/.gitignore << 'EOF'
node_modules/
.nuxt/
.output/
dist/
.env
.env.local
.env.*.local
*.log
.DS_Store
.idea/
.vscode/
EOF
```

---

### ✅ Step 3.4: Cập nhật API endpoint trong frontend

```bash
# Kiểm tra file nuxt.config.ts để xem API config
cat frontend/nuxt.config.ts

# Update API base URL (nếu cần)
# Tìm và thay thế URL cũ
grep -r "localhost" frontend/ --include="*.ts" --include="*.js" --include="*.vue"
grep -r "API_URL\|apiUrl\|baseURL" frontend/ --include="*.ts" --include="*.js"
```

---

### ✅ Step 3.5: Install dependencies và test frontend

```bash
cd frontend/

# Install dependencies
npm install

# Copy .env
cp .env.example .env
nano .env  # Chỉnh NUXT_PUBLIC_API_URL

# Start dev server
npm run dev
# Expected: Server chạy tại http://localhost:3000

# Build production
npm run build
```

🔍 **Verify:**
```bash
# Dev server chạy được
open http://localhost:3000

# Build thành công
npm run build
# Expected: .output/ folder được tạo
```

---

## Phase 4: Cleanup Root (Ngày 3)

### ✅ Step 4.1: Xóa backend files khỏi root

```bash
cd /path/to/ecom-wms/  # Root directory

# Xóa PHP backend files (đã move vào backend/)
rm -rf app/
rm -rf Modules/
rm -rf database/
rm -rf routes/
rm -rf tests/
rm -rf config/
rm -rf bootstrap/
rm -rf stubs/
rm -f artisan
rm -f composer.json
rm -f composer.lock
rm -f phpunit.xml
```

⚠️ **QUAN TRỌNG:** Làm bước này CHỈ sau khi đã verify backend/ hoạt động hoàn toàn!

---

### ✅ Step 4.2: Xóa frontend legacy files khỏi root

```bash
# Xóa storefront-pwa (đã move vào frontend/)
rm -rf storefront-pwa/

# Xóa resources/ nếu không còn dùng
rm -rf resources/

# Xóa vite config ở root
rm -f vite.config.js
rm -f vite-module-loader.js
rm -f package.json
rm -f package-lock.json
rm -rf node_modules/

# Xóa storage/ (chuyển vào backend/)
rm -rf storage/

# Xóa public/ (chuyển vào backend/)
rm -rf public/
```

⚠️ **Lưu ý:** Xóa `node_modules/` có thể mất thời gian vì rất nhiều files

---

### ✅ Step 4.3: Cập nhật root .gitignore

```bash
cat > .gitignore << 'EOF'
# Temporary files
*.log
*.tmp
.DS_Store
.idea/
.vscode/

# Backend build artifacts
backend/vendor/
backend/.env
backend/storage/*.key
backend/storage/app/public

# Frontend build artifacts
frontend/node_modules/
frontend/.nuxt/
frontend/.output/
frontend/dist/
frontend/.env
frontend/.env.local

# Backup files
*.tar.gz
*.backup
EOF
```

---

### ✅ Step 4.4: Tạo root README.md

```bash
cat > README.md << 'EOF'
# EcomWMS - E-commerce Warehouse Management System

## 📁 Cấu trúc dự án

```
ecom-wms/
├── backend/          # Laravel PHP API (PHP ~95%)
├── frontend/         # Nuxt.js PWA (TypeScript/Vue ~100%)
├── docs/             # Documentation
└── README.md
```

## 🚀 Quick Start

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend (Nuxt.js)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 📚 Documentation
- [Backend Setup](docs/BACKEND_SETUP.md)
- [Frontend Setup](docs/FRONTEND_SETUP.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
EOF
```

---

## Phase 5: Testing & Verification (Ngày 4)

### ✅ Step 5.1: Verify cấu trúc thư mục

```bash
# Root chỉ có backend/, frontend/, docs/, README.md
ls -la
# Expected:
# backend/
# frontend/
# docs/
# README.md
# .gitignore

# Backend structure
ls backend/
# Expected: app/ Modules/ database/ routes/ tests/ config/ composer.json artisan

# Frontend structure
ls frontend/
# Expected: pages/ components/ composables/ package.json nuxt.config.ts
```

---

### ✅ Step 5.2: Verify backend hoạt động

```bash
cd backend/

# Check PHP version
php --version
# Expected: PHP 8.2+

# Check dependencies
composer check-platform-reqs
# Expected: All requirements met

# Run migrations
php artisan migrate:status
# Expected: All migrations ran

# Run tests
php artisan test
# Expected: Tests: X passed

# Test API
php artisan serve &
curl http://localhost:8000/api/
```

---

### ✅ Step 5.3: Verify frontend hoạt động

```bash
cd frontend/

# Check Node version
node --version
# Expected: v18+ hoặc v20+

# Check dependencies installed
ls node_modules/ | head -5
# Expected: Thư mục node_modules tồn tại

# Build test
npm run build
# Expected: Build succeeded, .output/ created

# Dev test
npm run dev &
curl http://localhost:3000
# Expected: HTML response
```

---

### ✅ Step 5.4: Verify API communication

```bash
# 1. Start backend
cd backend && php artisan serve &

# 2. Start frontend
cd frontend && npm run dev &

# 3. Test trong browser
open http://localhost:3000

# 4. Check network tab - API calls phải đi đến localhost:8000
# Expected: Không có CORS errors
```

---

### ✅ Step 5.5: Verify language composition

```bash
# Sau khi cleanup, check GitHub language stats
git add .
git commit -m "refactor: separate backend and frontend"
git push

# Xem trên GitHub repo > Languages
# Expected:
# - backend/ -> PHP 95%+
# - frontend/ -> TypeScript 50%+, JavaScript 40%, Vue 8%
```

---

### ✅ Step 5.6: Run full test suite

```bash
# Backend tests
cd backend
php artisan test --parallel

# Frontend type check
cd frontend
npx tsc --noEmit

# Frontend lint
npm run lint  # nếu có
```

---

## Phase 6: Final Deployment (Ngày 5)

### ✅ Step 6.1: Cập nhật CI/CD

```bash
# Cập nhật .github/workflows/ để build backend và frontend riêng
# Xem DEPLOYMENT_GUIDE.md để chi tiết
```

---

### ✅ Step 6.2: Deploy backend

```bash
cd backend/

# Production install
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations (production)
php artisan migrate --force

# Setup queue worker
php artisan queue:work --daemon
```

---

### ✅ Step 6.3: Deploy frontend

```bash
cd frontend/

# Production build
npm ci --production
npm run build

# Output ở .output/ - deploy lên CDN hoặc server
```

---

### ✅ Step 6.4: Final verification

```bash
# Check production URLs
curl https://api.your-domain.com/api/health
# Expected: {"status": "ok"}

curl https://your-domain.com
# Expected: 200 OK - Frontend loaded
```

---

## 📊 Checklist Tổng hợp

### Phase 1: Backup & Planning
- [ ] Tạo git tag backup
- [ ] Ghi lại số lượng files hiện tại
- [ ] Kiểm tra dependencies

### Phase 2: Backend Setup
- [ ] Tạo backend/ folder
- [ ] Copy PHP files
- [ ] Xóa frontend files khỏi backend/
- [ ] Tạo backend/.gitignore
- [ ] Test backend hoạt động

### Phase 3: Frontend Setup
- [ ] Tạo frontend/ folder
- [ ] Copy từ storefront-pwa/
- [ ] Tạo .env.example
- [ ] Tạo .gitignore
- [ ] Test frontend hoạt động

### Phase 4: Cleanup Root
- [ ] Xóa backend files khỏi root
- [ ] Xóa frontend legacy files
- [ ] Cập nhật root .gitignore
- [ ] Cập nhật root README.md

### Phase 5: Testing
- [ ] Verify cấu trúc thư mục
- [ ] Verify backend tests pass
- [ ] Verify frontend builds
- [ ] Verify API communication
- [ ] Verify language composition
- [ ] Run full test suite

### Phase 6: Deployment
- [ ] Cập nhật CI/CD
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Final verification

---

## ⚠️ Những điều QUAN TRỌNG cần nhớ

1. **LUÔN backup trước** khi bắt đầu bất kỳ bước nào
2. **Không xóa root files** cho đến khi verify backend/ và frontend/ hoạt động hoàn toàn
3. **Cập nhật .env** cho cả backend/ và frontend/ với đúng URLs
4. **Test API communication** trước khi deploy production
5. **Giữ git history** - không force push sau khi đã push

---

## 🆘 Nếu gặp vấn đề

Xem [ROLLBACK_PLAN.md](ROLLBACK_PLAN.md) để biết cách khôi phục
