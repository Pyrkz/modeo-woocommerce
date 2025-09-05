# 🚀 VPS DEPLOYMENT GUIDE - Modeo.pl Production System

**⚠️ CRITICAL: Read this document completely before making ANY changes to the production system.**

---

## 🖥️ VPS INFRASTRUCTURE

### **Server Details**
- **IP**: 72.60.39.148
- **Domain**: nextmodeo.sitefy.pl
- **OS**: Ubuntu Server
- **Provider**: VPS hosting

### **SSH Access**
```bash
# Root access
ssh root@72.60.39.148
Password: n)3F9A-j?BZg.k'8ImpN

# Application user
ssh modeo@72.60.39.148
# Password: Use same as root or check with user
```

### **Directory Structure**
```
/home/modeo/modeo-shop/modeo-woocommerce/
├── frontend/           # Next.js 15+ application
├── backend/           # WordPress 6.8+ + WooCommerce
├── backups/          # Database backups
├── docker-compose.yml # Production containers
├── deploy.sh         # Main deployment script
├── backup_production_data.sh  # Production data backup
└── export_dev_config.sh      # Development config export
```

---

## 🏗️ ARCHITECTURE OVERVIEW

### **Stack Components**
- **Frontend**: Next.js 15+ (TypeScript + Tailwind) - Port 3000
- **Backend**: WordPress 6.8+ + WooCommerce 10+ - Port 80/443
- **Database**: MariaDB 10.6 - Port 3306 (internal)
- **Reverse Proxy**: Caddy 2 with auto-SSL
- **Cache**: Redis 7 for performance
- **Containerization**: Docker + Docker Compose

### **Production URLs**
- **Main Site**: https://nextmodeo.sitefy.pl
- **WordPress Admin**: https://nextmodeo.sitefy.pl/wp-admin
- **WooCommerce**: https://nextmodeo.sitefy.pl/wp-admin/admin.php?page=wc-admin
- **API Endpoints**: https://nextmodeo.sitefy.pl/wp-json/wc/store/

### **Database Credentials**
```bash
# Production Database (modeo_prod)
DB_USER: modeo_user
DB_PASSWORD: modeo_secure_db_2024_xKj9
DB_ROOT_PASSWORD: root_secure_pass_2024_Lm3
```

---

## 🔄 DEPLOYMENT WORKFLOW

### **CRITICAL PRINCIPLE: DATA SEPARATION**

**❌ NEVER OVERWRITE:**
- Customer orders (`wp_woocommerce_orders*`)
- User accounts (`wp_users`, `wp_usermeta`)
- Payment data (`wp_woocommerce_payment*`)
- User sessions (`wp_woocommerce_sessions`)
- Action scheduler logs (`wp_actionscheduler*`)

**✅ SAFE TO UPDATE:**
- Plugin configurations (`wp_options`)
- Theme settings and customizations
- WordPress core settings
- WooCommerce store configuration
- Shipping and payment method settings

### **Safe Deployment Process**

#### **Step 1: Development (Local)**
```bash
# On local machine (macOS)
cd modeo-woocommerce/backend

# Export ONLY configuration changes
./export_dev_config.sh

# Copy to production
scp backups/dev_config_TIMESTAMP.sql root@72.60.39.148:/home/modeo/modeo-shop/modeo-woocommerce/backups/
```

#### **Step 2: Production (VPS)**
```bash
# SSH to VPS
ssh modeo@72.60.39.148
cd ~/modeo-shop/modeo-woocommerce

# ALWAYS backup production data FIRST
./backup_production_data.sh

# Deploy with safe database merge
./deploy.sh
```

#### **Step 3: Verification**
```bash
# Check critical data integrity
docker compose exec db mysql -u root -proot_secure_pass_2024_Lm3 -e "
USE modeo_prod; 
SELECT COUNT(*) as orders FROM wp_woocommerce_orders;
SELECT COUNT(*) as users FROM wp_users;
SELECT COUNT(*) as products FROM wp_posts WHERE post_type='product';
"

# Test application
curl -I https://nextmodeo.sitefy.pl/wp-json/wc/store/products
curl -I https://nextmodeo.sitefy.pl/wp-admin/
```

---

## 🛡️ SAFETY PROTOCOLS

### **Database Backup Strategy**
1. **Automatic**: Every deployment creates full backup
2. **Production Data**: Selective backup of critical tables only
3. **Configuration**: Separate export from development
4. **Retention**: Keep 30 days of backups minimum

### **Rollback Procedure**
```bash
# If deployment fails
cd ~/modeo-shop/modeo-woocommerce

# Stop services
docker compose down

# Restore from latest backup
LATEST_BACKUP=$(cat backups/latest_production_backup.txt)
docker compose up -d db
sleep 10
docker compose exec -T db mysql -u root -proot_secure_pass_2024_Lm3 modeo_prod < "$LATEST_BACKUP"

# Restart all services
docker compose up -d
```

### **Health Monitoring**
```bash
# Check service status
docker compose ps

# Check logs
docker compose logs -f --tail=50

# Check database connectivity
docker compose exec db mysql -u root -proot_secure_pass_2024_Lm3 -e "SHOW DATABASES;"

# Test endpoints
curl -s https://nextmodeo.sitefy.pl/wp-json/wc/store/products | head -100
```

---

## 🔧 COMMON OPERATIONS

