# 🚀 Execute This on VPS

Copy this file to your VPS and follow these exact steps:

## Step 1: Connect to VPS and Navigate

```bash
ssh modeo@72.60.39.148
cd /home/modeo/modeo-shop/modeo-woocommerce
```

## Step 2: Upload Migration Scripts

Upload these files to your VPS:
- `migration-backup.sh`
- `migrate-to-dual-domain.sh`

```bash
# Make scripts executable
chmod +x migration-backup.sh
chmod +x migrate-to-dual-domain.sh
```

## Step 3: Check Current Status

```bash
# Check what's currently running
docker ps
docker compose ps

# Check current directory structure
pwd
ls -la

# Check current ports
netstat -tlnp | grep :80
netstat -tlnp | grep :443
```

## Step 4: Run Backup (CRITICAL!)

```bash
# This creates full backup before any changes
./migration-backup.sh
```

**⚠️ WAIT FOR BACKUP TO COMPLETE BEFORE PROCEEDING!**

## Step 5: Run Migration

```bash
# This safely migrates to dual-domain structure
./migrate-to-dual-domain.sh
```

## Step 6: Verify Staging Works

```bash
# Check containers are running
docker ps

# Test staging site
curl -I https://nextmodeo.sitefy.pl
curl https://nextmodeo.sitefy.pl/wp-json/wc/store/products | head -10

# Check WordPress admin
echo "Visit: https://nextmodeo.sitefy.pl/wp-admin"
echo "Login: admin / admin123"
```

## Step 7: Prepare DNS for Production

In your domain registrar (modeo.pl), set:
```
A    @       72.60.39.148
A    www     72.60.39.148
```

Wait 15-30 minutes for DNS propagation, then check:
```bash
nslookup modeo.pl
dig modeo.pl
```

## Step 8: Start Production (After DNS)

```bash
cd /home/modeo/production
docker compose up -d
```

## Step 9: Test Both Environments

```bash
# Test production
curl -I https://modeo.pl
curl https://modeo.pl/wp-json/wc/store/products | head -10

# Test staging  
curl -I https://nextmodeo.sitefy.pl
curl https://nextmodeo.sitefy.pl/wp-json/wc/store/products | head -10
```

## Step 10: Verify SSL and Ports

```bash
# Check SSL certificates
curl -I https://modeo.pl
curl -I https://nextmodeo.sitefy.pl

# Check ports are correctly assigned
netstat -tlnp | grep :80    # Should show production caddy
netstat -tlnp | grep :443   # Should show production caddy
netstat -tlnp | grep :8080  # Should show staging caddy
netstat -tlnp | grep :8443  # Should show staging caddy
```

## 🎉 Success Indicators

✅ Staging running on: https://nextmodeo.sitefy.pl (ports 8080/8443)  
✅ Production running on: https://modeo.pl (ports 80/443)  
✅ Both sites show products via API  
✅ WordPress admin accessible on both  
✅ SSL certificates working on both domains

## 🚨 If Something Goes Wrong

```bash
# Emergency restore
cd /home/modeo/backups/pre-migration-*
./restore.sh
```

## 📋 Final Structure

After migration, your VPS should look like:

```
/home/modeo/
├── staging/                    # nextmodeo.sitefy.pl
│   ├── docker-compose.yml     # Staging containers
│   ├── deploy-staging.sh      # Staging deployment
│   └── wp-content/            # Staging WordPress
├── production/                 # modeo.pl
│   ├── docker-compose.yml     # Production containers
│   ├── deploy-production.sh   # Production deployment
│   └── wp-content/            # Production WordPress
├── backups/                   # Safety backups
└── modeo-shop/               # Old structure (safe to remove later)
```

## 🚀 Deployment Workflow Going Forward

```bash
# Deploy to staging first
cd /home/modeo/staging
./deploy-staging.sh

# Test on https://nextmodeo.sitefy.pl
# If OK, deploy to production

cd /home/modeo/production
./deploy-production.sh  # Requires confirmation
```

---

**🔥 Ready to migrate? Start with Step 1!**