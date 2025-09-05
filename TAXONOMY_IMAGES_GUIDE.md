# 🎨 Przewodnik: Obrazki taksonomii dla atrybutów produktów

Ten przewodnik opisuje, jak dodawać obrazki do atrybutów WooCommerce (wzory, tekstury, materiały), które będą wyświetlane w sklepie Next.js.

## ✅ Co zostało zaimplementowane

### 1. **Inteligentne wykrywanie typów atrybutów**
- **Kolory** → kółka kolorów (bez zmian)
- **Rozmiary/pojemności** → przyciski tekstowe (5L, 10L, itd.)
- **Wzory/tekstury** → **siatka obrazków** (NOWE!)
- **Inne** → standardowe przyciski tekstowe

### 2. **System obsługi obrazków**
- Plugin WordPress z interfejsem administracyjnym
- API endpoint `/wp-json/modeo/v1/attribute-swatches`
- Automatyczne wykrywanie i wyświetlanie obrazków

### 3. **Responsywny design**
- Siatka obrazków dostosowuje się do rozmiaru ekranu
- Podgląd z hover effect i etykietami
- Wskaźnik wyboru z animacjami

## 🔧 Jak dodać obrazki do taksonomii

### Krok 1: Aktywacja pluginu
1. Plugin `taxonomy-swatches-api.php` został już dodany do `/wp-content/plugins/`
2. Upewnij się, że jest aktywny w panelu administratora

### Krok 2: Dodawanie obrazków do atrybutów

#### Tworzenie taksonomii wzorów:
1. Idź do **Produkty → Atrybuty**
2. Utwórz nowy atrybut np. "Wzór" z slug `pa_wzor`
3. Idź do **Produkty → Atrybuty → Wzór**

#### Dodawanie terminów z obrazkami:
1. **Dodaj nowy term** (np. "Kratka")
2. W formularzu zobaczysz nowe pola:
   - **Typ Swatch**: Wybierz "Obrazek"
   - **Obrazek**: Kliknij "Wybierz obrazek" i wybierz z biblioteki mediów
   - **Wartość Swatch**: Automatycznie wypełni się URL obrazka

### Krok 3: Przypisywanie do produktów
1. Edytuj produkt wariantowy
2. W sekcji **Atrybuty** dodaj "Wzór"
3. Zaznacz "Używane dla wariantów"
4. W **Wariantach** wybierz odpowiednie wzory dla każdego wariantu

## 📋 Wspierane taksonomie

Plugin automatycznie obsługuje:
- `pa_wzor` / `pa_pattern` - wzory
- `pa_tekstura` / `pa_texture` - tekstury  
- `pa_material` - materiały
- `pa_kolor` / `pa_color` - kolory

## 🎯 Przykłady użycia

### Worki z różnymi wzorami:
```
Taksonomia: pa_wzor
- Kratka (obrazek: kratka.jpg)
- Paski (obrazek: paski.jpg)  
- Groszki (obrazek: groszki.jpg)
```

### Materiały z teksturami:
```
Taksonomia: pa_tekstura
- Gładka (obrazek: gladka-tekstura.jpg)
- Strukturalna (obrazek: struktura.jpg)
- Filcowa (obrazek: filc.jpg)
```

## 🔍 Testowanie

### Sprawdź API:
```bash
curl http://localhost:8080/wp-json/modeo/v1/attribute-swatches
```

### W Next.js:
1. Idź na stronę produktu z wariantami
2. Sprawdź devtools - powinny być logi `🎨 ENRICHED ATTRIBUTES`
3. Atrybuty z obrazkami powinny wyświetlać się jako siatka

## 🐛 Rozwiązywanie problemów

### Obrazki się nie ładują:
1. Sprawdź czy plugin jest aktywny
2. Upewnij się, że obrazki są w bibliotece mediów
3. Sprawdź API endpoint w przeglądarce

### Atrybuty wyświetlają się jako tekst zamiast obrazków:
1. Sprawdź czy `swatch_type = "image"` w bazie danych
2. Upewnij się, że taksonomia ma poprawny slug (pa_wzor, pa_texture, etc.)
3. Sprawdź logs w devtools przeglądarki

### Obrazki są za duże/małe:
1. Wordpress automatycznie tworzy miniatury
2. Komponen używa thumbnail (80x80px) dla siatki
3. Jeśli potrzebujesz inny rozmiar, można dostosować w `ImageSelector.tsx`

## 📚 Struktura techniczna

### Frontend (Next.js):
- `AttributeSelector.tsx` - główny komponent z wykrywaniem typu
- `ImageSelector.tsx` - specializowany komponent dla obrazków  
- `useEnrichedAttributes.ts` - hook pobierający dane z WP

### Backend (WordPress):
- `taxonomy-swatches-api.php` - plugin z API i interfejsem admin
- Meta fields: `swatch_type`, `swatch_value`, `image_id`
- REST endpoint: `/wp-json/modeo/v1/attribute-swatches`

## 🚀 Następne kroki

1. **Dodaj więcej wzorów** do swoich produktów
2. **Przetestuj** na różnych rozmiarach ekranu  
3. **Dostosuj style** w `ImageSelector.tsx` jeśli potrzeba
4. **Rozważna caching** dla większej wydajności

---

**Gotowe!** 🎉 Teraz Twoi klienci będą widzieli rzeczywiste wzory i tekstury zamiast nazw tekstowych!