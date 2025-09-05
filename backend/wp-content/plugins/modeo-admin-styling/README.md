# Modeo Admin Styling Plugin

Wtyczka WordPress do niestandardowego stylowania kokpitu administracyjnego dla sklepu Modeo.pl.

## Funkcje

- ✅ **Niestandardowe stylowanie kokpitu** - Nowoczesny wygląd panelu administratora
- ✅ **Stylowanie strony logowania** - Elegancka strona logowania z brandingiem Modeo
- ✅ **Panel ustawień** - Możliwość dodawania niestandardowego CSS
- ✅ **Obsługa WooCommerce** - Specjalne style dla WooCommerce
- ✅ **Responsive design** - Działa na wszystkich urządzeniach
- ✅ **Łatwa kontrola** - Możliwość włączania/wyłączania przez panel administracyjny

## Instalacja

1. Skopiuj folder `modeo-admin-styling` do katalogu `/wp-content/plugins/`
2. Aktywuj wtyczkę przez panel 'Wtyczki' w WordPress
3. Przejdź do Ustawienia > Admin Styling aby skonfigurować

## Konfiguracja

### Panel ustawień
- **Włącz niestandardowe stylowanie** - Główny przełącznik wtyczki
- **Niestandardowy CSS** - Pole do dodawania własnego CSS

### Dostęp do ustawień
`Ustawienia > Admin Styling` w panelu administracyjnym WordPress

## Funkcjonalności

### Stylowanie kokpitu administratora
- Niestandardowa paleta kolorów Modeo
- Nowoczesne menu boczne
- Stylowane przyciski i formularze
- Animacje i przejścia
- Specjalne style dla WooCommerce

### Stylowanie strony logowania
- Gradient tło
- Przezroczyste formularze z efektem blur
- Logo Modeo.pl
- Responsive design
- Animacje ładowania

## Paleta kolorów

```css
--modeo-primary: #007cba;    /* Główny niebieski */
--modeo-secondary: #135e96;  /* Ciemniejszy niebieski */
--modeo-accent: #00a32a;     /* Zielony akcent */
--modeo-dark: #1d2327;       /* Ciemny tekst */
--modeo-light: #f6f7f7;      /* Jasłe tło */
```

## Struktura plików

```
modeo-admin-styling/
├── modeo-admin-styling.php  # Główny plik wtyczki
├── assets/css/
│   ├── admin-style.css      # Style kokpitu
│   └── login-style.css      # Style logowania
└── README.md               # Dokumentacja
```

## Kompatybilność

- **WordPress:** 5.0+
- **PHP:** 7.4+
- **WooCommerce:** 5.0+
- **Przetestowane do:** WordPress 6.8

## Bezpieczeństwo

- Zabezpieczenie przed bezpośrednim dostępem do plików
- Sanityzacja wszystkich danych wejściowych
- Używa WordPress hooks i API
- Zgodne z WordPress Coding Standards

## Zarządzanie

### Aktywacja
Po aktywacji wtyczka automatycznie:
- Tworzy domyślne ustawienia
- Rejestruje style CSS
- Dodaje panel ustawień

### Dezaktywacja
Wtyczka może być bezpiecznie dezaktywowana:
- Style przestaną być ładowane
- Ustawienia pozostaną w bazie danych
- Brak wpływu na funkcjonalność WordPress

### Usuwanie
Aby całkowicie usunąć wtyczkę:
1. Dezaktywuj wtyczkę
2. Usuń folder z `/wp-content/plugins/`
3. (Opcjonalnie) Usuń ustawienia: `DELETE FROM wp_options WHERE option_name = 'modeo_admin_styling_options';`

## Rozwój i modyfikacje

### Dodawanie własnych styli
Użyj pola "Niestandardowy CSS" w ustawieniach lub edytuj pliki CSS bezpośrednio.

### Modyfikacja kolorów
Zmień zmienne CSS w `:root` na początku plików CSS.

### Rozszerzenie funkcjonalności
Wtyczka używa WordPress hooks - możesz łatwo dodać własne funkcjonalności.

## Wsparcie

Wtyczka została stworzona specjalnie dla sklepu Modeo.pl i jest w pełni kompatybilna z architekturą headless (Next.js + WordPress).

## Changelog

### v1.0.0
- Pierwsza wersja
- Podstawowe stylowanie kokpitu i logowania
- Panel ustawień z niestandardowym CSS
- Obsługa WooCommerce
- Responsive design