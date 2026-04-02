# 🚀 DEPLOYMENT GUIDE - Hướng dẫn Deploy

## 📋 Tổng quan

Guide này bao gồm hướng dẫn deploy cho cả Backend (Laravel) và Frontend (Nuxt.js) lên production.

---

## 🏗️ Kiến trúc Deploy

```
Internet
    │
    ▼
┌─────────────────────────────────────┐
│           Nginx / Reverse Proxy      │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   Frontend (Port 3000)      │   │
│  │   Nuxt.js SSR/Static        │   │
│  │   https://your-domain.com   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   Backend API (Port 8000)   │   │
│  │   Laravel + PHP-FPM         │   │
│  │   https://api.your-domain   │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
         │              │
    ┌────┴────┐    ┌────┴────┐
    │  MySQL  │    │  Redis  │
    │  :3306  │    │  :6379  │
    └─────────┘    └─────────┘
```

---

## 🐳 Option 1: Docker Deployment (Khuyến nghị)

### Bước 1: Tạo docker-compose.yml ở root

```yaml
version: '3.8'

services:
  # ====================================
  # Backend - Laravel API
  # ====================================
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: ecom-wms-backend
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - APP_ENV=production
      - APP_DEBUG=false
      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_DATABASE=${DB_DATABASE}
      - DB_USERNAME=${DB_USERNAME}
      - DB_PASSWORD=${DB_PASSWORD}
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - FRONTEND_URL=${FRONTEND_URL}
    volumes:
      - backend_storage:/var/www/html/storage
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - ecom-network

  # ====================================
  # Frontend - Nuxt.js
  # ====================================
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        - NUXT_PUBLIC_API_URL=${NUXT_PUBLIC_API_URL}
    container_name: ecom-wms-frontend
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NUXT_PUBLIC_API_URL=${NUXT_PUBLIC_API_URL}
    depends_on:
      - backend
    networks:
      - ecom-network

  # ====================================
  # Queue Worker
  # ====================================
  queue:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: ecom-wms-queue
    restart: unless-stopped
    command: php artisan queue:work --daemon --queue=default,emails,notifications
    environment:
      - APP_ENV=production
      - DB_HOST=mysql
      - REDIS_HOST=redis
    depends_on:
      - mysql
      - redis
    networks:
      - ecom-network

  # ====================================
  # MySQL Database
  # ====================================
  mysql:
    image: mysql:8.0
    container_name: ecom-wms-mysql
    restart: unless-stopped
    ports:
      - "3306:3306"
    environment:
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_USER: ${DB_USERNAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 10s
      retries: 5
    networks:
      - ecom-network

  # ====================================
  # Redis Cache
  # ====================================
  redis:
    image: redis:7-alpine
    container_name: ecom-wms-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - ecom-network

  # ====================================
  # Nginx Reverse Proxy
  # ====================================
  nginx:
    image: nginx:alpine
    container_name: ecom-wms-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend
      - frontend
    networks:
      - ecom-network

volumes:
  mysql_data:
  redis_data:
  backend_storage:

networks:
  ecom-network:
    driver: bridge
```

### Bước 2: Tạo backend/Dockerfile

```dockerfile
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    mysql-client

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    opcache

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy application
COPY . .

# Run post-install scripts
RUN composer dump-autoload --optimize

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Create .env from example if not exists
RUN cp .env.example .env 2>/dev/null || true

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
```

### Bước 3: Tạo frontend/Dockerfile

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build arguments for environment
ARG NUXT_PUBLIC_API_URL
ENV NUXT_PUBLIC_API_URL=$NUXT_PUBLIC_API_URL

# Build
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine

WORKDIR /app

# Copy build output
COPY --from=builder /app/.output ./

EXPOSE 3000

CMD ["node", "server/index.mjs"]
```

### Bước 4: Tạo .env ở root (Docker environment)

```bash
cat > .env << 'EOF'
# Database
DB_DATABASE=ecom_wms
DB_USERNAME=ecom_user
DB_PASSWORD=strong_password_here
DB_ROOT_PASSWORD=root_password_here

# URLs
FRONTEND_URL=http://localhost:3000
NUXT_PUBLIC_API_URL=http://localhost:8000/api

# Production URLs (thay bằng domain thật)
# FRONTEND_URL=https://your-domain.com
# NUXT_PUBLIC_API_URL=https://api.your-domain.com/api
EOF
```

### Bước 5: Run Docker deployment

```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Xem logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Run migrations
docker-compose exec backend php artisan migrate --force

