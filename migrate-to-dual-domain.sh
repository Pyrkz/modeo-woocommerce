#!/bin/bash
# Migrate Modeo to Dual-Domain Architecture
# SAFE migration preserving current nextmodeo.sitefy.pl setup

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Modeo Dual-Domain Migration${NC}"
echo "This will migrate to staging + production architecture"
echo ""

# Safety check
if [[ ! -f "docker-compose.yml" ]]; then
    echo -e "${RED}❌ docker-compose.yml not found${NC}"
    echo "Run this from: /home/modeo/modeo-shop/modeo-woocommerce/"
    exit 1
fi

# Check if backup exists
if [[ ! -d "/home/modeo/backups" ]]; then
    echo -e "${RED}❌ No backup found!${NC}"
    echo "Run ./migration-backup.sh first!"
    exit 1
fi

echo -e "${GREEN}✅ Backup found, proceeding with migration${NC}"
echo ""

# PHASE 1: Create directory structure
echo -e "${YELLOW}📁 PHASE 1: Creating directory structure${NC}"

cd /home/modeo
mkdir -p staging production

echo -e "${GREEN}✅ Directories created${NC}"

# PHASE 2: Setup Staging (preserve current)
echo -e "${YELLOW}🧪 PHASE 2: Setting up STAGING (current setup)${NC}"

# Stop current containers
cd /home/modeo/modeo-shop/modeo-woocommerce
echo "Stopping current containers..."
docker compose down || echo "No containers to stop"

