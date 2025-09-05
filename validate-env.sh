#!/bin/bash

# 🔒 Environment Variables Validator
# Sprawdza czy wszystkie wymagane zmienne środowiskowe są prawidłowo skonfigurowane

set -e

echo "🔒 Modeo.pl Environment Validator"
echo "================================"

# Kolory
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Funkcja sprawdzająca zmienną
check_var() {
    local var_name="$1"
    local var_value="$2"
    local required="$3"
    local pattern="$4"

    if [ -z "$var_value" ]; then
        if [ "$required" = "true" ]; then
            log_error "Brak wymaganej zmiennej: $var_name"
            return 1
        else
            log_warning "Opcjonalna zmienna pusta: $var_name"
            return 0
        fi
    fi

    # Sprawdź czy to placeholder
    if echo "$var_value" | grep -q "REPLACE_WITH_\|your_.*_here\|example\|template"; then
        log_error "Zmienna $var_name zawiera placeholder: $var_value"
        return 1
    fi

    # Sprawdź pattern jeśli podany
    if [ -n "$pattern" ]; then
        if ! echo "$var_value" | grep -q "$pattern"; then
            log_error "Zmienna $var_name nie pasuje do wzorca: $var_value"
            return 1
        fi
    fi

    log_success "✓ $var_name: $(echo "$var_value" | sed 's/./*/g' | sed 's/^\(.\{4\}\).*/\1***/')"
    return 0
}

# Sprawdź czy plik .env istnieje
if [ ! -f ".env" ]; then
    log_error "Brak pliku .env!"
    echo ""
    echo "Dla production:"
    echo "  cp .env.local .env    # (prawdziwe dane)"
    echo ""
    echo "Dla staging:"
    echo "  cp .env.staging .env  # (template)"
    echo "  lub"
    echo "  cp .env.staging.local .env  # (prawdziwe dane staging)"
    exit 1
fi

log_info "Sprawdzam zmienne środowiskowe w pliku .env..."
echo ""

# Wczytaj zmienne z .env
source .env

ERRORS=0

# Sprawdź zmienne bazy danych
log_info "=== Baza danych ==="
check_var "DB_PASSWORD" "$DB_PASSWORD" "true" "^.{8,}$" || ERRORS=$((ERRORS+1))
check_var "DB_ROOT_PASSWORD" "$DB_ROOT_PASSWORD" "true" "^.{8,}$" || ERRORS=$((ERRORS+1))

echo ""
log_info "=== WordPress Security Keys ==="
check_var "WP_AUTH_KEY" "$WP_AUTH_KEY" "true" "^.{64,}$" || ERRORS=$((ERRORS+1))
check_var "WP_SECURE_AUTH_KEY" "$WP_SECURE_AUTH_KEY" "true" "^.{64,}$" || ERRORS=$((ERRORS+1))
check_var "WP_LOGGED_IN_KEY" "$WP_LOGGED_IN_KEY" "true" "^.{64,}$" || ERRORS=$((ERRORS+1))
check_var "WP_NONCE_KEY" "$WP_NONCE_KEY" "true" "^.{64,}$" || ERRORS=$((ERRORS+1))
check_var "WP_AUTH_SALT" "$WP_AUTH_SALT" "true" "^.{64,}$" || ERRORS=$((ERRORS+1))
check_var "WP_SECURE_AUTH_SALT" "$WP_SECURE_AUTH_SALT" "true" "^.{64,}$" || ERRORS=$((ERRORS+1))
check_var "WP_LOGGED_IN_SALT" "$WP_LOGGED_IN_SALT" "true" "^.{64,}$" || ERRORS=$((ERRORS+1))
check_var "WP_NONCE_SALT" "$WP_NONCE_SALT" "true" "^.{64,}$" || ERRORS=$((ERRORS+1))

echo ""
log_info "=== Next.js URLs ==="
check_var "NEXT_PUBLIC_API_URL" "$NEXT_PUBLIC_API_URL" "true" "^https://.*" || ERRORS=$((ERRORS+1))
check_var "NEXT_PUBLIC_ENVIRONMENT" "$NEXT_PUBLIC_ENVIRONMENT" "true" "^(production|staging|development)$" || ERRORS=$((ERRORS+1))

echo ""
log_info "=== Email/SMTP (opcjonalne) ==="
check_var "SMTP_HOST" "$SMTP_HOST" "false" || true
check_var "SMTP_USER" "$SMTP_USER" "false" || true
check_var "SMTP_PASS" "$SMTP_PASS" "false" || true

echo ""
log_info "=== reCAPTCHA (opcjonalne) ==="
check_var "RECAPTCHA_KEY" "$RECAPTCHA_KEY" "false" || true
check_var "RECAPTCHA_SECRET_KEY" "$RECAPTCHA_SECRET_KEY" "false" || true

echo ""
log_info "=== Dodatkowe ==="
check_var "NODE_ENV" "$NODE_ENV" "true" "^(production|staging|development)$" || ERRORS=$((ERRORS+1))
check_var "WORDPRESS_ENV" "$WORDPRESS_ENV" "true" "^(production|staging|development)$" || ERRORS=$((ERRORS+1))

echo ""
echo "================================"
if [ $ERRORS -eq 0 ]; then
    log_success "✅ Wszystkie zmienne środowiskowe są poprawnie skonfigurowane!"
    echo ""
    log_info "Możesz kontynuować deployment:"
    echo "  ./deploy.sh           # Produkcja"
    echo "  ./deploy-staging.sh   # Staging"
    exit 0
else
    log_error "❌ Znaleziono $ERRORS błędów w konfiguracji!"
    echo ""
    log_info "Napraw błędy w pliku .env i uruchom ponownie"
    echo ""
    log_info "Przydatne linki:"
    echo "  WordPress keys: https://api.wordpress.org/secret-key/1.1/salt/"
    echo "  reCAPTCHA keys: https://www.google.com/recaptcha/admin"
    echo "  SECURITY.md: Więcej informacji o bezpieczeństwie"
    exit 1
fi