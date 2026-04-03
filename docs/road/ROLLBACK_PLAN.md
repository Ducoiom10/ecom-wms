# 🔄 ROLLBACK PLAN - Kế hoạch khôi phục

## ⚠️ Khi nào cần Rollback?

Rollback khi gặp một trong các tình huống:
1. Backend tests fail sau khi move files
2. Frontend không build được
3. API communication bị hỏng
4. Database migrations fail
5. Production bị downtime

---

## 📍 Backup Locations

### 1. Git Tags (Chính)

| Tag | Thời điểm | Mô tả |
|-----|-----------|-------|
| `backup/before-refactor-YYYYMMDD` | Trước khi bắt đầu | Full backup |
| `backup/before-root-cleanup` | Trước khi xóa root files | Có backend/ và frontend/ |
| `backup/phase2-complete` | Sau Phase 2 | Backend đã setup |
| `backup/phase3-complete` | Sau Phase 3 | Frontend đã setup |

### 2. File Backup (Phụ)

```
/backup/
└── ecom-wms-backup-YYYYMMDD.tar.gz
```

---

## 🚨 Rollback Level 1: Nhanh (< 5 phút)

### Khi nào dùng: Vừa thay đổi nhỏ, chưa push

```bash
# Undo tất cả uncommitted changes
git checkout -- .
git clean -fd  # Xóa untracked files

# Hoặc nếu đã stage
git reset HEAD
git checkout -- .
```

---

## 🚨 Rollback Level 2: Git Reset (< 10 phút)

### Khi nào dùng: Đã commit nhưng chưa push

```bash
# Xem commit history
git log --oneline -10

# Reset về commit trước
git reset --hard HEAD~1  # Undo 1 commit
git reset --hard HEAD~3  # Undo 3 commits

# Hoặc reset về commit cụ thể
git reset --hard <commit-hash>
```

---

## 🚨 Rollback Level 3: Từ Backup Tag (< 15 phút)

### Khi nào dùng: Đã push, cần revert về trạng thái backup

```bash
# Xem tất cả backup tags
git tag | grep backup

# Rollback về tag cụ thể
git checkout backup/before-refactor-YYYYMMDD

# Tạo branch mới từ backup
git checkout -b recovery/rollback-YYYYMMDD backup/before-refactor-YYYYMMDD

# Revert main branch
git checkout main
git revert --no-commit backup/before-refactor-YYYYMMDD..HEAD
git commit -m "revert: rollback to backup state"
git push origin main
```

---

## 🚨 Rollback Level 4: Full Restore từ File Backup (< 30 phút)

### Khi nào dùng: Git history bị corrupted, cần restore hoàn toàn

```bash
# 1. Backup current state (phòng hờ)
cd /path/to/workspace
cp -r ecom-wms ecom-wms-failed-$(date +%Y%m%d)

# 2. Remove current directory
rm -rf ecom-wms

# 3. Restore từ backup file
tar -xzf /backup/ecom-wms-backup-YYYYMMDD.tar.gz

# 4. Verify
cd ecom-wms
ls -la
php artisan --version

# 5. Re-install dependencies
composer install
npm install  # nếu có node_modules

echo "✅ Restore completed!"
```

---

## 📋 Rollback Procedures theo từng Phase

### 🔄 Rollback Phase 2 (Backend Setup)

**Triệu chứng:** backend/ không hoạt động

```bash
# Option 1: Xóa backend/ và retry
rm -rf backend/
mkdir backend/

# Chạy lại bước 2.1 trong REFACTOR_CHECKLIST.md
cp -r app/ backend/
# ... (các bước copy khác)

# Option 2: Rollback về trước Phase 2
git checkout backup/before-refactor-YYYYMMDD -- .
```

---

### 🔄 Rollback Phase 3 (Frontend Setup)

**Triệu chứng:** frontend/ không build được

```bash
# Option 1: Xóa frontend/ và retry
rm -rf frontend/
mkdir frontend/

# Chạy lại bước 3.1 trong REFACTOR_CHECKLIST.md
rsync -av --exclude='node_modules' storefront-pwa/ frontend/

# Option 2: Reset node_modules
cd frontend/
rm -rf node_modules/ .nuxt/ .output/
npm install
npm run build
```

---

### 🔄 Rollback Phase 4 (Root Cleanup)

**Triệu chứng:** Đã xóa root files nhưng có vấn đề

