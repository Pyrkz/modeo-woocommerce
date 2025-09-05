# 🚀 Dual-Domain Deployment Guide - Modeo.pl

Kompletny przewodnik wdrożenia systemu staging/production dla Next.js + WordPress e-commerce.

## 📋 Architektura Dual-Domain

### 🎯 Środowiska
- **🔴 modeo.pl** → PRODUKCJA (klienci, stable)
- **🧪 nextmodeo.sitefy.pl** → STAGING (testy, development)

### 🔄 Workflow
1. **Development** → localhost:3000 + localhost:8080
2. **Staging Test** → `./deploy-staging.sh` → nextmodeo.sitefy.pl
3. **Production** → `./deploy.sh` → modeo.pl

---

## 🛠️ Setup Serwera

### 1. Przygotuj serwery

**Serwer Staging:**
```bash
# Zaloguj się na serwer staging
ssh root@staging-server-ip

# Zainstaluj Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Utwórz użytkownika i oznacz środowisko
useradd -m -s /bin/bash modeo
usermod -aG docker modeo
su - modeo
touch /home/modeo/.staging  # WAŻNE: oznacz staging
```

**Serwer Production:**
```bash
# Zaloguj się na serwer production
ssh root@production-server-ip

# Zainstaluj Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Utwórz użytkownika i oznacz środowisko
useradd -m -s /bin/bash modeo
usermod -aG docker modeo
su - modeo
touch /home/modeo/.production  # WAŻNE: oznacz production
```

### 2. Skonfiguruj DNS

**W panelu domeny (home.pl, OVH):**

**modeo.pl (Production):**
```
A    @       PRODUCTION-SERVER-IP
A    www     PRODUCTION-SERVER-IP
```

**nextmodeo.sitefy.pl (Staging):**
```
A    nextmodeo   STAGING-SERVER-IP
```

---

## 🚀 Deployment Process

### Staging Deployment

```bash
# Na serwerze staging jako użytkownik modeo
cd /home/modeo
git clone <your-repo> modeo-shop
cd modeo-shop

# Skopiuj i skonfiguruj środowisko staging
cp .env.staging .env
nano .env  # Wypełnij hasła staging

# Uruchom deployment staging
./deploy-staging.sh
```

**Co robi deploy-staging.sh:**
- ✅ Backup bazy staging
- ✅ Aktualizuje kod z git
- ✅ Konfiguruje środowisko staging
- ✅ Rebuilduję kontenery Docker
- ✅ Testuje wszystkie endpointy
- ✅ Pokazuje logi w przypadku problemów

### Production Deployment

```bash
# NAJPIERW przetestuj na staging!
# Upewnij się że staging działa poprawnie na nextmodeo.sitefy.pl

# Na serwerze production jako użytkownik modeo
cd /home/modeo
git clone <your-repo> modeo-shop
cd modeo-shop

# Skopiuj i skonfiguruj środowisko production
cp .env.prod .env
nano .env  # Wypełnij PRAWDZIWE hasła production

# Uruchom deployment production (wymaga potwierdzenia)
./deploy.sh
# Wpisz "yes" aby potwierdzić deployment production
```

**Co robi deploy.sh:**
- ⚠️ Pyta o potwierdzenie (production!)
- ✅ Backup bazy production
- ✅ Aktualizuje kod z git
- ✅ Konfiguruje środowisko production
- ✅ Rebuilduję kontenery Docker
- ✅ Testuje wszystkie endpointy production
- 🚨 Wyświetla ostrzeżenia production

---

## 🔧 Konfiguracja Środowisk

### Environment Variables

**Staging (.env.staging):**
```bash
# Database
DB_PASSWORD=staging_secure_password
DB_ROOT_PASSWORD=staging_root_password

# Next.js
NEXT_PUBLIC_API_URL=https://nextmodeo.sitefy.pl
NEXT_PUBLIC_ENVIRONMENT=staging

# WordPress
WP_AUTH_KEY=staging_key_here
# ... inne klucze staging
```

**Production (.env.prod):**
```bash
# Database  
DB_PASSWORD=super_secure_production_password
DB_ROOT_PASSWORD=super_secure_production_root

# Next.js
NEXT_PUBLIC_API_URL=https://modeo.pl
NEXT_PUBLIC_ENVIRONMENT=production

# WordPress
WP_AUTH_KEY=production_key_here
# ... inne klucze production
```

### Docker Compose Files

**docker-compose.staging.yml:**
- Database: `modeo_staging`
- WordPress URLs: `https://nextmodeo.sitefy.pl`
- Debug: enabled
- Caddy: `Caddyfile.staging`

**docker-compose.prod.yml:**
- Database: `modeo_production`
- WordPress URLs: `https://modeo.pl`
- Debug: disabled
- Caddy: `Caddyfile.prod`

---

## 🔍 Monitoring i Diagnostyka

### Health Checks

**Staging:**
```bash
# Sprawdź status
curl -I https://nextmodeo.sitefy.pl
curl -I https://nextmodeo.sitefy.pl/wp-admin/
curl https://nextmodeo.sitefy.pl/wp-json/wc/store/products

# Docker status
docker compose ps
docker compose logs -f
```

