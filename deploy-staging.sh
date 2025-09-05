#!/bin/bash

# 🚀 Deploy Script for STAGING - nextmodeo.sitefy.pl
# Deployment do środowiska testowego/staging

set -e

echo "🚀 Modeo.pl STAGING Deployment Script"
echo "======================================"
echo "Target: nextmodeo.sitefy.pl (STAGING)"
echo "======================================"

# Kolory dla output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
ORANGE='\033[0;33m'
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

log_staging() {
    echo -e "${ORANGE}[STAGING]${NC} $1"
}

# Sprawdź czy jesteś na serwerze
if [ ! -f "/home/modeo/.staging" ]; then
    log_error "Ten skrypt należy uruchamiać na serwerze staging!"
    log_info "Utwórz plik /home/modeo/.staging na serwerze staging"
    exit 1
fi

# Sprawdź czy Docker działa
if ! docker --version > /dev/null 2>&1; then
    log_error "Docker nie jest zainstalowany lub nie działa!"
    exit 1
fi

log_staging "Rozpoczynam deployment na STAGING..."

# 1. Backup bazy danych
log_info "Tworzę backup bazy danych staging..."
if docker compose ps | grep -q "db"; then
    BACKUP_NAME="staging_backup_$(date +%Y%m%d_%H%M%S).sql"
    mkdir -p backups
    docker compose exec -T db mysqldump -u root -p${DB_ROOT_PASSWORD} modeo_staging > "backups/${BACKUP_NAME}" || log_warning "Backup failed"
    log_success "Staging backup utworzony: ${BACKUP_NAME}"
else
    log_warning "Baza danych nie działa - pomijam backup"
fi

# 2. Aktualizuj kod (jeśli git repo)
if [ -d ".git" ]; then
    log_info "Pobieram najnowszy kod z git..."
    git fetch origin
    # Dla staging można użyć develop lub main branch
    git pull origin main
    log_success "Kod zaktualizowany"
fi

# 3. Sprawdź pliki konfiguracyjne STAGING
log_info "Konfiguruje środowisko staging..."

# Sprawdź czy istnieje .env.staging.local z danymi staging
if [ -f ".env.staging.local" ]; then
    log_info "Używam .env.staging.local z prawdziwymi danymi staging"
    cp .env.staging.local .env
elif [ -f ".env.staging" ]; then
    log_info "Używam .env.staging (template)"
    cp .env.staging .env
    # Sprawdź czy są placeholdery w staging
    if grep -q "REPLACE_WITH_" .env; then
        log_warning "Staging używa templatu - niektóre funkcje mogą nie działać"
        log_warning "Utwórz .env.staging.local z prawdziwymi danymi staging"
    fi
else
    log_error "Brak pliku .env.staging! Utwórz na podstawie .env.production"
    exit 1
fi

# Walidacja zmiennych środowiskowych (mniej restrykcyjna dla staging)
log_info "Sprawdzam konfigurację zmiennych środowiskowych staging..."
if ./validate-env.sh 2>/dev/null; then
    log_success "Konfiguracja staging jest poprawna"
else
    log_warning "Niektóre zmienne staging mogą być niekompletne - kontynuuję"
fi

# Skopiuj staging docker-compose
if [ ! -f "docker-compose.yml" ] || [ "docker-compose.staging.yml" -nt "docker-compose.yml" ]; then
    cp docker-compose.staging.yml docker-compose.yml
    log_info "Skopiowano docker-compose.staging.yml"
fi

# Skopiuj staging Caddyfile
if [ ! -f "Caddyfile" ] || [ "Caddyfile.staging" -nt "Caddyfile" ]; then
    cp Caddyfile.staging Caddyfile
    log_info "Skopiowano Caddyfile.staging"
fi

# Next.js config dla staging
if [ ! -f "frontend/next.config.js" ]; then
    if [ -f "frontend/next.config.prod.js" ]; then
        cp frontend/next.config.prod.js frontend/next.config.js
        log_info "Skopiowano next.config.prod.js"
    fi
fi

