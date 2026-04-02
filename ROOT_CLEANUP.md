# 🧹 ROOT CLEANUP GUIDE - Dọn dẹp thư mục gốc

## ⚠️ QUAN TRỌNG: Chỉ thực hiện sau khi đã verify backend/ và frontend/ hoạt động!

---

## 📋 Checklist trước khi cleanup

Hãy chắc chắn đã hoàn thành:

- [ ] `backend/` đã được setup và `php artisan test` pass
- [ ] `frontend/` đã được setup và `npm run build` thành công
- [ ] API communication giữa frontend và backend hoạt động
- [ ] Đã tạo git tag backup: `git tag backup/before-cleanup`
- [ ] Đã push tag lên remote: `git push origin --tags`

---

## 🗂️ Trạng thái trước khi cleanup

```
ecom-wms/ (TRƯỚC)
├── app/                    ← Sẽ xóa (đã move vào backend/)
├── Modules/                ← Sẽ xóa (đã move vào backend/)
├── database/               ← Sẽ xóa (đã move vào backend/)
├── routes/                 ← Sẽ xóa (đã move vào backend/)
├── tests/                  ← Sẽ xóa (đã move vào backend/)
├── config/                 ← Sẽ xóa (đã move vào backend/)
├── bootstrap/              ← Sẽ xóa (đã move vào backend/)
├── storage/                ← Sẽ xóa (đã move vào backend/)
├── public/                 ← Sẽ xóa (đã move vào backend/)
├── stubs/                  ← Sẽ xóa (đã move vào backend/)
├── storefront-pwa/         ← Sẽ xóa (đã move vào frontend/)
├── resources/              ← Sẽ xóa (legacy)
├── artisan                 ← Sẽ xóa (đã move vào backend/)
├── composer.json           ← Sẽ xóa (đã move vào backend/)
├── composer.lock           ← Sẽ xóa (đã move vào backend/)
├── phpunit.xml             ← Sẽ xóa (đã move vào backend/)
├── vite.config.js          ← Sẽ xóa (đã move vào frontend/)
├── vite-module-loader.js   ← Sẽ xóa (legacy)
├── package.json            ← Sẽ xóa (đã move vào frontend/)
├── package-lock.json       ← Sẽ xóa (đã move vào frontend/)
├── modules_statuses.json   ← Sẽ xóa (đã move vào backend/)
├── check_system.php        ← Sẽ xóa (đã move vào backend/)
├── backend/                ← GIỮ LẠI ✅
├── frontend/               ← GIỮ LẠI ✅
├── docs/                   ← GIỮ LẠI ✅
├── README.md               ← Cập nhật ✅
├── .gitignore              ← Cập nhật ✅
└── .editorconfig           ← GIỮ LẠI ✅
```

```
ecom-wms/ (SAU)
├── backend/                ← PHP backend
├── frontend/               ← Nuxt.js frontend
├── docs/                   ← Documentation
├── README.md               ← Main docs
├── .gitignore              ← Updated
└── .editorconfig           ← Editor config
```

---

## 🚀 Bước 1: Tạo backup cuối cùng

```bash
cd /path/to/ecom-wms  # Root directory

# Tạo git tag trước khi cleanup
git add backend/ frontend/
git commit -m "feat: add backend/ and frontend/ structure"
git tag backup/before-root-cleanup
git push origin --tags

echo "✅ Backup created!"
```

---

## 🗑️ Bước 2: Xóa Backend files khỏi root

```bash
# ⚠️ CHỈ CHẠY SAU KHI ĐÃ VERIFY backend/ HOẠT ĐỘNG

echo "🗑️ Removing backend files from root..."

# Xóa PHP directories
rm -rf app/
rm -rf Modules/
rm -rf database/
rm -rf routes/
rm -rf tests/
rm -rf config/
rm -rf bootstrap/
rm -rf stubs/

# Xóa storage (cẩn thận - đã copy vào backend/)
rm -rf storage/

# Xóa public (đã copy vào backend/)
rm -rf public/

# Xóa backend config files
rm -f artisan
rm -f composer.json
rm -f composer.lock
rm -f phpunit.xml
rm -f modules_statuses.json
rm -f check_system.php
# Giữ lại .editorconfig ở root cho toàn bộ monorepo

echo "✅ Backend files removed from root!"
```

---

## 🗑️ Bước 3: Xóa Frontend legacy files khỏi root

```bash
echo "🗑️ Removing legacy frontend files from root..."

# Xóa storefront-pwa (đã copy vào frontend/)
rm -rf storefront-pwa/

# Xóa resources/ (legacy blade/assets)
rm -rf resources/

# Xóa vite configs
rm -f vite.config.js
rm -f vite-module-loader.js

# Xóa root package.json (đã move vào frontend/)
rm -f package.json
rm -f package-lock.json

# Xóa node_modules (cảnh báo: có thể lâu!)
echo "🗑️ Removing node_modules (this may take a while)..."
rm -rf node_modules/

# Xóa vendor nếu có ở root
rm -rf vendor/

echo "✅ Legacy frontend files removed!"
```

---

## 📝 Bước 4: Cập nhật root .gitignore

```bash
# Tạo .gitignore mới cho root (monorepo style)
cat > .gitignore << 'EOF'
# ====================================
# Backend artifacts
# ====================================
backend/vendor/
backend/.env
backend/.env.backup
backend/.env.production
backend/.env.testing
backend/.phpunit.result.cache
backend/storage/*.key
backend/storage/app/public
backend/public/hot
backend/public/storage

# ====================================
# Frontend artifacts
# ====================================
frontend/node_modules/
frontend/.nuxt/
frontend/.output/
frontend/dist/
frontend/.env
frontend/.env.local
frontend/.env.*.local

# ====================================
# Editor files
# ====================================
.idea/
.vscode/
*.DS_Store
Thumbs.db

# ====================================
# Backup files
# ====================================
*.tar.gz
*.zip
*.backup

# ====================================
# Logs
# ====================================
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOF

echo "✅ .gitignore updated!"
```

