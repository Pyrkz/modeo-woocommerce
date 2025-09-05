# 🔄 Migration Guide - Przejście na Dual-Domain

Bezpieczna migracja z obecnej struktury do dual-domain bez przerwy w działaniu.

## 📊 Plan Migracji

### Etap 1: Backup i przygotowanie
### Etap 2: Reorganizacja na staging
### Etap 3: Setup production
### Etap 4: DNS i SSL
### Etap 5: Testy i weryfikacja

---

## 🛠️ Etap 1: Backup i Przygotowanie

```bash
# Zaloguj się na VPS
ssh modeo@your-vps-ip
cd /home/modeo

# 1. PEŁNY BACKUP wszystkiego
sudo mkdir -p /backup/modeo-migration
sudo cp -r /home/modeo /backup/modeo-migration/
echo "Backup created: $(date)" | sudo tee /backup/modeo-migration/backup-info.txt

# 2. Backup bazy danych
docker compose exec -T db mysqldump -u root -p${DB_ROOT_PASSWORD} --all-databases > full-backup-$(date +%Y%m%d).sql

# 3. Stop obecnych kontenerów (krótka przerwa)
docker compose down
```

## 🔄 Etap 2: Reorganizacja na Staging

```bash
# Jesteś w /home/modeo

# 1. Utwórz strukturę katalogów
mkdir -p staging production backups

# 2. Przenieś obecne pliki do staging
mv docker-compose.yml staging/
mv .env staging/
mv wp-content staging/
mv frontend staging/
mv Caddyfile staging/ 2>/dev/null || echo "Caddyfile not found"
cp -r backend/* staging/ 2>/dev/null || echo "Backend files moved"

# 3. Pobierz nowe pliki konfiguracyjne
cd staging
git pull origin main  # Zaktualizuj do najnowszej wersji

# 4. Skonfiguruj staging
cp .env.staging .env
cp docker-compose.staging.yml docker-compose.yml
cp Caddyfile.staging Caddyfile

# 5. Uruchom staging (na obecnej domenie nextmodeo.sitefy.pl)
docker compose up -d

# 6. Sprawdź czy działa
curl -I https://nextmodeo.sitefy.pl
```

## 🚀 Etap 3: Setup Production

```bash
# Przejdź do katalogu production
cd /home/modeo/production

# 1. Pobierz kod dla production
git clone <your-repo> .

# 2. Skonfiguruj production
cp .env.prod .env
# EDYTUJ .env - wpisz PRAWDZIWE hasła production!
nano .env

cp docker-compose.prod.yml docker-compose.yml
cp Caddyfile.prod Caddyfile

# 3. WAŻNE: Zmień porty w docker-compose.yml (tymczasowo)
nano docker-compose.yml
# Zmień caddy ports na:
# ports:
#   - "8080:80"    # Tymczasowo na 8080
#   - "8443:443"   # Tymczasowo na 8443

# 4. Uruchom production (na portach 8080/8443)
docker compose up -d

# 5. Test production
curl -I http://your-vps-ip:8080
```

## 🌍 Etap 4: DNS i SSL

### A) Konfiguruj DNS dla modeo.pl

W panelu domeny modeo.pl:
```
A    @       YOUR-VPS-IP
A    www     YOUR-VPS-IP
```

### B) Czekaj na propagację DNS (15-30 min)

```bash
# Sprawdź czy DNS się rozpropagował
nslookup modeo.pl
dig modeo.pl
```

### C) Przełącz porty na production

```bash
cd /home/modeo/production

# 1. Stop production
docker compose down

# 2. Przełącz staging na porty 8080/8443
cd /home/modeo/staging
docker compose down
nano docker-compose.yml
# Zmień caddy ports na:
# ports:
#   - "8080:80"
#   - "8443:443"
docker compose up -d

# 3. Przełącz production na standardowe porty 80/443
cd /home/modeo/production  
nano docker-compose.yml
# Przywróć caddy ports:
# ports:
#   - "80:80"
#   - "443:443"
docker compose up -d
```

### D) Sprawdź SSL

```bash
# Production (modeo.pl) 
curl -I https://modeo.pl

# Staging (nextmodeo.sitefy.pl)
curl -I https://nextmodeo.sitefy.pl
```

## ✅ Etap 5: Testy i Weryfikacja

### A) Test Staging (nextmodeo.sitefy.pl)
```bash
# Funkcjonalność
curl -I https://nextmodeo.sitefy.pl
curl https://nextmodeo.sitefy.pl/wp-json/wc/store/products
curl -I https://nextmodeo.sitefy.pl/wp-admin

# WordPress admin
# Otwórz: https://nextmodeo.sitefy.pl/wp-admin
```

### B) Test Production (modeo.pl)
```bash
# Funkcjonalność  
curl -I https://modeo.pl
curl https://modeo.pl/wp-json/wc/store/products
curl -I https://modeo.pl/wp-admin

# WordPress admin
# Otwórz: https://modeo.pl/wp-admin
```

### C) Test Dual-Domain Plugin

W WordPress admin (obu środowisk):
- Sprawdź czy jest wskaźnik STAGING/PRODUCTION w admin bar
- Sprawdź powiadomienia o środowisku

---

## 🔧 Finalne Uporządkowanie

### Deployment Scripts

```bash
# W katalogu staging
cd /home/modeo/staging
chmod +x deploy-staging.sh

# W katalogu production  
cd /home/modeo/production
chmod +x deploy.sh deploy-production.sh

# Test deployment scripts
cd /home/modeo/staging
./deploy-staging.sh

cd /home/modeo/production  
./deploy.sh  # Wymaga wpisania "yes"
```

### Monitoring

```bash
# Status wszystkich kontenerów
docker ps

# Porty
netstat -tlnp | grep :80
netstat -tlnp | grep :8080
netstat -tlnp | grep :443
netstat -tlnp | grep :8443

# Logi
cd /home/modeo/staging && docker compose logs -f caddy
cd /home/modeo/production && docker compose logs -f caddy
```

---

## 🆘 Rollback Plan (gdyby coś poszło nie tak)

### Przywróć poprzedni stan:
```bash
# Stop wszystkie nowe kontenery
cd /home/modeo/staging && docker compose down
cd /home/modeo/production && docker compose down

# Przywróć backup
sudo cp -r /backup/modeo-migration/modeo/* /home/modeo/
cd /home/modeo

# Przywróć bazę danych
docker compose exec -i db mysql -u root -p < full-backup-YYYYMMDD.sql

# Uruchom stary setup
docker compose up -d
```

---

## 📋 Checklist Migracji

- [ ] Backup obecnego stanu
- [ ] Reorganizacja na staging 
- [ ] Staging działa na nextmodeo.sitefy.pl
- [ ] Setup production environment
- [ ] DNS dla modeo.pl skonfigurowany
- [ ] SSL działa na obu domenach
- [ ] Dual-domain plugin aktywny
- [ ] Deployment scripts działają
- [ ] Monitoring skonfigurowany
- [ ] Backup strategy wdrożona

**🎉 Po tej migracji będziesz mieć:**
- ✅ Staging: https://nextmodeo.sitefy.pl (port 8080/8443)
- ✅ Production: https://modeo.pl (port 80/443) 
- ✅ Osobne bazy danych
- ✅ Bezpieczny workflow staging → production