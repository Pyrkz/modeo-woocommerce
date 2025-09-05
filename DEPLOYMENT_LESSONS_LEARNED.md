# 🚀 DEPLOYMENT LESSONS LEARNED - Modeo E-commerce Stack

**Critical deployment knowledge from production experience (September 4, 2025)**

---

## 🔴 CRITICAL WARNINGS - READ FIRST

### ⚠️ RSYNC --DELETE FLAG DANGER
**NEVER use `rsync --delete` when copying files between environments!**
- This flag will DELETE files in destination that don't exist in source
- We accidentally deleted entire local project with this flag
- Always use `rsync -avz` WITHOUT --delete for safety
- If syncing is needed, backup destination first

### 🔒 BACKUP BEFORE ANY MAJOR OPERATION
- Always have `wordpress_full_backup.tar.gz` ready on VPS
- Keep local backups before any rsync operations
- Database backups are separate from file backups

---

## 📋 DEPLOYMENT CHECKLIST

### 1. Pre-Deployment Preparation
```bash
# On local machine
cd /path/to/modeo-woocommerce

# Verify all changes are committed
git status

# Test locally first
cd backend && docker-compose up -d
cd ../frontend && npm run dev
```

### 2. VPS Access
```bash
# SSH as root (not modeo user initially)
ssh root@72.60.39.148

# Switch to modeo user
su - modeo

# Navigate to production
cd ~/production
```

### 3. File Transfer Best Practices

#### ✅ SAFE Method - Without --delete
```bash
# From local machine - Frontend
rsync -avz \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.env.local' \
  frontend/ root@72.60.39.148:/home/modeo/production/frontend/

# WordPress files (if needed)
rsync -avz backend/wp-content/plugins/ root@72.60.39.148:/home/modeo/production/backend/wp-content/plugins/
rsync -avz backend/wp-content/themes/ root@72.60.39.148:/home/modeo/production/backend/wp-content/themes/
```

#### ❌ DANGEROUS Method - NEVER USE
```bash
# NEVER DO THIS!
rsync -avz --delete source/ destination/  # Will delete files in destination!
```

---

## 🐛 COMMON ISSUES & SOLUTIONS

### Issue 1: Images Not Loading (404 errors)

**Symptoms:**
- Products load but images return 404
- Next.js logs show "upstream image response failed"

**Root Causes:**
1. Missing image files in wp-content/uploads
2. Incorrect Docker volume mapping
3. Caddy not properly routing wp-content requests

**Solution:**
```bash
# 1. Extract and copy images from backup
cd ~/production
tar xzf wordpress_full_backup.tar.gz
sudo cp -r wordpress_full_backup/wp-content/uploads/* backend/wp-content/uploads/

# 2. Fix permissions
sudo chown -R www-data:www-data backend/wp-content/uploads/
sudo chmod -R 755 backend/wp-content/uploads/

# 3. Update docker-compose.yml volumes for WordPress
volumes:
  - ./backend/wp-content:/var/www/html/wp-content

# 4. Restart containers
docker compose down
docker compose up -d
```

### Issue 2: WordPress Plugins "File does not exist" errors

**Symptoms:**
- WordPress admin shows all plugins as disabled
- Error: "Plugin file does not exist"

**Root Cause:**
- Docker volume not properly mounting wp-content

**Solution:**
```bash
# Edit docker-compose.yml
nano docker-compose.yml

# Add volumes section to wordpress service:
wordpress:
  volumes:
    - ./backend/wp-content:/var/www/html/wp-content
    # Remove any duplicate uploads volume!

# Restart
docker compose down
docker compose up -d
```

### Issue 3: Empty WordPress Installation

**Symptoms:**
- No plugins, themes, or content in WordPress
- Fresh WordPress installation screen

**Root Cause:**
- Database not imported
- Wrong database name in configuration

**Solution:**
```bash
# Import database backup
docker exec -i production-db-1 mysql -u root -p'ModeoRoot2024!SuperSecure#Admin' modeo_production < wordpress_backup.sql

# Update URLs if needed
docker exec production-db-1 mysql -u root -p'ModeoRoot2024!SuperSecure#Admin' modeo_production -e "
UPDATE wp_options SET option_value = 'https://modeo.pl' WHERE option_name IN ('siteurl', 'home');
"

# Restart WordPress
docker compose restart wordpress
```