**Production:**
```bash
# Sprawdź status
curl -I https://modeo.pl
curl -I https://modeo.pl/wp-admin/
curl https://modeo.pl/wp-json/wc/store/products

# Docker status
docker compose ps
docker compose logs -f
```

### Logi

**Lokalizacje:**
- **Caddy**: `/var/log/caddy/staging.log` lub `/var/log/caddy/modeo.log`
- **WordPress**: `docker compose logs wordpress`
- **Next.js**: `docker compose logs nextjs`
- **Database**: `docker compose logs db`

### Troubleshooting

**Problem: Staging nie działa**
```bash
# Sprawdź logi
docker compose logs --tail=50 caddy
docker compose logs --tail=50 nextjs
docker compose logs --tail=50 wordpress

# Restart staging
docker compose down
docker compose up -d

# Sprawdź ponownie
curl -I https://nextmodeo.sitefy.pl
```

**Problem: Production nie działa**
```bash
# ⚠️ OSTROŻNIE - to produkcja!

# Sprawdź logi
docker compose logs --tail=50 caddy

# Jeśli konieczny restart
docker compose restart caddy

# W ostateczności (OSTRZEŻENIE!)
docker compose down
docker compose up -d
```

---

## 🔄 Proces Aktualizacji

### 1. Testowanie na Staging

```bash
# 1. Wypchnij zmiany do git
git push origin main

# 2. Przygotuj dane staging (opcjonalne)
cp .env.staging .env.staging.local
nano .env.staging.local  # Wypełnij prawdziwe dane staging

# 3. Aktualizuj staging
ssh modeo@staging-server
cd modeo-shop
./deploy-staging.sh

# 4. Przetestuj na https://nextmodeo.sitefy.pl
# - Sprawdź katalog produktów
# - Przetestuj dodawanie do koszyka
# - Sprawdź checkout (bez płatności)
# - Zweryfikuj WordPress admin
# - Sprawdź czy nie ma ostrzeżeń o template credentials
```

### 2. Wdrożenie na Production

```bash
# Jeśli staging działa OK:
ssh modeo@production-server
cd modeo-shop

# KRYTYCZNE: Przygotuj prawdziwe dane produkcyjne
cp .env.production .env.local
nano .env.local  # Wypełnij WSZYSTKIE prawdziwe hasła

# Waliduj konfigurację
./validate-env.sh  # Musi przejść bez błędów

# Deploy na produkcję
./deploy.sh
# Potwierdź wpisując "yes"

# Monitoruj przez pierwsze godziny:
# - Sprawdź https://modeo.pl
# - Monitoruj logi: docker compose logs -f
# - Sprawdź WordPress admin - nie powinno być ostrzeżeń o templates
# - Sprawdź metryki wydajności
```

---

## 🚨 Emergency Procedures

### Rollback Production

**Jeśli production ma problemy:**

```bash
# 1. NATYCHMIASTOWY backup
docker compose exec -T db mysqldump -u root -p${DB_ROOT_PASSWORD} modeo_production > emergency_backup.sql

# 2. Przywróć z ostatniego backup-a
docker compose exec -i db mysql -u root -p${DB_ROOT_PASSWORD} modeo_production < backups/backup_YYYYMMDD_HHMMSS.sql

# 3. Restart aplikacji
docker compose down
docker compose up -d

# 4. Sprawdź czy działa
curl -I https://modeo.pl
```

### Restore Database

```bash
# Lista backup-ów
ls -la backups/

# Przywróć wybrany backup
docker compose exec -i db mysql -u root -p${DB_ROOT_PASSWORD} modeo_production < backups/backup_20250829_143022.sql

# Restart WordPress
docker compose restart wordpress
```

---

## 📊 Best Practices

### 1. Bezpieczeństwo

- **Różne hasła** dla staging i production
- **Backup przed każdym deployment**
- **Test staging** zawsze przed production
- **Monitor production** po deployment

### 2. Deployment

- **Małe, częste** deploymenty
- **Test wszystkich** funkcji na staging
- **Deploy production** w godzinach o niskim ruchu
- **Monitor metryki** po deployment

### 3. Monitoring

- **Logi Caddy** dla problemów SSL/proxy
- **WordPress logi** dla błędów aplikacji  
- **Docker stats** dla zasobów systemu
- **External monitoring** (UptimeRobot, Pingdom)

---

## 📞 Quick Reference

### URLs

**Staging:**
- 🌍 Strona: https://nextmodeo.sitefy.pl
- 🛠️ Admin: https://nextmodeo.sitefy.pl/wp-admin
- 🛒 Sklep: https://nextmodeo.sitefy.pl/sklep

**Production:**
- 🌍 Strona: https://modeo.pl
- 🛠️ Admin: https://modeo.pl/wp-admin
- 🛒 Sklep: https://modeo.pl/sklep

### Commands

```bash
# Status
docker compose ps

# Logi
docker compose logs -f
docker compose logs -f nextjs
docker compose logs -f wordpress

# Restart
docker compose restart [service]
docker compose down && docker compose up -d

# Deployment
./deploy-staging.sh    # Staging
./deploy.sh           # Production (wymaga "yes")
```

**🎉 Sukces! Masz działający system dual-domain z bezpiecznym workflow staging → production!**