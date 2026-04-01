# 🚀 LỘ TRÌNH TRIỂN KHAI (Deployment Strategy)

> **Ngày bắt đầu:** Tuần 13 (sau hoàn thành testing)  
> **Phases:** Development → Staging → Production  
> **Mục tiêu:** Zero-downtime deployment

---

## 📊 DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────────┐
│         Developer Laptop (Local)             │
│  Laravel + Nuxt 3 (localhost:8000/3000)     │
└────────────────┬────────────────────────────┘
                 │ git push
                 ▼
┌─────────────────────────────────────────────┐
│       GitHub (Main Branch)                   │
│    Code + CI/CD Pipeline (Actions)           │
└────────────────┬────────────────────────────┘
                 │ Auto-deploy on merge
                 ▼
┌─────────────────────────────────────────────┐
│        Staging Server                        │
│  Test all changes in production-like env     │
│  - Full database sync                        │
│  - All services running                      │
│  - Load testing                              │
└────────────────┬────────────────────────────┘
                 │ Manual approval
                 ▼
┌─────────────────────────────────────────────┐
│        Production Server                     │
│  E-commerce WMS live for customers           │
│  - Blue-Green deployment                     │
│  - Auto backup before deploy                 │
│  - Rollback capability                       │
└─────────────────────────────────────────────┘
```

---

## 🏗️ SERVER INFRASTRUCTURE

### Development Environment

```
Laptop Local:
├─ PHP 8.2.20 (built-in server)
├─ Node.js 18+ (npm dev server)
├─ MySQL 8.0 (local)
├─ Redis (optional, for caching)
└─ Mail Trap (email testing)
```

### Staging Environment

```
VPS/Cloud (AWS/Linode/DigitalOcean):
├─ 2GB RAM, 2 vCPU
├─ Ubuntu 22.04 LTS
├─ Nginx (reverse proxy)
├─ PHP-FPM 8.2
├─ MySQL 8.0 (full DB)
├─ Redis 7.0 (caching + queue)
├─ Node.js 18 (Nuxt SSR)
├─ SSL/TLS certificate (Let's Encrypt)
└─ Backups (daily)
```

### Production Environment

```
High-Availability Setup:
├─ Load Balancer (Nginx/HAProxy)
├─ App Server 1 (PHP-FPM)
├─ App Server 2 (PHP-FPM)
├─ Database Primary (MySQL)
├─ Database Replica (MySQL)
├─ Redis Cluster (Master-Slave)
├─ CDN (Cloudflare)
├─ Object Storage (S3/Spaces for images)
└─ Monitoring (New Relic/DataDog)
```

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### Code Quality

- [ ] All tests passing (>80% coverage)
- [ ] No linting errors (PHP CS Fixer, ESLint)
- [ ] Code review approved
- [ ] Security audit passed (static analysis)
- [ ] Documentation updated

### Database

- [ ] Migrations tested on staging
- [ ] Rollback procedure verified
- [ ] Backup automated (Daily at 2 AM UTC)
- [ ] Data validation scripts ready

### Environment

- [ ] .env.production configured
- [ ] All secrets in secure vault (not in code)
- [ ] API keys rotated
- [ ] Database credentials rotated

### Performance

- [ ] Lighthouse audit >90
- [ ] Load testing passed (1000 concurrent users)
- [ ] Database queries optimized (no N+1)
- [ ] Cache configured
- [ ] CDN set up

### Security

- [ ] SQL injection prevention validated
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] CORS properly configured
- [ ] SSL/TLS enabled (HTTPS only)
- [ ] Rate limiting implemented
- [ ] Admin panel behind VPN/2FA

---

## 🔧 DEPLOYMENT PROCESS

### STEP 1: Staging Deployment

#### 1.1 Prepare Staging Server

```bash
# SSH into staging server
ssh ubuntu@staging.ecom-wms.com

# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install dependencies (one-time)
sudo apt-get install -y php8.2-fpm php8.2-mysql php8.2-redis php8.2-curl
sudo apt-get install -y nginx mysql-server redis-server nodejs npm
```

#### 1.2 Clone Repository

```bash
cd /var/www
git clone https://github.com/your-username/ecom-wms.git
cd ecom-wms

# Create .env from production template
cp .env.staging .env

# Install dependencies
composer install --no-dev --optimize-autoloader
npm install --production

# Build frontend
npm run build
```

#### 1.3 Setup Database

```bash
# Run migrations
php artisan migrate --force

# Seed initial data
php artisan db:seed --force

# Create admin user
php artisan tinker
# User::factory()->create(['email' => 'admin@staging.local', 'role' => 'admin'])
```

#### 1.4 Configure Services

```bash
# Set permissions
sudo chown -R www-data:www-data /var/www/ecom-wms
sudo chmod -R 755 /var/www/ecom-wms/storage

# Start PHP-FPM
sudo systemctl start php8.2-fpm

# Start Nginx
sudo systemctl start nginx

# Start Laravel queue worker (Supervisor)
sudo systemctl start supervisor

# Start Redis
sudo systemctl start redis-server

# Verify services running
sudo systemctl status php8.2-fpm
sudo systemctl status nginx
sudo systemctl status mysql
sudo systemctl status redis-server
```

#### 1.5 Setup SSL Certificate

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Generate certificate (Let's Encrypt)
sudo certbot certonly --nginx -d staging.ecom-wms.com

# Auto-renewal (Certbot handles this)
sudo systemctl enable certbot.timer
```

#### 1.6 Configure Nginx

```nginx
# /etc/nginx/sites-available/ecom-wms-staging

upstream php_backend {
    server 127.0.0.1:9000;
}

upstream nuxt_backend {
    server 127.0.0.1:3000;
}

# Redirect HTTP → HTTPS
server {
    listen 80;
    server_name staging.ecom-wms.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name staging.ecom-wms.com;

    ssl_certificate /etc/letsencrypt/live/staging.ecom-wms.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/staging.ecom-wms.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Laravel API
    location /api {
        proxy_pass http://php_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Admin Panel
    location /admin {
        proxy_pass http://php_backend;
        proxy_set_header Host $host;
    }

    # Nuxt Storefront
    location / {
        proxy_pass http://nuxt_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://nuxt_backend;
        expires 1d;
        add_header Cache-Control "public, max-age=86400";
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/ecom-wms-staging /etc/nginx/sites-enabled/
sudo nginx -t  # Test config
sudo systemctl reload nginx
```

#### 1.7 Monitor Staging

```bash
# Check Laravel logs
tail -f storage/logs/laravel.log

# Check Nginx access logs
tail -f /var/log/nginx/staging.ecom-wms.com.access.log

# Check error logs
tail -f /var/log/nginx/staging.ecom-wms.com.error.log

# Monitor system resources
watch -n 1 'free -h && du -sh /var/www/ecom-wms'

# Test API
curl -X GET https://staging.ecom-wms.com/api/products

# Test Nuxt frontend
curl -s https://staging.ecom-wms.com | head -20
```

---

### STEP 2: Production Deployment (Blue-Green)

#### 2.1 Blue-Green Setup

```
Current (Blue):
└─ /var/www/ecom-wms-blue
   ├─ Laravel API
   ├─ Nuxt frontend
   └─ In production, serving customers

New (Green):
└─ /var/www/ecom-wms-green
   ├─ New version (being deployed)
   └─ Testing before switch
```

#### 2.2 Deploy to Green

```bash
ssh ubuntu@production.ecom-wms.com

cd /var/www/ecom-wms-green

# Update code
git fetch origin
git checkout v1.0.0  # tag or branch

# Install dependencies
composer install --no-dev --optimize-autoloader
npm install --production
npm run build

# Migrate database (with backup)
php artisan migrate --force

# Clear caches
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### 2.3 Run Tests on Green

```bash
# Run test suite
php artisan test

# Performance test
php artisan tinker
# App\Models\Product::all()->count()

# E2E tests
# npm run test:e2e (from staging)

# Manual smoke tests
curl -X GET https://green.ecom-wms.com/api/products
```

#### 2.4 Switch Traffic (Blue → Green)

```bash
# Update Nginx to point to green
sudo sed -i 's/_blue/_green/g' /etc/nginx/sites-available/ecom-wms-production
sudo nginx -t
sudo systemctl reload nginx

# Wait & monitor for errors
sleep 5
tail -f /var/log/nginx/production.ecom-wms.com.error.log
```

#### 2.5 Keep Blue as Rollback

```bash
# If issues detected within 10 minutes, switch back
sudo sed -i 's/_green/_blue/g' /etc/nginx/sites-available/ecom-wms-production
sudo systemctl reload nginx

# Investigate issue
tail -100 /var/www/ecom-wms-green/storage/logs/laravel.log
```

---

## 📊 DATABASE MIGRATION STRATEGY

### Zero-Downtime Migrations

```lua
-- Good (safe to deploy while app running):
ALTER TABLE products ADD COLUMN sku VARCHAR(255) AFTER name;

-- Bad (locks table):
ALTER TABLE products MODIFY COLUMN sku VARCHAR(255) NOT NULL;

-- Better (online):
ALTER TABLE products MODIFY COLUMN sku VARCHAR(255) NOT NULL, ALGORITHM=INPLACE, LOCK=NONE;
```

### Deployment Steps

```bash
# 1. BEFORE deployment: Backup production database
mysqldump -u root -p ecom_wms > backups/ecom_wms_$(date +%Y%m%d_%H%M%S).sql
gzip backups/ecom_wms_*.sql

# 2. Run safe migrations (in Green)
php artisan migrate --force

# 3. After switch: Monitor for errors
tail -f /var/log/mysql/error.log

# 4. If issue: Rollback
php artisan migrate:rollback
# Restore from backup if needed
mysql -u root -p ecom_wms < backups/ecom_wms_YYYYMMDD_HHMMSS.sql
```

---

## 🔒 SECURITY CHECKLIST

- [ ] HTTPS enforced (HTTP → 301 redirect)
- [ ] Security headers configured (HSTS, CSP, X-Frame-Options)
- [ ] `.env` NOT in git (use .env.example)
- [ ] Database credentials stored in secure vault
- [ ] API keys in environment variables
- [ ] Rate limiting enabled (/api limits: 100 req/min)
- [ ] CORS whitelist configured
- [ ] SQL injection prevention (prepared statements)
- [ ] XSS protection (escape output)
- [ ] CSRF tokens on forms
- [ ] Admin panel behind VPN/2FA
- [ ] File upload validation
- [ ] Password hashing (bcrypt)
- [ ] Session timeout: 24 hours
- [ ] Regular security audits

---

## 📈 MONITORING & ALERTS

### New Relic (APM)

```bash
# Install New Relic agent
sudo apt-get install newrelic-php5

# Configure
sudo newrelic-install install

# Restart PHP-FPM
sudo systemctl restart php8.2-fpm
```

Alert conditions:

- [ ] Error rate > 1%
- [ ] Response time > 2 seconds
- [ ] Database query > 1 second
- [ ] CPU usage > 80%
- [ ] Memory usage > 85%
- [ ] Disk usage > 90%

### Uptime Monitoring

```bash
# Use service like Uptime Robot
# Ping: https://production.ecom-wms.com/api/health
# Interval: every 5 minutes
# Alert on failure: email + Slack
```

### Log Management (ELK Stack)

```yaml
# Elasticsearch + Kibana + Logstash
# Centralize all logs:
# - /var/log/nginx/
# - storage/logs/laravel.log
# - /var/log/mysql/
```

---

## 🔄 CONTINUOUS DEPLOYMENT (CI/CD)

### GitHub Actions Workflow

```yaml
name: Deploy to Production

on:
    release: # Triggered when tag pushed
        types: [created]

jobs:
    deploy:
        runs-on: ubuntu-latest
        environment: production

        steps:
            - uses: actions/checkout@v3
              with:
                  ref: ${{ github.ref }}

            - name: Run tests
              run: |
                  composer install
                  php artisan test --coverage

            - name: Deploy to staging
              run: |
                  ssh ubuntu@staging.ecom-wms.com 'cd /var/www/ecom-wms && \
                  git fetch && git checkout ${{ github.ref_name }} && \
                  composer install --no-dev && \
                  npm run build && \
                  php artisan migrate --force'

            - name: E2E tests on staging
              run: npm run test:e2e

            - name: Deploy to production (Blue-Green)
              run: |
                  ssh ubuntu@production.ecom-wms.com 'cd /var/www/ecom-wms-green && \
                  git fetch && git checkout ${{ github.ref_name }} && \
                  composer install --no-dev && \
                  npm run build && \
                  php artisan migrate --force && \
                  php artisan test'

            - name: Switch traffic to Green
              run: |
                  ssh ubuntu@production.ecom-wms.com \
                  'sudo sed -i "s/_blue/_green/g" /etc/nginx/sites-available/ecom-wms-production && \
                  sudo systemctl reload nginx'

            - name: Smoke test
              run: |
                  sleep 5
                  curl -X GET https://ecom-wms.com/api/products | jq '.success'

            - name: Notify Slack
              run: |
                  echo "Deployment successful: ${{ github.ref_name }}" | \
                  curl -X POST ${{ secrets.SLACK_WEBHOOK }}
```

---

## ✅ POST-DEPLOYMENT CHECKLIST

- [ ] Test all critical flows (Checkout, Orders, Admin)
- [ ] Check error logs (no 500 errors)
- [ ] Monitor performance metrics
- [ ] Verify database connectivity
- [ ] Test payment gateway integration
- [ ] Check email delivery (transactional + promotional)
- [ ] Verify file uploads working
- [ ] Test real-time features (WebSockets)
- [ ] Check API rate limiting
- [ ] Monitor queue jobs (no stuck jobs)

---

## 🚨 ROLLBACK PROCEDURE

```bash
# If critical issue in production:

# 1. Switch back to Blue
ssh ubuntu@production.ecom-wms.com
sudo sed -i 's/_green/_blue/g' /etc/nginx/sites-available/ecom-wms-production
sudo systemctl reload nginx

# 2. Verify traffic back to Blue
curl -X GET https://ecom-wms.com/api/products

# 3. Investigate Green issue
tail -100 /var/www/ecom-wms-green/storage/logs/laravel.log

# 4. If database rollback needed
mysql -u root -p ecom_wms < backups/ecom_wms_BACKUP.sql

# 5. Notify team
# Slack message: "Rolled back to Blue version. Investigating..."
```

---

## 📊 DEPLOYMENT CHECKLIST (Final)

### Before Production Release

- [ ] All features tested
- [ ] Code reviewed
- [ ] Security audit passed
- [ ] Performance tested (load testing)
- [ ] Documentation updated
- [ ] Database migrations tested
- [ ] Rollback plan documented
- [ ] Team trained on new features
- [ ] Customer communication ready

### On Deployment Day

- [ ] Maintenance window scheduled
- [ ] Backup created
- [ ] Team on-call for monitoring
- [ ] Rollback plan ready
- [ ] Communication channels open

### After Deployment

- [ ] Monitor logs for 24 hours
- [ ] Customer support briefed
- [ ] Analytics verified
- [ ] Performance metrics normal
- [ ] Post-incident review scheduled (if issues found)

---

**Last Updated:** 01/04/2026  
**Version:** 1.0  
**Status:** Deployment strategy complete