### **Plugin/Theme Updates**
```bash
# Local development
1. Make changes in backend/wp-content/
2. Test thoroughly on localhost:8080
3. Run: ./export_dev_config.sh
4. Deploy to production

# Production deployment
1. ./backup_production_data.sh
2. Copy config backup from local
3. ./deploy.sh
4. Verify functionality
```

### **Emergency Procedures**

#### **Site Down**
```bash
# Check container status
docker compose ps

# Restart services
docker compose down && docker compose up -d

# Check logs
docker compose logs -f
```

#### **Database Issues**
```bash
# Check database status
docker compose exec db mysql -u root -proot_secure_pass_2024_Lm3 -e "SHOW PROCESSLIST;"

# Restart database only
docker compose restart db
```

#### **SSL Certificate Issues**
```bash
# Check Caddy status
docker compose logs caddy

# Force certificate renewal
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
```

---

## 🚨 CRITICAL WARNINGS

### **NEVER DO:**
- ❌ Direct database modifications in production
- ❌ Import full development database to production
- ❌ Delete backup files without retention policy
- ❌ Skip backup before deployment
- ❌ Deploy without testing locally first
- ❌ Modify Docker volumes directly
- ❌ Change production URLs/domains without migration plan

### **ALWAYS DO:**
- ✅ Backup production data before ANY change
- ✅ Test all changes locally first
- ✅ Use selective database import (config only)
- ✅ Verify data integrity after deployment
- ✅ Monitor logs after deployment
- ✅ Keep backups for minimum 30 days
- ✅ Document any manual database changes

---

## 🔑 AUTHENTICATION & SECURITY

### **WordPress Admin Access**
- **URL**: https://nextmodeo.sitefy.pl/wp-admin
- **Username**: admin
- **Password**: Check wp_options table or use WP-CLI reset

### **Database Access**
```bash
# Full access to production database
docker compose exec db mysql -u root -proot_secure_pass_2024_Lm3 modeo_prod

# Read-only queries (preferred)
docker compose exec db mysql -u modeo_user -pmodeo_secure_db_2024_xKj9 modeo_prod
```

### **File System Access**
```bash
# WordPress files (read-only recommended)
docker compose exec wordpress ls -la /var/www/html/

# Volume mounts (local files)
ls -la backend/wp-content/plugins/
ls -la backend/wp-content/themes/
```

---

## 📊 MONITORING & PERFORMANCE

### **Key Metrics to Monitor**
- **Response Time**: < 2s for main pages
- **Database Queries**: < 100ms average
- **Memory Usage**: < 80% of available
- **Disk Space**: > 20% free
- **SSL Certificate**: Valid and auto-renewing

### **Performance Commands**
```bash
# System resources
htop
df -h

# Docker stats
docker stats

# Database performance
docker compose exec db mysql -u root -proot_secure_pass_2024_Lm3 -e "SHOW PROCESSLIST;"
```

---

## 🎯 DEVELOPMENT PRIORITIES

### **Owner's Priorities (marcinpyrkosz)**
1. **Data Integrity**: Customer orders and user data MUST NEVER be lost
2. **Polish Market Focus**: BLIK, Przelewy24, Furgonetka integration
3. **Performance**: Sub-3s page load times
4. **SEO Optimization**: Headless architecture for better rankings
5. **Mobile Experience**: Mobile-first responsive design
6. **Easy Management**: WordPress admin for content management

### **Technical Debt Management**
- **High Priority**: Database backup/restore automation
- **Medium Priority**: Staging environment setup
- **Low Priority**: Migration to newer framework versions

### **Feature Development Focus**
- **E-commerce**: Product catalog improvements
- **Payment Integration**: Polish payment methods
- **Shipping**: Furgonetka integration optimization
- **Analytics**: Sales tracking and reporting
- **Marketing**: SEO and conversion optimization

---

## 📞 SUPPORT & TROUBLESHOOTING

### **Log Locations**
```bash
# Application logs
docker compose logs wordpress
docker compose logs nextjs
docker compose logs caddy

# System logs
tail -f /var/log/syslog
journalctl -u docker
```

### **Common Issues & Solutions**

#### **"Site can't be reached"**
1. Check Caddy: `docker compose logs caddy`
2. Verify DNS: `nslookup nextmodeo.sitefy.pl`
3. Check firewall: `ufw status`

#### **Database connection errors**
1. Check DB status: `docker compose ps`
2. Verify credentials in .env
3. Restart database: `docker compose restart db`

#### **WordPress admin 404**
1. Check URL rewriting in .htaccess
2. Verify WordPress URLs in database
3. Check Caddy proxy configuration

---

## 🚀 SUCCESS INDICATORS

### **Deployment Success Checklist**
- [ ] All Docker containers running (5/5)
- [ ] Main site responds (200 OK)
- [ ] WordPress admin accessible
- [ ] WooCommerce API functional
- [ ] Customer order count unchanged
- [ ] User account count unchanged
- [ ] SSL certificate valid
- [ ] Performance within acceptable limits

### **Business Success Metrics**
- Site uptime > 99.9%
- Order completion rate > 95%
- Page load time < 3 seconds
- Mobile usability score > 90%
- Zero data loss incidents

---

**🎯 REMEMBER: This is a PRODUCTION SYSTEM serving real customers with real money. Every change must be made with extreme care and proper backups.**

**💡 When in doubt, backup first, test locally, then deploy with monitoring.**