```bash
# Restore từ git tag backup/before-root-cleanup
git checkout backup/before-root-cleanup -- app/
git checkout backup/before-root-cleanup -- Modules/
git checkout backup/before-root-cleanup -- database/
git checkout backup/before-root-cleanup -- routes/
git checkout backup/before-root-cleanup -- artisan
git checkout backup/before-root-cleanup -- composer.json
git checkout backup/before-root-cleanup -- storefront-pwa/
```

---

## 🗄️ Database Rollback

### Rollback Migrations

```bash
cd backend/

# Rollback 1 migration
php artisan migrate:rollback

# Rollback n migrations
php artisan migrate:rollback --step=5

# Rollback toàn bộ
php artisan migrate:reset

# Rebuild từ đầu
php artisan migrate:fresh --seed  # ⚠️ XÓA TẤT CẢ DATA
```

### Restore Database từ backup

```bash
# Tạo backup trước
mysqldump -u root -p ecom_wms > /backup/ecom-wms-db-$(date +%Y%m%d).sql

# Restore từ backup
mysql -u root -p ecom_wms < /backup/ecom-wms-db-YYYYMMDD.sql

# Hoặc recreate và restore
mysql -u root -p -e "DROP DATABASE IF EXISTS ecom_wms; CREATE DATABASE ecom_wms;"
mysql -u root -p ecom_wms < /backup/ecom-wms-db-YYYYMMDD.sql
```

---

## 🐳 Docker Rollback

### Rollback Docker containers

```bash
# Stop current containers
docker-compose down

# Xem các image cũ
docker images | grep ecom-wms

# Restart với image cũ
docker-compose up -d --no-build

# Hoặc rebuild
docker-compose up -d --build
```

### Rollback Database trong Docker

```bash
# Backup hiện tại
docker-compose exec mysql mysqldump -u root -p ecom_wms > backup.sql

# Restore
docker-compose exec -T mysql mysql -u root -p ecom_wms < backup.sql
```

---

## 🌐 Production Rollback

### Khi nào: Production bị downtime hoặc có lỗi nghiêm trọng

```bash
# 1. Ngay lập tức: Switch về version cũ
# (Nếu dùng blue-green deployment)
# Nginx: Switch upstream từ new_server sang old_server

# 2. Backend rollback
cd /var/www/ecom-wms/backend
git fetch --all --tags
git checkout backup/before-refactor-YYYYMMDD
composer install --no-dev
php artisan migrate:rollback  # Nếu cần
php artisan config:cache
php artisan route:cache
# Restart PHP-FPM
sudo systemctl restart php8.2-fpm

# 3. Frontend rollback
cd /var/www/ecom-wms/frontend
git checkout backup/before-refactor-YYYYMMDD -- .
npm ci
npm run build
pm2 restart ecom-wms-frontend
```

---

## 📱 Emergency Contacts & Actions

### Nếu Production hoàn toàn không hoạt động:

1. **Ngay lập tức**: Enable maintenance mode
   ```bash
   php artisan down --message="Maintenance in progress" --retry=60
   ```

2. **Notify team**: Báo cáo vấn đề

3. **Rollback database** nếu cần:
   ```bash
   php artisan migrate:rollback
   ```

4. **Restore code**:
   ```bash
   git reset --hard backup/before-refactor-YYYYMMDD
   ```

5. **Re-cache**:
   ```bash
   php artisan config:cache
   php artisan route:cache
   ```

6. **Disable maintenance mode**:
   ```bash
   php artisan up
   ```

---

## ✅ Verification sau Rollback

```bash
# 1. Backend hoạt động
php artisan test
curl http://localhost:8000/api/health

# 2. Frontend hoạt động
npm run build
curl http://localhost:3000

# 3. Database OK
php artisan migrate:status

# 4. Queue worker OK
php artisan queue:work --once

echo "✅ Rollback successful!"
```

---

## 📝 Ghi chú Rollback

Sau khi rollback, ghi lại:
1. **Vấn đề gặp phải**: Mô tả cụ thể
2. **Nguyên nhân gốc**: Root cause analysis
3. **Bước thực hiện**: Các bước rollback đã làm
4. **Thời gian**: Bao lâu để recover
5. **Bài học**: Để tránh lần sau

---

## 🔍 Phòng ngừa

Để tránh cần rollback:
1. **Luôn test locally** trước khi push
2. **Chạy tests** trước mỗi deploy: `php artisan test`
3. **Test frontend build**: `npm run build`
4. **Test API communication** sau khi setup
5. **Có monitoring** để detect vấn đề sớm
6. **Backup database** trước khi migrate
7. **Deploy từng bước nhỏ** thay vì một lúc toàn bộ
