# 🔐 Konfiguracja przekierowań logowania - Modeo E-commerce

## 📋 Podsumowanie zmian

Skonfigurowałem system tak, aby wszystkie logowania (zarówno adminów jak i klientów) odbywały się przez stronę `/moje-konto`, a nie przez standardowe strony WordPress (`wp-admin`, `wp-login.php`). Wylogowanie zawsze prowadzi do strony głównej.

## 🆕 Nowy plugin: Unified Login Redirect

Utworzyłem nowy plugin `unified-login-redirect.php` który:

### Główne funkcjonalności:
1. **Przekierowuje wp-login.php → /moje-konto** - wszystkie próby dostępu do wp-login.php są przekierowywane
2. **Przekierowuje wp-admin → /moje-konto** - dla niezalogowanych użytkowników
3. **Jednolite logowanie** - zarówno admini jak i klienci logują się przez /moje-konto
4. **Wylogowanie → strona główna** - zawsze przekierowuje na główną stronę (localhost:3000 lub nextmodeo.sitefy.pl)
5. **Bezpieczeństwo URL** - weryfikuje czy przekierowania są bezpieczne

### Szczegóły techniczne:
- Plugin używa wysokiego priorytetu (999) aby nadpisać inne przekierowania
- Automatycznie dezaktywuje poprzednie pluginy przekierowań przy aktywacji
- Respektuje parametr `redirect_to` jeśli jest bezpieczny
- Obsługuje zarówno środowisko development (localhost) jak i production

## 📁 Istniejące pluginy

### 1. nextjs-login-redirect.php
- Obsługuje przekierowania po zalogowaniu dla klientów
- Przekierowuje do Next.js po wylogowaniu
- **Status**: Można dezaktywować po aktywacji nowego pluginu

### 2. customer-friendly-redirects.php  
- Blokuje dostęp do wp-admin dla nie-adminów
- Przekierowuje klientów do /moje-konto
- **Status**: Można dezaktywować po aktywacji nowego pluginu

### 3. Theme functions.php
- Już zawiera funkcję przekierowania po wylogowaniu
- Współpracuje z nowym pluginem

## 🚀 Instrukcja wdrożenia

### 1. Aktywacja nowego pluginu:
```bash
# W WordPress Admin:
1. Przejdź do Wtyczki → Zainstalowane wtyczki
2. Znajdź "Unified Login Redirect"
3. Kliknij "Włącz"
```

### 2. Dezaktywacja starych pluginów (opcjonalne):
Plugin automatycznie dezaktywuje stare pluginy przy aktywacji, ale możesz też zrobić to ręcznie:
```bash
# Dezaktywuj:
- Next.js Login Redirect
- Customer Friendly Redirects
```

### 3. Testowanie:
```bash
# Test 1: Przekierowanie wp-login.php
1. Otwórz http://localhost:8080/wp-login.php
2. Powinno przekierować do http://localhost:8080/moje-konto/

# Test 2: Logowanie admina
1. Zaloguj się jako admin na /moje-konto
2. Po zalogowaniu pozostaniesz na /moje-konto

# Test 3: Logowanie klienta  
1. Zaloguj się jako klient na /moje-konto
2. Po zalogowaniu pozostaniesz na /moje-konto

# Test 4: Wylogowanie
1. Kliknij "Wyloguj się"
2. Powinno przekierować do http://localhost:3000/ (strona główna)
```

## 🔧 Konfiguracja dodatkowa

### Jeśli chcesz zmienić zachowanie:

1. **Zmiana strony docelowej po wylogowaniu:**
```php
// W pliku unified-login-redirect.php, funkcja get_home_url()
private function get_home_url() {
    // Zmień na dowolny URL
    return 'https://twoja-strona.pl/';
}
```

2. **Wyjątki dla adminów (jeśli jednak chcesz aby admini mogli używać wp-admin):**
```php
// W funkcji unified_login_redirect() dodaj:
if (user_can($user, 'manage_options')) {
    return admin_url(); // Admini idą do wp-admin
}
```

## ⚠️ Uwagi

1. **Sesje i ciasteczka** - Plugin respektuje istniejące sesje WordPress/WooCommerce
2. **AJAX requesty** - Nie są blokowane, więc funkcjonalności AJAX dalej działają
3. **Bezpieczeństwo** - Wszystkie przekierowania są weryfikowane pod kątem bezpieczeństwa
4. **Kompatybilność** - Działa z WooCommerce i istniejącą konfiguracją

## 🔍 Rozwiązywanie problemów

### Problem: Pętla przekierowań
**Rozwiązanie**: Upewnij się, że strona /moje-konto istnieje i jest poprawnie skonfigurowana w WooCommerce

### Problem: Nie mogę się dostać do wp-admin jako admin
**Rozwiązanie**: 
1. Dodaj `?action=logout` aby się wylogować
2. Lub tymczasowo dezaktywuj plugin przez FTP/phpMyAdmin

### Problem: Przekierowanie nie działa
**Rozwiązanie**: Wyczyść cache przeglądarki i WordPress

## 📝 Podsumowanie

System teraz działa tak:
- ✅ Wszystkie logowania przez `/moje-konto`
- ✅ Brak dostępu do `wp-login.php` i `wp-admin` dla logowania
- ✅ Wylogowanie zawsze prowadzi do strony głównej
- ✅ Zarówno admini jak i klienci używają tego samego systemu logowania
- ✅ Zachowane bezpieczeństwo i funkcjonalność e-commerce