---

## 📄 Bước 5: Tạo root README.md

```bash
cat > README.md << 'EOREADME'
# 🛒 EcomWMS - E-commerce Warehouse Management System

[![PHP](https://img.shields.io/badge/PHP-8.2+-blue.svg)](https://php.net)
[![Laravel](https://img.shields.io/badge/Laravel-12.x-red.svg)](https://laravel.com)
[![Nuxt](https://img.shields.io/badge/Nuxt-3.x-green.svg)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://typescriptlang.org)

## 📁 Cấu trúc dự án

```
ecom-wms/
├── backend/          # Laravel PHP API (PHP ~95%)
│   ├── app/
│   ├── Modules/      # 9 business modules
│   ├── database/
│   └── routes/api.php
│
├── frontend/         # Nuxt.js PWA (TypeScript/Vue)
│   ├── pages/
│   ├── components/
│   └── stores/
│
└── docs/             # Documentation
```

## 🏗️ Modules

| Module | Mô tả |
|--------|-------|
| **Catalog** | Quản lý sản phẩm, danh mục, thương hiệu |
| **Inventory** | Quản lý tồn kho, kho hàng |
| **PIM** | Thông tin sản phẩm chi tiết |
| **WMS** | Quản lý kho vận (nhập/xuất hàng) |
| **OMS** | Quản lý đơn hàng |
| **Cart** | Giỏ hàng |
| **Pricing** | Tính giá, khuyến mãi, coupon |
| **TMS** | Quản lý vận chuyển |
| **Finance** | Hóa đơn, thanh toán |

## 🚀 Quick Start

### Backend (Laravel API)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
# API runs at http://localhost:8000
```

### Frontend (Nuxt.js)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# App runs at http://localhost:3000
```

## 📚 Documentation

| File | Mô tả |
|------|-------|
| [BACKEND_SETUP.md](BACKEND_SETUP.md) | Hướng dẫn setup backend chi tiết |
| [FRONTEND_SETUP.md](FRONTEND_SETUP.md) | Hướng dẫn setup frontend chi tiết |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Hướng dẫn deploy production |
| [REFACTOR_CHECKLIST.md](REFACTOR_CHECKLIST.md) | Checklist refactor |
| [VERIFICATION_GUIDE.md](VERIFICATION_GUIDE.md) | Hướng dẫn verify |
| [ROLLBACK_PLAN.md](ROLLBACK_PLAN.md) | Kế hoạch rollback |

## 🔧 Requirements

### Backend
- PHP 8.2+
- Composer 2.x
- MySQL 8.0+ / PostgreSQL 13+
- Redis 6+

### Frontend
- Node.js 18+
- npm 9+

## 📊 Language Composition

### Backend (PHP ~95%)
- PHP: ~95%
- Blade: ~3%
- JSON: ~2%

### Frontend (TypeScript/Vue ~100%)
- TypeScript: ~50%
- JavaScript: ~35%
- Vue: ~12%
- CSS: ~3%
EOREADME

echo "✅ README.md created!"
```

---

## 🗑️ Bước 6: Cleanup node_modules và vendor (Optional)

```bash
# Backend vendor - xóa để cài lại clean
cd backend/
rm -rf vendor/
composer install

# Frontend node_modules - xóa để cài lại clean
cd ../frontend/
rm -rf node_modules/
npm install

echo "✅ Dependencies reinstalled!"
```

---

## ✅ Verification sau cleanup

```bash
# 1. Kiểm tra cấu trúc root
ls -la /path/to/ecom-wms/
# Expected: backend/ frontend/ docs/ README.md .gitignore

# 2. Không còn PHP files ở root
find . -maxdepth 1 -name "*.php" | wc -l
# Expected: 0

# 3. Không còn package.json ở root
ls -la package.json 2>/dev/null
# Expected: No such file

# 4. Backend vẫn hoạt động
cd backend && php artisan test
# Expected: Tests pass

# 5. Frontend vẫn hoạt động
cd frontend && npm run build
# Expected: Build success

# 6. Git status sạch
git status
# Expected: Chỉ show deleted files (root files đã xóa)
```

---

## 📤 Commit và push

```bash
# Stage all changes
git add -A

# Commit
git commit -m "refactor: separate backend and frontend into dedicated directories

- Move PHP backend to backend/ directory
- Move Nuxt.js frontend to frontend/ directory
- Remove mixed frontend/backend files from root
- Update .gitignore for monorepo structure
- Add main README.md with project overview

Backend: PHP ~95%
Frontend: TypeScript/Vue ~100%"

# Push
git push origin main
```

---

## ⚠️ Những điều cần lưu ý

1. **KHÔNG xóa** `backend/`, `frontend/`, `docs/` - đây là cấu trúc mới
2. **CI/CD phải được cập nhật** - xem DEPLOYMENT_GUIDE.md
3. **Environment variables** phải được cập nhật trên server production
4. **Database migrations** không bị ảnh hưởng - vẫn ở `backend/database/`
5. **Symlinks** như `backend/public/storage` phải được recreate trên server

---

## 🆘 Nếu có vấn đề

```bash
# Rollback về trước khi cleanup
git checkout backup/before-root-cleanup -- .

# Hoặc reset hoàn toàn
git reset --hard backup/before-refactor-YYYYMMDD
```

Xem chi tiết trong [ROLLBACK_PLAN.md](ROLLBACK_PLAN.md)
