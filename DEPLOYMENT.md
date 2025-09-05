# 🚀 Deployment Guide - modeo.pl

Kompletny przewodnik wdrożenia Next.js + WordPress e-commerce na produkcję.

## 📋 Wymagania serwera

- **VPS/Dedicated**: min. 2GB RAM, 20GB SSD, Ubuntu 20.04+
- **Domena**: modeo.pl skonfigurowana na IP serwera
- **Docker**: Docker + Docker Compose
- **SSL**: automatyczne przez Caddy

## 🛠️ Krok po kroku

### 1. Przygotuj serwer

```bash
# Zaloguj się na serwer
ssh root@your-server-ip

# Aktualizuj system
apt update && apt upgrade -y

# Zainstaluj Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Zainstaluj Docker Compose
apt install docker-compose-plugin

# Utwórz użytkownika dla aplikacji
useradd -m -s /bin/bash modeo
usermod -aG docker modeo
su - modeo
```

### 2. Sklonuj projekt

```bash
# Jako użytkownik modeo
cd /home/modeo
git clone <twoj-repo> modeo-shop
cd modeo-shop

# Lub skopiuj pliki przez rsync/scp
```

### 3. Skonfiguruj środowisko

```bash
# Skopiuj i wypełnij zmienne środowiskowe
cp .env.prod .env
nano .env

# Wygeneruj WordPress secrets
curl -s https://api.wordpress.org/secret-key/1.1/salt/
# Skopiuj wygenerowane klucze do .env
```

### 4. Przygotuj pliki konfiguracyjne

```bash
# Skopiuj produkcyjne pliki
cp docker-compose.prod.yml docker-compose.yml
cp Caddyfile.prod Caddyfile
cp frontend/next.config.prod.js frontend/next.config.js

# Upewnij się że masz katalogi
mkdir -p wp-content/plugins wp-content/themes uploads
```

### 5. Skonfiguruj DNS

W panelu domeny (np. home.pl, OVH):
```
A    @       123.456.789.10  (twoje IP serwera)
A    www     123.456.789.10
```

### 6. Uruchom aplikację

```bash
# Build i uruchom wszystkie serwisy
docker compose up -d --build

# Sprawdź logi
docker compose logs -f

# Sprawdź status
docker compose ps
```

### 7. Konfiguracja WordPress

```bash
# Zainstaluj WordPress przez CLI
docker compose exec wordpress wp core install \
  --url="https://modeo.pl" \
  --title="Sklep Modeo" \
  --admin_user=admin \
  --admin_password=secure_admin_password \
  --admin_email=admin@modeo.pl

# Zainstaluj WooCommerce
docker compose exec wordpress wp plugin install woocommerce --activate

# Zainstaluj polskie wtyczki
docker compose exec wordpress wp plugin install flexible-shipping --activate
docker compose exec wordpress wp plugin install platnosci-online-blue-media --activate
docker compose exec wordpress wp plugin install furgonetka --activate

# Aktywuj własne wtyczki CORS
docker compose exec wordpress wp plugin activate cors-for-nextjs
docker compose exec wordpress wp plugin activate store-api-nonce
```

### 8. Konfiguracja WooCommerce

Wejdź na **https://modeo.pl/wp-admin** i skonfiguruj:

1. **WooCommerce → Settings → General**:
   - Store Address: Twój adres
   - Currency: PLN (zł)
   - Country: Poland

2. **WooCommerce → Settings → Payments**:
   - Autopay: włącz i skonfiguruj klucze API
   - Bank Transfer: włącz dla przelewów

3. **WooCommerce → Settings → Shipping**:
   - Flexible Shipping: skonfiguruj strefy i metody
   - Furgonetka: połącz z kontem

4. **Settings → Permalinks**: 
   - Ustaw na "Post name"

## 🔧 Zarządzanie

### Logi aplikacji
```bash
# Wszystkie logi
docker compose logs -f

# Tylko Next.js
docker compose logs -f nextjs

# Tylko WordPress
docker compose logs -f wordpress

# Tylko Caddy (proxy)
docker compose logs -f caddy
```

### Backup bazy danych
```bash
# Backup
docker compose exec db mysqldump -u root -p modeo_prod > backup_$(date +%Y%m%d).sql

# Restore
docker compose exec -i db mysql -u root -p modeo_prod < backup_20250829.sql
```

### Aktualizacje
```bash
# Aktualizuj kod
git pull origin main

# Przebuduj i uruchom
docker compose up -d --build

# WordPress updates przez admin panel lub:
docker compose exec wordpress wp core update
docker compose exec wordpress wp plugin update --all
```

## 🔍 Monitoring i diagnostyka

### Health checks
```bash
# Sprawdź czy wszystko działa
curl -I https://modeo.pl
curl -I https://modeo.pl/wp-admin
curl -I https://modeo.pl/wp-json/wc/store/products
```

### Performance monitoring
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Logi Caddy**: `/var/log/caddy/modeo.log`

### Problemy i rozwiązania

**Problem**: SSL nie działa
```bash
# Sprawdź logi Caddy
docker compose logs caddy

# Restart Caddy
docker compose restart caddy
```

**Problem**: WordPress nie działa
```bash
# Sprawdź bazę danych
docker compose exec db mysql -u root -p -e "SHOW DATABASES;"

# Restart WordPress
docker compose restart wordpress
```

**Problem**: Next.js nie builduje się
```bash
# Debug build
docker compose logs nextjs

# Rebuild z verbose
docker compose up --build nextjs
```

## 🔐 Bezpieczeństwo produkcyjne

1. **Firewall**: Otwórz tylko porty 80, 443, 22
2. **SSH**: Wyłącz hasła, użyj kluczy SSH
3. **WordPress**: Zmień domyślny login admin, silne hasła
4. **Backup**: Automatyczne backupy bazy i plików
5. **Updates**: Regularne aktualizacje systemu i aplikacji
6. **Monitoring**: Alerty na błędy i wysoki ruch

## ⚡ Optymalizacja wydajności

1. **Caching**: Redis dla WordPress (już skonfigurowany)
2. **CDN**: Cloudflare przed Caddy
3. **Database**: Optymalizuj MySQL queries
4. **Images**: Next.js Image optimization (już skonfigurowany)
5. **Monitoring**: New Relic / Datadog dla metryki

---

**🎉 Gratulacje! Twój sklep modeo.pl działa na produkcji!**

Masz pytania? Sprawdź logi i status serwisów powyższymi komendami.