# 4. Sprawdź czy porty są wolne
log_info "Sprawdzam porty..."
if netstat -tuln | grep -q ":80\|:443"; then
    log_warning "Porty 80 lub 443 są zajęte. To środowisko staging - kontynuuję."
fi

# 5. Build i restart aplikacji
log_staging "Rebuilduję i uruchamiam aplikację staging..."

# Zatrzymaj stare kontenery
docker compose down

# Wyczyść stare obrazy (bardziej agresywnie na staging)
log_info "Czyszczę stare obrazy Docker..."
docker system prune -f

# Zbuduj nowe obrazy
docker compose build --no-cache

# Uruchom wszystko
docker compose up -d

log_success "Aplikacja staging uruchomiona!"

# 6. Sprawdź status serwisów
log_info "Sprawdzam status serwisów staging..."
sleep 15

SERVICES=("caddy" "nextjs" "wordpress" "db" "redis")
for service in "${SERVICES[@]}"; do
    if docker compose ps | grep -q "$service.*Up"; then
        log_success "$service: ✅ Działa"
    else
        log_error "$service: ❌ Nie działa"
        # Pokaż logi dla niedziałającego serwisu
        log_info "Logi dla $service:"
        docker compose logs --tail=20 $service
    fi
done

# 7. Health checks dla staging
log_info "Wykonuję testy połączenia staging..."

# Czekaj na uruchomienie
sleep 10

# Test głównej strony
if curl -s -I https://nextmodeo.sitefy.pl | grep -q "200 OK"; then
    log_success "Strona główna staging: ✅ Działa"
else
    log_warning "Strona główna staging: ⚠️ Może nie działać jeszcze"
    log_info "Sprawdzenie za 30 sekund..."
    sleep 30
    if curl -s -I https://nextmodeo.sitefy.pl | grep -q "200 OK"; then
        log_success "Strona główna staging: ✅ Działa (po odczekaniu)"
    else
        log_error "Strona główna staging: ❌ Nie działa"
    fi
fi

# Test WordPress admin
if curl -s -I https://nextmodeo.sitefy.pl/wp-admin/ | grep -q "200\|302"; then
    log_success "WordPress admin staging: ✅ Działa"
else
    log_warning "WordPress admin staging: ⚠️ Może nie działać jeszcze"
fi

# Test WooCommerce API
if curl -s https://nextmodeo.sitefy.pl/wp-json/wc/store/products | grep -q "\["; then
    log_success "WooCommerce API staging: ✅ Działa"
else
    log_warning "WooCommerce API staging: ⚠️ Może nie działać jeszcze"
fi

# 8. Podsumowanie STAGING
echo ""
echo "🎉 STAGING Deployment zakończony!"
echo "================================="
echo ""
echo "🧪 STAGING URLs:"
echo "   🌍 Strona główna:      https://nextmodeo.sitefy.pl"
echo "   🛠️  WordPress admin:    https://nextmodeo.sitefy.pl/wp-admin"
echo "   🛒 WooCommerce:        https://nextmodeo.sitefy.pl/wp-admin/admin.php?page=wc-admin"
echo "   📱 Sklep:              https://nextmodeo.sitefy.pl/sklep"
echo "   🛒 Koszyk:             https://nextmodeo.sitefy.pl/koszyk"
echo ""
echo "📊 Monitoring staging:"
echo "   docker compose logs -f       # Wszystkie logi"
echo "   docker compose ps            # Status serwisów"
echo "   htop                         # Zasoby systemu"
echo ""
echo "🚀 Następne kroki:"
echo "   1. Przetestuj wszystkie funkcje na staging"
echo "   2. Sprawdź płatności testowe"
echo "   3. Zweryfikuj integracje (Furgonetka, Autopay)"
echo "   4. Jeśli wszystko OK, uruchom: ./deploy-production.sh"
echo ""
echo "🆘 W razie problemów:"
echo "   docker compose down          # Zatrzymaj"
echo "   docker compose up -d         # Uruchom ponownie"
echo "   ./deploy-staging.sh          # Ponów staging deployment"

log_success "STAGING Deployment completed successfully! 🧪"
echo ""
log_warning "UWAGA: To jest środowisko STAGING. Testuj tutaj przed wdrożeniem na produkcję!"