#!/bin/bash

# Safe deployment script for Modeo E-commerce
# Created after lessons learned on September 4, 2025

set -e  # Exit on error

echo "🚀 Safe Deployment Script for Modeo.pl"
echo "====================================="
echo ""
echo "⚠️  This script will:"
echo "  - Backup current state"
echo "  - Copy files WITHOUT --delete flag"
echo "  - Rebuild containers if needed"
echo "  - Verify deployment"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

# Configuration
VPS_HOST="72.60.39.148"
VPS_USER="root"
REMOTE_PATH="/home/modeo/production"
LOCAL_PATH="."

echo ""
echo "📦 Step 1: Creating local backup..."
tar -czf "backup-$(date +%Y%m%d-%H%M%S).tar.gz" \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='*.log' \
  --exclude='backup-*.tar.gz' \
  frontend backend *.yml *.md

echo "✅ Local backup created"

echo ""
echo "📤 Step 2: Copying frontend files..."
rsync -avz \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.env.local' \
  --exclude 'dist' \
  --exclude '.cache' \
  frontend/ ${VPS_USER}@${VPS_HOST}:${REMOTE_PATH}/frontend/

echo "✅ Frontend files copied"

echo ""
echo "📤 Step 3: Copying WordPress files..."
rsync -avz \
  backend/wp-content/plugins/ ${VPS_USER}@${VPS_HOST}:${REMOTE_PATH}/backend/wp-content/plugins/
rsync -avz \
  backend/wp-content/themes/ ${VPS_USER}@${VPS_HOST}:${REMOTE_PATH}/backend/wp-content/themes/

echo "✅ WordPress files copied"

echo ""
echo "📤 Step 4: Copying configuration files..."
scp Caddyfile.prod ${VPS_USER}@${VPS_HOST}:${REMOTE_PATH}/Caddyfile
scp docker-compose.prod.yml ${VPS_USER}@${VPS_HOST}:${REMOTE_PATH}/docker-compose.yml

echo "✅ Configuration files copied"

echo ""
echo "🔧 Step 5: Connecting to VPS for deployment..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
cd /home/modeo/production

echo "🛑 Stopping containers..."
docker compose down

echo "🔨 Building Next.js..."
docker compose build nextjs

echo "🚀 Starting containers..."
docker compose up -d

echo "⏳ Waiting for services to start..."
sleep 10

echo "📊 Checking status..."
docker compose ps

echo "🔍 Verifying endpoints..."
curl -s -o /dev/null -w "%{http_code}" https://modeo.pl/ | grep -q "200" && echo "✅ Homepage: OK" || echo "❌ Homepage: FAILED"
curl -s -o /dev/null -w "%{http_code}" https://modeo.pl/sklep | grep -q "200" && echo "✅ Shop: OK" || echo "❌ Shop: FAILED"

echo ""
echo "📋 Recent logs:"
docker compose logs --tail 20
ENDSSH

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📌 Next steps:"
echo "  1. Check https://modeo.pl/"
echo "  2. Verify images load on /sklep"
echo "  3. Test add to cart functionality"
echo "  4. Check WordPress admin panel"
echo ""
echo "🆘 If issues occur, check:"
echo "  - DEPLOYMENT_LESSONS_LEARNED.md"
echo "  - docker compose logs"
echo "  - Restore from backup if needed"