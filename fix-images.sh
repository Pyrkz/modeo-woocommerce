#!/bin/bash

# Fix images deployment script

echo "🔧 Fixing image loading issues on production..."

# Navigate to frontend directory
cd frontend

# Stop current containers
echo "📦 Stopping current containers..."
docker-compose -f ../docker-compose.prod.yml down

# Rebuild Next.js with updated config
echo "🏗️ Building Next.js with updated configuration..."
docker-compose -f ../docker-compose.prod.yml build nextjs

# Start services again
echo "🚀 Starting services..."
docker-compose -f ../docker-compose.prod.yml up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
echo "✅ Checking service status..."
docker-compose -f ../docker-compose.prod.yml ps

echo "🎉 Deployment complete!"
echo ""
echo "📝 Summary of changes:"
echo "1. Updated next.config.prod.js to include modeo.pl domain"
echo "2. Added internal Docker hostname 'wordpress' for image optimization"
echo "3. Updated Dockerfile to use production config during build"
echo "4. Added image URL transformation for production environment"
echo ""
echo "🔍 Test the fix by visiting: https://modeo.pl/sklep"
echo "Images should now load properly!"