### Issue 4: Next.js Image Optimization Issues

**Symptoms:**
- Next.js can't optimize images from WordPress
- Circular reference errors

**Root Cause:**
- Next.js trying to fetch images through public URL instead of internal Docker network

**Solution Files Created:**
1. `frontend/src/utils/imageUrl.ts` - Transform URLs for Docker network
2. Updated `frontend/next.config.prod.js` - Added all required image domains
3. Updated `frontend/Dockerfile.prod` - Use production config

---

## 🏗️ PROPER DEPLOYMENT WORKFLOW

### Phase 1: Stop Services
```bash
cd ~/production
docker compose down
```

### Phase 2: Update Files
```bash
# Copy files from local (run on local machine)
rsync -avz --exclude 'node_modules' --exclude '.next' \
  frontend/ root@VPS_IP:/home/modeo/production/frontend/
```

### Phase 3: Rebuild if Needed
```bash
# Only if Next.js code changed
docker compose build nextjs
```

### Phase 4: Start Services
```bash
docker compose up -d
```

### Phase 5: Verify
```bash
# Check container status
docker compose ps

# Check logs
docker compose logs --tail 50

# Test endpoints
curl -I https://modeo.pl/
curl -I https://modeo.pl/wp-content/uploads/2025/09/[some-image].jpg
```

---

## 📁 CRITICAL FILES TO NEVER DELETE

1. **Backups on VPS:**
   - `wordpress_backup.sql` - Database backup
   - `wordpress_full_backup.tar.gz` - Complete WordPress backup
   - `.env.local` - Production credentials

2. **Configuration Files:**
   - `docker-compose.yml` - Container orchestration
   - `Caddyfile` - Reverse proxy configuration
   - All `.env` files

---

## 🔧 DOCKER COMPOSE TIPS

### Correct Volume Configuration
```yaml
wordpress:
  volumes:
    - ./backend/wp-content:/var/www/html/wp-content
    # NOT separate volumes for plugins/themes/uploads!
```

### Always Use Named Databases
```yaml
environment:
  MYSQL_DATABASE: modeo_production  # Not 'wordpress'!
```

### Check Container Health
```bash
docker compose ps  # Should show "healthy" status
```

---

## 🚦 DEPLOYMENT VERIFICATION

After deployment, ALWAYS verify:

1. **Frontend (Next.js):**
   - [ ] Homepage loads
   - [ ] Product listing shows items
   - [ ] Images load properly
   - [ ] Add to cart works

2. **Backend (WordPress):**
   - [ ] Admin panel accessible
   - [ ] All plugins active
   - [ ] WooCommerce functional
   - [ ] Media library shows images

3. **Integration:**
   - [ ] API calls between Next.js and WordPress work
   - [ ] Cart data persists
   - [ ] Checkout redirect functions

---

## 💡 PRO TIPS

1. **Always work on VPS as root first**, then switch to modeo user
2. **Use `sudo` for file operations** to avoid permission issues
3. **Restart containers after config changes** - config reload isn't automatic
4. **Check logs immediately** after deployment for early error detection
5. **Keep local backups** before any rsync operations
6. **Test image URLs directly** to diagnose loading issues

---

## 🆘 EMERGENCY RECOVERY

If you accidentally delete files:

1. **Check VPS backups:**
   ```bash
   ls -la ~/production/*.tar.gz
   ls -la ~/production/*.sql
   ```

2. **Extract from backup:**
   ```bash
   tar xzf wordpress_full_backup.tar.gz
   cp -r wordpress_full_backup/* .
   ```

3. **Restore database:**
   ```bash
   docker exec -i production-db-1 mysql -u root -p'PASSWORD' DATABASE < backup.sql
   ```

---

## 📞 SUPPORT CONTACTS

- **VPS Access:** root@72.60.39.148
- **Root Password:** [Stored separately]
- **Database Password:** Check .env file on VPS

---

**Remember: ALWAYS BACKUP BEFORE MAJOR CHANGES!**