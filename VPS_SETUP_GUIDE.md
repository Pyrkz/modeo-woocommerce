# 🖥️ VPS Setup Guide - Wspólny serwer dla Staging + Production

Przewodnik konfiguracji jednego VPS dla obu środowisk Modeo.pl.

## 🏗️ Architektura na jednym VPS

```
🖥️ VPS Server (Ubuntu 20.04+)
├── 🧪 STAGING Environment
│   ├── Domain: nextmodeo.sitefy.pl
│   ├── Ports: 8080 (HTTP), 8443 (HTTPS)
│   ├── Database: modeo_staging
│   └── Docker Network: staging_network
└── 🔴 PRODUCTION Environment  
    ├── Domain: modeo.pl
    ├── Ports: 80 (HTTP), 443 (HTTPS)
    ├── Database: modeo_production
    └── Docker Network: production_network
```

## 🛠️ Krok po kroku Setup

### 1. Przygotuj VPS

```bash
# Zaloguj się jako root
ssh root@your-vps-ip

# Aktualizuj system
apt update && apt upgrade -y

# Zainstaluj Docker + Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
apt install docker-compose-plugin -y

# Utwórz użytkownika modeo
useradd -m -s /bin/bash modeo
usermod -aG docker modeo
mkdir -p /home/modeo/{staging,production,backups}
chown -R modeo:modeo /home/modeo

# Przełącz się na użytkownika modeo
su - modeo
```

### 2. Setup Staging Environment

```bash
# Jako użytkownik modeo
cd /home/modeo/staging

# Sklonuj projekt dla staging
git clone <your-repo> .

# Konfiguracja staging
cp .env.staging .env
cp docker-compose.staging.yml docker-compose.yml
cp Caddyfile.staging Caddyfile

# Edytuj porty w docker-compose.yml dla staging
nano docker-compose.yml
```

**docker-compose.yml dla staging (zmodyfikowany):**
```yaml
services:
  caddy:
    ports:
      - "8080:80"   # HTTP na porcie 8080
      - "8443:443"  # HTTPS na porcie 8443
    environment:
      DOMAIN: nextmodeo.sitefy.pl
```

### 3. Setup Production Environment

```bash
# Przejdź do katalogu production
cd /home/modeo/production

# Sklonuj projekt dla production
git clone <your-repo> .

# Konfiguracja production
cp .env.prod .env
cp docker-compose.prod.yml docker-compose.yml  
cp Caddyfile.prod Caddyfile

# Production używa standardowych portów 80/443
```

### 4. Konfiguruj DNS

**W panelu domeny:**

```bash
# modeo.pl (Production)
A    @       YOUR-VPS-IP
A    www     YOUR-VPS-IP

# nextmodeo.sitefy.pl (Staging)  
A    nextmodeo   YOUR-VPS-IP
```

### 5. Uruchom oba środowiska

```bash
# Uruchom STAGING
cd /home/modeo/staging
docker compose up -d

# Sprawdź czy działa
curl -I http://YOUR-VPS-IP:8080

# Uruchom PRODUCTION
cd /home/modeo/production  
docker compose up -d

# Sprawdź czy działa
curl -I http://YOUR-VPS-IP
```

## 🔧 Zarządzanie dwoma środowiskami

### Deployment Scripts (zmodyfikowane)

**staging/deploy-staging.sh:**
```bash
#!/bin/bash
cd /home/modeo/staging

# Backup staging DB
BACKUP_NAME="staging_backup_$(date +%Y%m%d_%H%M%S).sql"
docker compose exec -T db mysqldump -u root -p${DB_ROOT_PASSWORD} modeo_staging > "../backups/${BACKUP_NAME}"

# Update and restart
git pull origin main
docker compose down
docker compose up -d --build

# Test staging
curl -I http://YOUR-VPS-IP:8080
```

