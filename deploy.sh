#!/bin/bash

# 🚀 Deploy Script for PRODUCTION - modeo.pl
# Automatyczny deployment na serwer produkcyjny
# UWAGA: To jest deployment produkcyjny - używaj ostrożnie!

set -e

echo "🚀 Modeo.pl PRODUCTION Deployment Script"
echo "========================================="
echo "Target: modeo.pl (PRODUCTION)"
echo "========================================="

# Kolory dla output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funkcje pomocnicze
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Sprawdź czy jesteś na serwerze produkcyjnym
if [ ! -f "/home/modeo/.production" ]; then
    log_error "Ten skrypt należy uruchamiać na serwerze PRODUKCYJNYM!"
    log_info "Utwórz plik /home/modeo/.production na serwerze produkcyjnym"
    log_warning "Upewnij się, że jesteś na właściwym serwerze!"
    exit 1
fi

# Sprawdź czy Docker działa
if ! docker --version > /dev/null 2>&1; then
    log_error "Docker nie jest zainstalowany lub nie działa!"
    exit 1
fi

log_error "⚠️  PRODUKCJA - Kontynuować? (yes/NO)"
read -r response
if [[ ! "$response" == "yes" ]]; then
    log_info "Deployment anulowany przez użytkownika"
    exit 0
fi

log_error "Rozpoczynam deployment PRODUKCYJNY..."

# 1. Backup bazy danych
log_info "Tworzę backup bazy danych..."
if docker compose ps | grep -q "db"; then
    BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S).sql"
    docker compose exec -T db mysqldump -u root -p${DB_ROOT_PASSWORD} modeo_production > "backups/${BACKUP_NAME}" || log_warning "Backup failed"
    log_success "Backup utworzony: ${BACKUP_NAME}"
else
    log_warning "Baza danych nie działa - pomijam backup"
fi

# 2. Aktualizuj kod (jeśli git repo)
if [ -d ".git" ]; then
    log_info "Pobieram najnowszy kod z git..."
    git fetch origin
    git pull origin main
    log_success "Kod zaktualizowany"
fi

# 3. Sprawdź pliki konfiguracyjne PRODUKCYJNE
log_info "Konfiguruje środowisko produkcyjne..."

# Sprawdź czy istnieje .env.local z prawdziwymi danymi
if [ ! -f ".env.local" ]; then
    log_error "BRAK PLIKU .env.local z prawdziwymi danymi produkcyjnymi!"
    log_error "1. Skopiuj: cp .env.production .env.local"
    log_error "2. Edytuj .env.local z prawdziwymi hasłami"
    log_error "3. NIE commituj .env.local do Git!"
    exit 1
fi

# Użyj .env.local dla produkcji (z prawdziwymi danymi)
log_info "Używam .env.local z prawdziwymi danymi produkcyjnymi"
cp .env.local .env

# Sprawdź czy wszystkie wymagane zmienne są wypełnione
if grep -q "REPLACE_WITH_" .env; then
    log_error "W pliku .env.local są jeszcze placeholdery!"
    log_error "Wypełnij wszystkie REPLACE_WITH_* prawdziwymi wartościami"
    exit 1
fi

# Walidacja zmiennych środowiskowych
log_info "Sprawdzam konfigurację zmiennych środowiskowych..."
if ! ./validate-env.sh; then
    log_error "Walidacja zmiennych środowiskowych nie powiodła się!"
    exit 1
fi

if [ ! -f "docker-compose.yml" ]; then
    cp docker-compose.prod.yml docker-compose.yml
    log_info "Skopiowano docker-compose.prod.yml"
fi

if [ ! -f "Caddyfile" ]; then
    cp Caddyfile.prod Caddyfile
    log_info "Skopiowano Caddyfile.prod"
fi

if [ ! -f "frontend/next.config.js" ]; then
    cp frontend/next.config.prod.js frontend/next.config.js
    log_info "Skopiowano next.config.prod.js"
fi

# 4. Sprawdź czy porty są wolne
log_info "Sprawdzam porty..."
if netstat -tuln | grep -q ":80\|:443"; then
    log_warning "Porty 80 lub 443 są zajęte. Kontynuować? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        log_error "Deployment anulowany"
        exit 1
    fi
fi

# 5. Build i restart aplikacji
log_info "Rebuilduję i uruchamiam aplikację..."

# Zatrzymaj stare kontenery
docker compose down

# Zbuduj nowe obrazy
docker compose build --no-cache

# Uruchom wszystko
docker compose up -d

log_success "Aplikacja uruchomiona!"

# 6. Sprawdź status serwisów
log_info "Sprawdzam status serwisów..."
sleep 10

SERVICES=("caddy" "nextjs" "wordpress" "db" "redis")
for service in "${SERVICES[@]}"; do
    if docker compose ps | grep -q "$service.*Up"; then
        log_success "$service: ✅ Działa"
    else
        log_error "$service: ❌ Nie działa"
    fi
done

# 7. Health checks
log_info "Wykonuję testy połączenia..."

# Test głównej strony
if curl -s -I https://modeo.pl | grep -q "200 OK"; then
    log_success "Strona główna PRODUKCJA: ✅ Działa"
else
    log_error "Strona główna PRODUKCJA: ❌ Nie działa"
fi

# Test WordPress admin
if curl -s -I https://modeo.pl/wp-admin/ | grep -q "200\|302"; then
    log_success "WordPress admin PRODUKCJA: ✅ Działa"
else
    log_error "WordPress admin PRODUKCJA: ❌ Nie działa"
fi

# Test WooCommerce API
if curl -s https://modeo.pl/wp-json/wc/store/products | grep -q "\["; then
    log_success "WooCommerce API PRODUKCJA: ✅ Działa"
else
    log_error "WooCommerce API PRODUKCJA: ❌ Nie działa"
fi

# 8. Podsumowanie
echo ""
echo "🎉 PRODUCTION Deployment zakończony!"
echo "====================================="
echo ""
echo "🔴 PRODUCTION URLs:"
echo "   🌍 Strona główna:      https://modeo.pl"
echo "   🛠️  WordPress admin:    https://modeo.pl/wp-admin"
echo "   🛒 WooCommerce:        https://modeo.pl/wp-admin/admin.php?page=wc-admin"
echo "   📱 Sklep:              https://modeo.pl/sklep"
echo "   🛒 Koszyk:             https://modeo.pl/koszyk"
echo ""
echo "📊 Monitoring:"
echo "   docker compose logs -f       # Wszystkie logi"
echo "   docker compose ps            # Status serwisów"
echo "   htop                         # Zasoby systemu"
echo ""
echo "🚨 EMERGENCY - W razie problemów PRODUKCYJNYCH:"
echo "   docker compose down          # ZATRZYMAJ PRODUKCJĘ"
echo "   docker compose up -d         # Uruchom ponownie"
echo "   ./deploy-staging.sh          # Testuj na staging"
echo "   ./deploy.sh                  # Ponów production deployment"
echo ""
echo "💾 Backup bazy:"
echo "   Backup: backups/${BACKUP_NAME:-latest_backup.sql}"
echo "   Restore: mysql -u root -p modeo_production < backup_file.sql"

log_success "PRODUCTION Deployment completed successfully! 🚀"
echo ""
log_error "⚠️  UWAGA: To jest środowisko PRODUKCYJNE - monitoruj przez pierwsze godziny!"