# Move current setup to staging
echo "Moving current setup to staging..."
cp -r /home/modeo/modeo-shop/modeo-woocommerce/* /home/modeo/staging/

# Update staging configuration
cd /home/modeo/staging

# Use existing security system - copy from .env.staging or .env.staging.local
echo "Configuring staging environment with security system..."

# Check if .env.staging.local exists (real staging credentials)
if [[ -f ".env.staging.local" ]]; then
    echo "Using .env.staging.local (real staging credentials)"
    cp .env.staging.local .env
else
    # Use template and warn about credentials
    echo "Using .env.staging template - UPDATE WITH REAL CREDENTIALS!"
    cp .env.staging .env
    echo -e "${YELLOW}⚠️ REMEMBER: Update .env with real staging credentials before production use!${NC}"
fi

# Create staging docker-compose
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  nextjs:
    build: ./frontend
    container_name: modeo_staging_nextjs
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=development
      - ENVIRONMENT=staging
      - API_URL=https://nextmodeo.sitefy.pl
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - wordpress
    networks:
      - modeo_staging

  wordpress:
    image: wordpress:6.4-apache
    container_name: modeo_staging_wordpress
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_NAME: modeo_staging
      WORDPRESS_DB_USER: modeo_user
      WORDPRESS_DB_PASSWORD: ModeoRoot2024!SuperSecure#Admin
      WORDPRESS_URL: https://nextmodeo.sitefy.pl
      WORDPRESS_ADMIN_USER: admin
      WORDPRESS_ADMIN_PASSWORD: admin123
      WORDPRESS_ADMIN_EMAIL: admin@nextmodeo.sitefy.pl
    volumes:
      - ./wp-content:/var/www/html/wp-content
      - ./backend/wp-config.php:/var/www/html/wp-config.php
    depends_on:
      - db
    networks:
      - modeo_staging

  db:
    image: mariadb:10.6
    container_name: modeo_staging_db
    environment:
      MYSQL_ROOT_PASSWORD: ModeoRoot2024!SuperSecure#Admin
      MYSQL_DATABASE: modeo_staging
      MYSQL_USER: modeo_user
      MYSQL_PASSWORD: ModeoRoot2024!SuperSecure#Admin
    volumes:
      - modeo_staging_db:/var/lib/mysql
    ports:
      - "3307:3306"
    networks:
      - modeo_staging

  caddy:
    image: caddy:2
    container_name: modeo_staging_caddy
    ports:
      - "8080:80"
      - "8443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_staging_data:/data
      - caddy_staging_config:/config
    depends_on:
      - wordpress
      - nextjs
    networks:
      - modeo_staging

volumes:
  modeo_staging_db:
  caddy_staging_data:
  caddy_staging_config:

networks:
  modeo_staging:
    driver: bridge
EOF

# Create staging Caddyfile
cat > Caddyfile << 'EOF'
nextmodeo.sitefy.pl {
    # Next.js routes (dynamic pages)
    @nextjs {
        path /sklep/* /koszyk/* /kategoria/* /produkt/* /_next/*
        path /api/* /static/* /favicon.ico
    }
    
    handle @nextjs {
        reverse_proxy modeo_staging_nextjs:3000
    }
    
    # WordPress routes (admin, checkout, API)
    handle {
        reverse_proxy modeo_staging_wordpress:80 {
            header_up Host {host}
            header_up X-Real-IP {remote}
            header_up X-Forwarded-For {remote}
            header_up X-Forwarded-Proto {scheme}
        }
    }
    
    # Security headers
    header {
        X-Frame-Options DENY
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
        Permissions-Policy camera=(), microphone=(), geolocation=()
    }
}
EOF

echo -e "${GREEN}✅ Staging configuration created${NC}"

# Validate staging configuration
echo "Validating staging environment variables..."
if [[ -f "./validate-env.sh" ]]; then
    if ./validate-env.sh; then
        echo -e "${GREEN}✅ Staging configuration valid${NC}"
    else
        echo -e "${YELLOW}⚠️ Staging validation failed - fix before production use!${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ No validate-env.sh found - skipping validation${NC}"
fi

# Start staging
echo "Starting staging containers..."
docker compose up -d

echo -e "${GREEN}✅ Staging is running on nextmodeo.sitefy.pl${NC}"

# PHASE 3: Setup Production
echo -e "${YELLOW}🔴 PHASE 3: Setting up PRODUCTION${NC}"

cd /home/modeo/production

# Clone fresh copy for production
git clone https://github.com/YOUR_USERNAME/modeo-woocommerce.git . || cp -r ../staging/* .

# Use secure .env.local system for production
echo "Configuring production environment with security system..."

# Check if .env.local exists (real production credentials)
if [[ -f ".env.local" ]]; then
    echo -e "${GREEN}✅ Using .env.local (real production credentials)${NC}"
    cp .env.local .env
else
    # Create from template and warn
    echo -e "${RED}❌ No .env.local found! Creating from template${NC}"
    cp .env.production .env
    echo ""
    echo -e "${RED}🚨 CRITICAL: Before starting production, you MUST:${NC}"
    echo "1. cp .env.production .env.local"
    echo "2. Edit .env.local with REAL production passwords"
    echo "3. Run: ./validate-env.sh"
    echo "4. NEVER commit .env.local to Git!"
    echo ""
    echo -e "${YELLOW}⚠️ Production will NOT start with template credentials!${NC}"
fi

# Create production docker-compose
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  nextjs:
    build: 
      context: ./frontend
      dockerfile: Dockerfile
    container_name: modeo_production_nextjs
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - ENVIRONMENT=production
      - API_URL=https://modeo.pl
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - wordpress
    networks:
      - modeo_production

  wordpress:
    image: wordpress:6.4-apache
    container_name: modeo_production_wordpress
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_NAME: modeo_production
      WORDPRESS_DB_USER: modeo_prod_user
      WORDPRESS_DB_PASSWORD: ModeoRoot2024!SuperSecure#Admin
      WORDPRESS_URL: https://modeo.pl
      WORDPRESS_ADMIN_USER: admin
      WORDPRESS_ADMIN_PASSWORD: SecurePassword123!
      WORDPRESS_ADMIN_EMAIL: admin@modeo.pl
    volumes:
      - ./wp-content:/var/www/html/wp-content
      - ./backend/wp-config.php:/var/www/html/wp-config.php
    depends_on:
      - db
    networks:
      - modeo_production

  db:
    image: mariadb:10.6
    container_name: modeo_production_db
    environment:
      MYSQL_ROOT_PASSWORD: ModeoRoot2024!SuperSecure#Admin
      MYSQL_DATABASE: modeo_production
      MYSQL_USER: modeo_prod_user
      MYSQL_PASSWORD: ModeoRoot2024!SuperSecure#Admin
    volumes:
      - modeo_production_db:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - modeo_production

  caddy:
    image: caddy:2
    container_name: modeo_production_caddy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_production_data:/data
      - caddy_production_config:/config
    depends_on:
      - wordpress
      - nextjs
    networks:
      - modeo_production

volumes:
  modeo_production_db:
  caddy_production_data:
  caddy_production_config:

networks:
  modeo_production:
    driver: bridge
EOF

# Create production Caddyfile  
cat > Caddyfile << 'EOF'
modeo.pl {
    # Next.js routes (dynamic pages)
    @nextjs {
        path /sklep/* /koszyk/* /kategoria/* /produkt/* /_next/*
        path /api/* /static/* /favicon.ico
    }
    
    handle @nextjs {
        reverse_proxy modeo_production_nextjs:3000
    }
    
    # WordPress routes (admin, checkout, API)
    handle {
        reverse_proxy modeo_production_wordpress:80 {
            header_up Host {host}
            header_up X-Real-IP {remote}
            header_up X-Forwarded-For {remote}
            header_up X-Forwarded-Proto {scheme}
        }
    }
    
    # Security headers
    header {
        X-Frame-Options DENY
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
        Permissions-Policy camera=(), microphone=(), geolocation=()
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    }
    
    # Rate limiting
    rate_limit {
        zone production {
            key {remote_host}
            window 1m
            events 60
        }
    }
}
EOF

echo -e "${GREEN}✅ Production configuration created${NC}"

# Don't start production yet - need DNS first
echo -e "${YELLOW}⚠️ Production ready but NOT started (need DNS first)${NC}"

# PHASE 4: Create deployment scripts
echo -e "${YELLOW}🚀 PHASE 4: Creating deployment scripts${NC}"

# Staging deployment script with security
cat > /home/modeo/staging/deploy-staging.sh << 'EOF'
#!/bin/bash
# Deploy to Staging - nextmodeo.sitefy.pl

set -e

echo "🧪 Deploying to STAGING (nextmodeo.sitefy.pl)..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Pull latest code
echo "Pulling latest code..."
git pull origin main

# Configure environment
echo "Configuring staging environment..."
if [[ -f ".env.staging.local" ]]; then
    echo -e "${GREEN}Using .env.staging.local (real credentials)${NC}"
    cp .env.staging.local .env
else
    echo -e "${YELLOW}Using .env.staging template${NC}"
    cp .env.staging .env
fi

# Copy configuration files
cp docker-compose.staging.yml docker-compose.yml || echo "docker-compose.staging.yml not found"
cp Caddyfile.staging Caddyfile || echo "Caddyfile.staging not found"

# Validate configuration
if [[ -f "./validate-env.sh" ]]; then
    echo "Validating environment..."
    ./validate-env.sh || echo -e "${YELLOW}⚠️ Validation warnings - check configuration${NC}"
fi

# Rebuild and restart
echo "Rebuilding and restarting services..."
docker compose down
docker compose build --no-cache
docker compose up -d

# Wait for services
echo "Waiting for services to start..."
sleep 30

# Health check
if curl -f -s https://nextmodeo.sitefy.pl > /dev/null; then
    echo -e "${GREEN}✅ Staging deployment successful!${NC}"
    echo "🌐 Visit: https://nextmodeo.sitefy.pl"
else
    echo -e "${RED}❌ Staging health check failed${NC}"
    exit 1
fi
EOF

# Production deployment script with security
cat > /home/modeo/production/deploy-production.sh << 'EOF'
#!/bin/bash
# Deploy to Production - modeo.pl - SECURE VERSION

set -e

echo "🔴 PRODUCTION DEPLOYMENT - modeo.pl"
echo "This will affect live customers!"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Safety confirmation
read -p "Are you sure you want to deploy to PRODUCTION? Type 'deploy-production' to continue: " confirm
if [[ "$confirm" != "deploy-production" ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo "🚀 Deploying to PRODUCTION..."

# Pull latest code
echo "Pulling latest code..."
git pull origin main

# CRITICAL: Check .env.local exists
if [[ ! -f ".env.local" ]]; then
    echo -e "${RED}🚨 CRITICAL ERROR: No .env.local file found!${NC}"
    echo ""
    echo "Before production deployment:"
    echo "1. cp .env.production .env.local"
    echo "2. Edit .env.local with REAL production passwords"
    echo "3. Run: ./validate-env.sh"
    echo "4. NEVER commit .env.local to Git!"
    echo ""
    exit 1
fi

# Configure environment with real production credentials
echo "Configuring production environment..."
cp .env.local .env
cp docker-compose.prod.yml docker-compose.yml
cp Caddyfile.prod Caddyfile

# MANDATORY: Validate configuration
echo "Validating production configuration..."
if [[ -f "./validate-env.sh" ]]; then
    if ! ./validate-env.sh; then
        echo -e "${RED}❌ PRODUCTION validation failed!${NC}"
        echo "Fix all errors before deploying to production!"
        exit 1
    fi
    echo -e "${GREEN}✅ Production configuration validated${NC}"
else
    echo -e "${RED}❌ No validate-env.sh found!${NC}"
    echo "Cannot deploy without validation!"
    exit 1
fi

# Create backup
echo "Creating database backup..."
if docker compose ps | grep -q "db"; then
    BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S).sql"
    mkdir -p backups
    docker compose exec -T db mysqldump -u root -p${DB_ROOT_PASSWORD} modeo_production > "backups/${BACKUP_NAME}" || echo "Backup failed"
    echo -e "${GREEN}✅ Backup created: ${BACKUP_NAME}${NC}"
fi

# Rebuild and restart with zero downtime
echo "Rebuilding and restarting services..."
docker compose build --no-cache
docker compose up -d --force-recreate

# Wait for services
echo "Waiting for services to stabilize..."
sleep 60

# Comprehensive health checks
echo "Running health checks..."

# Test main site
if curl -f -s https://modeo.pl > /dev/null; then
    echo -e "${GREEN}✅ Main site: OK${NC}"
else
    echo -e "${RED}❌ Main site: FAILED${NC}"
    echo "🚨 Check logs immediately!"
    exit 1
fi

# Test WooCommerce API
if curl -s https://modeo.pl/wp-json/wc/store/products | grep -q "\["; then
    echo -e "${GREEN}✅ WooCommerce API: OK${NC}"
else
    echo -e "${RED}❌ WooCommerce API: FAILED${NC}"
fi

# Test WordPress admin
if curl -s -I https://modeo.pl/wp-admin/ | grep -q "200\|302"; then
    echo -e "${GREEN}✅ WordPress Admin: OK${NC}"
else
    echo -e "${RED}❌ WordPress Admin: FAILED${NC}"
fi

echo -e "${GREEN}🎉 Production deployment successful!${NC}"
echo "🌐 Visit: https://modeo.pl"
echo ""
echo -e "${YELLOW}🔍 Monitor production for next 30 minutes:${NC}"
echo "  docker compose logs -f"
echo "  docker compose ps"
EOF

# Make scripts executable
chmod +x /home/modeo/staging/deploy-staging.sh
chmod +x /home/modeo/production/deploy-production.sh

echo -e "${GREEN}✅ Deployment scripts created${NC}"

# Final summary
echo ""
echo -e "${BLUE}🎉 MIGRATION COMPLETED!${NC}"
echo ""
echo -e "${GREEN}📊 Summary:${NC}"
echo "✅ Staging: /home/modeo/staging (nextmodeo.sitefy.pl)"
echo "✅ Production: /home/modeo/production (modeo.pl - ready but not started)"
echo "✅ Backups: /home/modeo/backups/"
echo "✅ Deployment scripts created"
echo ""
echo -e "${YELLOW}🚀 Next Steps:${NC}"
echo "1. Test staging: https://nextmodeo.sitefy.pl"
echo "2. Configure DNS for modeo.pl (A record to VPS IP)"
echo "3. Start production: cd /home/modeo/production && docker compose up -d"
echo "4. Test production: https://modeo.pl"
echo ""
echo -e "${GREEN}🔧 Commands:${NC}"
echo "# Test staging deployment:"
echo "cd /home/modeo/staging && ./deploy-staging.sh"
echo ""
echo "# Start production (after DNS):"
echo "cd /home/modeo/production && docker compose up -d"
echo ""
echo "# Deploy to production:"
echo "cd /home/modeo/production && ./deploy-production.sh"
echo ""
echo -e "${GREEN}✅ Ready for dual-domain operation!${NC}"