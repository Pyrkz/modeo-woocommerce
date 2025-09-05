#!/bin/bash

# Clean production deployment script
# Czyści wszystko i buduje od nowa

echo "🧹 Clean Production Deployment for modeo.pl"
echo "=========================================="

# Sprawdź czy jesteśmy w głównym katalogu projektu
if [ ! -f "docker-compose.prod.yml" ]; then
    echo "❌ Error: docker-compose.prod.yml not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Potwierdź akcję
echo "⚠️  WARNING: This will:"
echo "  - Stop all production containers"
echo "  - Remove all Docker volumes and images"
echo "  - Rebuild everything from scratch"
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Deployment cancelled."
    exit 0
fi

# Stop wszystkie kontenery
echo ""
echo "📦 Stopping all containers..."
docker-compose -f docker-compose.prod.yml down -v

# Usuń stare obrazy
echo ""
echo "🗑️  Removing old images..."
docker-compose -f docker-compose.prod.yml rm -f
docker image prune -f

# Usuń cache buildera
echo ""
echo "🧹 Cleaning builder cache..."
docker builder prune -f

# Skopiuj pliki do deployu
echo ""
echo "📋 Preparing files for deployment..."

# Upewnij się, że używamy produkcyjnej konfiguracji
cd frontend
if [ -f "next.config.prod.js" ]; then
    echo "✅ Production config found"
else
    echo "❌ Error: next.config.prod.js not found!"
    exit 1
fi
cd ..

# Build wszystko od nowa
echo ""
echo "🏗️  Building all services from scratch..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Start wszystkich serwisów
echo ""
echo "🚀 Starting all services..."
docker-compose -f docker-compose.prod.yml up -d

# Czekaj na start
echo ""
echo "⏳ Waiting for services to start..."
sleep 15

# Sprawdź status
echo ""
echo "✅ Checking service status..."
docker-compose -f docker-compose.prod.yml ps

# Sprawdź logi
echo ""
echo "📋 Recent logs from Next.js:"
docker-compose -f docker-compose.prod.yml logs --tail=20 nextjs

echo ""
echo "🎉 Clean deployment complete!"
echo ""
echo "📝 What was deployed:"
echo "  - Next.js with updated image configuration"
echo "  - WordPress with all media files"
echo "  - Caddy reverse proxy"
echo "  - Redis cache"
echo "  - MariaDB database"
echo ""
echo "🔍 Test your site:"
echo "  - Homepage: https://modeo.pl"
echo "  - Shop: https://modeo.pl/sklep"
echo "  - Admin: https://modeo.pl/wp-admin"
echo ""
echo "💡 If images still don't load, check:"
echo "  1. docker-compose -f docker-compose.prod.yml logs nextjs"
echo "  2. docker-compose -f docker-compose.prod.yml logs wordpress"
echo "  3. docker-compose -f docker-compose.prod.yml logs caddy"