# Seed data
docker-compose exec backend php artisan db:seed

# Check status
docker-compose ps
```

---

## 🖥️ Option 2: Server Deployment (VPS)

### Backend Deployment

```bash
# 1. Clone repository
git clone https://github.com/Ducoiom10/ecom-wms.git
cd ecom-wms/backend

# 2. Install dependencies
composer install --no-dev --optimize-autoloader

# 3. Setup .env
cp .env.example .env
nano .env  # Cấu hình production settings

# 4. Generate key
php artisan key:generate

# 5. Run migrations
php artisan migrate --force

# 6. Seed data (nếu cần)
php artisan db:seed --force

# 7. Cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 8. Setup storage
php artisan storage:link
chmod -R 775 storage/
chown -R www-data:www-data storage/

# 9. Setup Supervisor cho queue worker
# (xem bên dưới)
```

### Backend Nginx Config

```nginx
server {
    listen 80;
    server_name api.your-domain.com;
    root /var/www/ecom-wms/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### Backend Supervisor Config (Queue Worker)

```ini
# /etc/supervisor/conf.d/ecom-wms-queue.conf
[program:ecom-wms-queue]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/ecom-wms/backend/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/ecom-wms/backend/storage/logs/queue.log
stopwaitsecs=3600
```

```bash
# Enable và start supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start ecom-wms-queue:*
sudo supervisorctl status
```

### Frontend Deployment

```bash
cd ecom-wms/frontend

# Install dependencies
npm ci

# Set production environment
cat > .env << 'EOF'
NUXT_PUBLIC_API_URL=https://api.your-domain.com/api
NUXT_PUBLIC_APP_NAME=EcomWMS
NUXT_PUBLIC_APP_ENV=production
EOF

# Build production
npm run build

# Start production server
node .output/server/index.mjs

# Hoặc dùng PM2
npm install -g pm2
pm2 start .output/server/index.mjs --name ecom-wms-frontend
pm2 save
pm2 startup
```

### Frontend Nginx Config

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔒 SSL/HTTPS Setup

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
sudo certbot --nginx -d api.your-domain.com

# Auto renewal
sudo crontab -e
# Thêm: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 📊 Environment Variables (Production)

### backend/.env (Production)

```dotenv
APP_NAME=EcomWMS
APP_ENV=production
APP_KEY=base64:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
APP_DEBUG=false
APP_URL=https://api.your-domain.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecom_wms_prod
DB_USERNAME=ecom_user
DB_PASSWORD=strong_password

BROADCAST_DRIVER=reverb
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=redis_password
REDIS_PORT=6379

FRONTEND_URL=https://your-domain.com
SANCTUM_STATEFUL_DOMAINS=your-domain.com

REVERB_APP_ID=prod-app-id
REVERB_APP_KEY=prod-app-key
REVERB_APP_SECRET=prod-app-secret
REVERB_HOST=reverb.your-domain.com
REVERB_PORT=443
REVERB_SCHEME=https
```

### frontend/.env (Production)

```dotenv
NUXT_PUBLIC_API_URL=https://api.your-domain.com/api
NUXT_PUBLIC_APP_NAME=EcomWMS
NUXT_PUBLIC_APP_ENV=production
NUXT_PUBLIC_WS_HOST=reverb.your-domain.com
NUXT_PUBLIC_WS_PORT=443
NUXT_PUBLIC_WS_KEY=prod-app-key
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Tạo `.github/workflows/deploy.yml`:

```yaml
name: Deploy EcomWMS

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          
      - name: Install Dependencies
        run: composer install --no-dev --optimize-autoloader
        
      - name: Run Tests
        run: php artisan test
        
      - name: Deploy to Server
        run: |
          # Deploy via SSH or other method

  deploy-frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          NUXT_PUBLIC_API_URL: ${{ secrets.NUXT_PUBLIC_API_URL }}
          
      - name: Deploy to Server
        run: |
          # Deploy frontend build
```

---

## ✅ Post-Deployment Checklist

```bash
# 1. Backend health check
curl https://api.your-domain.com/api/health
# Expected: {"status":"ok"}

# 2. Frontend loads
curl -I https://your-domain.com
# Expected: HTTP/2 200

# 3. Database migration status
php artisan migrate:status

# 4. Queue worker running
sudo supervisorctl status ecom-wms-queue

# 5. Cache working
php artisan cache:get test-key

# 6. Storage accessible
curl https://api.your-domain.com/storage/test.jpg
```