**production/deploy-production.sh:**
```bash
#!/bin/bash
cd /home/modeo/production

echo "⚠️ PRODUCTION DEPLOYMENT - Continue? (yes/NO)"
read response
[[ "$response" != "yes" ]] && exit 0

# Backup production DB  
BACKUP_NAME="prod_backup_$(date +%Y%m%d_%H%M%S).sql"
docker compose exec -T db mysqldump -u root -p${DB_ROOT_PASSWORD} modeo_production > "../backups/${BACKUP_NAME}"

# Update and restart
git pull origin main
docker compose down
docker compose up -d --build

# Test production
curl -I http://YOUR-VPS-IP
```

### Monitoring

```bash
# Status obu środowisk
cd /home/modeo/staging && docker compose ps
cd /home/modeo/production && docker compose ps

# Logi
cd /home/modeo/staging && docker compose logs -f
cd /home/modeo/production && docker compose logs -f

# Zasoby systemowe
htop
df -h
docker system df
```

## 🔍 URLs i Dostęp

### Staging Environment
- 🌍 **Frontend**: http://YOUR-VPS-IP:8080 → nextmodeo.sitefy.pl
- 🛠️ **WordPress**: http://YOUR-VPS-IP:8080/wp-admin
- 🔗 **API**: http://YOUR-VPS-IP:8080/wp-json/wc/store/products

### Production Environment  
- 🌍 **Frontend**: http://YOUR-VPS-IP → modeo.pl
- 🛠️ **WordPress**: http://YOUR-VPS-IP/wp-admin
- 🔗 **API**: http://YOUR-VPS-IP/wp-json/wc/store/products

## 🔐 Bezpieczeństwo

### Firewall (ufw)
```bash
# Jako root
ufw allow 22      # SSH
ufw allow 80      # Production HTTP
ufw allow 443     # Production HTTPS  
ufw allow 8080    # Staging HTTP
ufw allow 8443    # Staging HTTPS
ufw enable
```

### SSL Certificates
```bash
# Caddy automatycznie zarządza SSL dla obu domen:
# - modeo.pl (production)
# - nextmodeo.sitefy.pl (staging)
```

### Backup Strategy
```bash
# Automatyczny backup (cron job)
crontab -e

# Backup obu baz codziennie o 2:00
0 2 * * * cd /home/modeo/staging && docker compose exec -T db mysqldump -u root -p${DB_ROOT_PASSWORD} modeo_staging > /home/modeo/backups/staging_auto_$(date +\%Y\%m\%d).sql
0 2 * * * cd /home/modeo/production && docker compose exec -T db mysqldump -u root -p${DB_ROOT_PASSWORD} modeo_production > /home/modeo/backups/production_auto_$(date +\%Y\%m\%d).sql

# Czyść stare backupy (starsze niż 30 dni)
0 3 * * * find /home/modeo/backups -name "*.sql" -mtime +30 -delete
```

## 🚀 Workflow

### 1. Development → Staging
```bash
# Local development
git commit -am "New feature"
git push origin main

# Deploy na staging
ssh modeo@your-vps-ip
cd staging
./deploy-staging.sh

# Test na http://nextmodeo.sitefy.pl
```

### 2. Staging → Production  
```bash
# Po przetestowaniu staging
cd /home/modeo/production
./deploy-production.sh
# Wpisz "yes"

# Monitor http://modeo.pl
```

## 🆘 Troubleshooting

### Problem: Port conflict
```bash
# Sprawdź które porty są zajęte
netstat -tlnp | grep :80
netstat -tlnp | grep :8080

# Sprawdź kontenery
docker ps
```

### Problem: SSL nie działa
```bash  
# Sprawdź logi Caddy
cd /home/modeo/production && docker compose logs caddy
cd /home/modeo/staging && docker compose logs caddy

# Restart Caddy
docker compose restart caddy
```

### Problem: Baza danych
```bash
# Sprawdź status DB
cd /home/modeo/staging && docker compose exec db mysql -u root -p -e "SHOW DATABASES;"
cd /home/modeo/production && docker compose exec db mysql -u root -p -e "SHOW DATABASES;"
```

**🎉 Gotowe! Masz działający VPS z dwoma osobnymi środowiskami na jednym serwerze!**