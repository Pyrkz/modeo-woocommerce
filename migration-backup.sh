#!/bin/bash
# Migration Backup Script for Modeo VPS
# Run this BEFORE starting migration to dual-domain structure

set -e  # Exit on any error

echo "🔄 Starting Modeo Migration Backup..."
echo "Date: $(date)"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [[ ! -f "docker-compose.yml" ]]; then
    echo -e "${RED}❌ docker-compose.yml not found. Are you in the right directory?${NC}"
    echo "Expected: /home/modeo/modeo-shop/modeo-woocommerce/"
    exit 1
fi

echo -e "${YELLOW}📍 Current directory: $(pwd)${NC}"

# Create backup directory
BACKUP_DIR="/home/modeo/backups/pre-migration-$(date +%Y%m%d_%H%M%S)"
echo -e "${YELLOW}📁 Creating backup directory: $BACKUP_DIR${NC}"
mkdir -p "$BACKUP_DIR"

# 1. Backup all files
echo -e "${GREEN}📦 Backing up all project files...${NC}"
cp -r /home/modeo/modeo-shop/modeo-woocommerce/* "$BACKUP_DIR/"

# 2. Backup database
echo -e "${GREEN}🗄️ Backing up database...${NC}"
if docker ps | grep -q modeo; then
    DB_CONTAINER=$(docker ps --format "table {{.Names}}" | grep -E "(modeo.*db|modeo.*mysql|modeo.*mariadb)" | head -1)
    if [[ -n "$DB_CONTAINER" ]]; then
        echo "Using database container: $DB_CONTAINER"
        docker exec "$DB_CONTAINER" mysqldump -u root -pModeoRoot2024!SuperSecure# --all-databases > "$BACKUP_DIR/database_backup.sql"
        echo -e "${GREEN}✅ Database backup completed${NC}"
    else
        echo -e "${YELLOW}⚠️ No database container found, skipping database backup${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ No Docker containers running, skipping database backup${NC}"
fi

# 3. Backup Docker volumes (if any)
echo -e "${GREEN}🐳 Checking for Docker volumes...${NC}"
if docker volume ls | grep -q modeo; then
    docker volume ls | grep modeo > "$BACKUP_DIR/docker_volumes.txt"
    echo -e "${GREEN}✅ Docker volumes list saved${NC}"
else
    echo -e "${YELLOW}⚠️ No Modeo Docker volumes found${NC}"
fi

# 4. Save current Docker state
echo -e "${GREEN}📊 Saving current Docker state...${NC}"
docker ps > "$BACKUP_DIR/docker_containers.txt" || echo "No containers running"
docker images > "$BACKUP_DIR/docker_images.txt" || echo "No images found"
docker network ls > "$BACKUP_DIR/docker_networks.txt" || echo "No networks found"

# 5. Save environment info
echo -e "${GREEN}🔧 Saving environment info...${NC}"
{
    echo "=== SYSTEM INFO ==="
    uname -a
    echo ""
    echo "=== DISK USAGE ==="
    df -h
    echo ""
    echo "=== DOCKER VERSION ==="
    docker --version
    docker compose version
    echo ""
    echo "=== NGINX/CADDY PROCESSES ==="
    ps aux | grep -E "(nginx|caddy)" || echo "None found"
    echo ""
    echo "=== LISTENING PORTS ==="
    netstat -tlnp 2>/dev/null || ss -tlnp
    echo ""
} > "$BACKUP_DIR/system_info.txt"

# 6. Create restore script
echo -e "${GREEN}🔧 Creating restore script...${NC}"
cat > "$BACKUP_DIR/restore.sh" << 'EOF'
#!/bin/bash
# Restore script for Modeo backup
# USE ONLY IN EMERGENCY - this will overwrite current setup

set -e

echo "🚨 RESTORE MODE - This will overwrite your current setup!"
echo "Backup created: $(cat backup_info.txt)"
echo ""
read -p "Are you ABSOLUTELY sure you want to restore? Type 'restore-now' to continue: " confirm

if [[ "$confirm" != "restore-now" ]]; then
    echo "❌ Restore cancelled"
    exit 1
fi

echo "🔄 Starting restore..."

# Stop current containers
cd /home/modeo/modeo-shop/modeo-woocommerce
docker compose down 2>/dev/null || echo "No containers to stop"

# Restore files
echo "📦 Restoring files..."
cp -r $(dirname "$0")/* /home/modeo/modeo-shop/modeo-woocommerce/

# Restore database
if [[ -f "database_backup.sql" ]]; then
    echo "🗄️ Restoring database..."
    docker compose up -d db
    sleep 10
    docker exec -i $(docker ps --format "{{.Names}}" | grep -E "(modeo.*db|modeo.*mysql|modeo.*mariadb)" | head -1) mysql -u root -pModeoRoot2024!SuperSecure# < database_backup.sql
fi

# Start containers
echo "🚀 Starting containers..."
docker compose up -d

echo "✅ Restore completed!"
EOF

chmod +x "$BACKUP_DIR/restore.sh"

# 7. Create backup info file
echo -e "${GREEN}📄 Creating backup info...${NC}"
{
    echo "=== MODEO MIGRATION BACKUP ==="
    echo "Created: $(date)"
    echo "Original path: $(pwd)"
    echo "Backup location: $BACKUP_DIR"
    echo ""
    echo "=== FILES BACKED UP ==="
    ls -la "$BACKUP_DIR/"
    echo ""
    echo "=== DOCKER STATUS AT BACKUP TIME ==="
    docker ps || echo "No containers running"
    echo ""
    echo "To restore this backup, run:"
    echo "cd $BACKUP_DIR && ./restore.sh"
} > "$BACKUP_DIR/backup_info.txt"

# 8. Create migration checklist
cat > "$BACKUP_DIR/migration_checklist.md" << 'EOF'
# Migration Checklist

## Pre-Migration ✅ COMPLETED
- [x] Full backup created
- [x] Database backup created  
- [x] Docker state saved
- [x] Restore script created

## Migration Steps (TO DO)
- [ ] Create staging directory structure
- [ ] Move current files to staging/
- [ ] Configure staging environment
- [ ] Test staging works on nextmodeo.sitefy.pl
- [ ] Create production directory structure
- [ ] Configure production environment
- [ ] Set up DNS for modeo.pl
- [ ] Test both environments
- [ ] Verify dual-domain plugin works
- [ ] Update deployment scripts

## Post-Migration
- [ ] Verify staging: https://nextmodeo.sitefy.pl
- [ ] Verify production: https://modeo.pl
- [ ] Test cart functionality on both domains
- [ ] Verify SSL certificates
- [ ] Update monitoring/backups
EOF

echo ""
echo -e "${GREEN}🎉 Backup completed successfully!${NC}"
echo -e "${GREEN}📁 Backup location: $BACKUP_DIR${NC}"
echo -e "${GREEN}📄 Check backup_info.txt for details${NC}"
echo -e "${GREEN}🔧 Emergency restore: cd $BACKUP_DIR && ./restore.sh${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Check backup_info.txt"
echo "2. Review migration_checklist.md"
echo "3. Proceed with staging migration"
echo ""
echo -e "${GREEN}✅ Ready for migration!${NC}"