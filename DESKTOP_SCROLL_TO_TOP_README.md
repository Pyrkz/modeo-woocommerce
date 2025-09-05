# 🖥️ Desktop Scroll to Top After Filters - Modeo Shop

## Co zostało dodane

Automatyczne scrollowanie do góry po zastosowaniu filtrów na desktop dla lepszego UX.

## 🎯 Problem

Po zastosowaniu filtrów na desktop użytkownik pozostawał w miejscu gdzie kliknął filtr, często nie widząc zaktualizowanych wyników produktów na górze strony.

## ✅ Rozwiązanie

Dodano automatyczne scrollowanie do góry strony po:
- **Zastosowaniu filtrów** (`updateFilters`)
- **Resetowaniu filtrów** (`resetFilters`)

## 🔧 Implementacja

### Lokalizacja
**Plik**: `frontend/src/features/shop/hooks/useShop.ts`

### Kod dodany do `updateFilters`:
```typescript
// Scroll to top on desktop after applying filters
if (typeof window !== 'undefined') {
  // Check if it's desktop (not mobile)
  const isDesktop = window.innerWidth >= 1024; // lg breakpoint
  if (isDesktop) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
```

### Kod dodany do `resetFilters`:
```typescript
// Scroll to top on desktop after resetting filters
if (typeof window !== 'undefined') {
  // Check if it's desktop (not mobile)
  const isDesktop = window.innerWidth >= 1024; // lg breakpoint
  if (isDesktop) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
```

## 📱 Responsive Behavior

### Desktop (≥1024px)
- ✅ **Scroll to top** - smooth animation do góry strony
- ✅ **Po każdej zmianie filtrów** - search, kategorie, kolory, cena, dostępność
- ✅ **Po reset filtrów** - "Wyczyść wszystko"

### Mobile (<1024px)  
- ❌ **Bez scroll** - na mobile użytkownik zostaje w miejscu
- 🎯 **Powód**: Na mobile filtrowanie odbywa się przez modal pełnoekranowy

## 🚀 UX Korzyści

### Przed zmianą:
1. Użytkownik scrolluje w dół do filtrów
2. Klika filtr (np. kategorię)  
3. Strona się aktualizuje ale user zostaje w tym samym miejscu
4. **Problem**: Nie widzi nowych wyników, musi ręcznie scrollować do góry

### Po zmianie:
1. Użytkownik scrolluje w dół do filtrów
2. Klika filtr (np. kategorię)
3. Strona się aktualizuje **+ automatyczny scroll do góry**
4. ✅ **Rozwiązanie**: Natychmiast widzi nowe wyniki produktów

## ⚡ Optymalizacje

### SSR Safety
```typescript
if (typeof window !== 'undefined') {
  // Kod tylko po załadowaniu w przeglądarce
}
```

### Responsive Detection
```typescript
const isDesktop = window.innerWidth >= 1024; // lg breakpoint
```
- Wykorzystuje Tailwind breakpoint `lg`
- Dokładnie odpowiada mobile/desktop logice aplikacji

### Smooth Animation
```typescript
window.scrollTo({
  top: 0,
  behavior: 'smooth'
});
```
- Płynna animacja scrollowania
- Lepsze UX niż nagłe przeskakiwanie

## 🧪 Testing

✅ **Build test**: `npm run build` - passed  
✅ **TypeScript**: No type errors  
✅ **SSR compatibility**: `typeof window` check  
✅ **Responsive**: Only desktop affected  

## 🔄 Kiedy się aktywuje

### Automatycznie przy:
1. **Zmiana wyszukiwania** - wpisanie w search box
2. **Wybór kategorii** - klik na kategorie w sidebar
3. **Wybór kolorów** - zaznaczenie kolorów  
4. **Zmiana zakresu cen** - przesunięcie slider'a ceny
5. **Toggle dostępności** - checkbox "Tylko dostępne"
6. **Reset filtrów** - przycisk "Wyczyść wszystko"

### NIE aktywuje się przy:
- ❌ **Load More** - ładowaniu kolejnych produktów (user scrolluje celowo w dół)
- ❌ **Infinite scroll** - automatyczne doładowywanie
- ❌ **Mobile filtering** - filtrowanie przez modal na mobile

## 💡 Future Enhancements

1. **Scroll to products section** - nie do samej góry, ale do sekcji z produktami
2. **Configurable scroll target** - możliwość ustawienia własnego targetu
3. **Animation timing** - konfigurowalny czas animacji
4. **Scroll offset** - uwzględnienie sticky header
5. **User preference** - możliwość wyłączenia przez użytkownika

## 🏗️ Architecture Compliance

- ✅ **TypeScript** - pełne typowanie
- ✅ **React hooks** - useCallback dla optymalizacji
- ✅ **SSR safe** - typeof window check
- ✅ **Responsive** - desktop only logic
- ✅ **Non-breaking** - nie wpływa na mobile UX