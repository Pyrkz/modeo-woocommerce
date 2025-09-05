# Smart Gifts System - Inteligentny System Prezentów

System automatycznego filtrowania i kategoryzacji prezentów, który rozwiązuje problem nakładających się kategorii (np. zwierzaki na Dzień Matki/Taty).

## 🎯 Problem Solution

**Problem**: Produkty ze "zwierzakami" pojawiały się w sekcjach dedykowanych Dniu Matki i Dniu Taty, co było nielogiczne.

**Rozwiązanie**: Inteligentny system kategorii z automatycznymi wykluczeniami i filtrami kontekstowymi.

## 📦 Struktura Komponentów

### Core Components
- `PersonalizedGiftsSection` - Oryginalny komponent (zachowany dla kompatybilności)
- `SmartGiftsSection` - Nowy inteligentny komponent z filtrowaniem
- `useCategoryFilter` - Hook do filtrowania według kategorii
- `useCategoryContext` - Hook do automatycznej detekcji kontekstu

### Typy i Konfiguracja
- `GiftCategory` - Definicja kategorii z priorytetami i wykluczeniami
- `CategoryFilter` - Interfejs filtrów
- `GIFT_CATEGORIES` - Główna konfiguracja kategorii

## 🚀 Przykłady Użycia

### 1. Strona Dzień Matki (automatyczne wykluczenie zwierzaków)
```tsx
import { SmartGiftsSection } from '@/features/gifts/components';

export default function DzienMatkiPage() {
  return (
    <SmartGiftsSection
      title="Prezenty na Dzień Matki"
      subtitle="Wyjątkowe prezenty dla najważniejszej kobiety w Twoim życiu"
      badgeText="Dzień Matki"
      gifts={allGifts}
      categoryId="dzien-matki" // Automatycznie wyklucza 'zwierzaki'
      categoryFilter={{
        targetAudience: 'women',
        seasonality: 'seasonal'
      }}
      maxItems={8}
    />
  );
}
```

### 2. Automatyczna detekcja kontekstu z URL
```tsx
import { useCategoryContext } from '@/features/gifts/hooks/useCategoryContext';

export default function DynamicGiftsPage() {
  const { categoryId, getPageTitle, getContextualSubtitle } = useCategoryContext();
  
  return (
    <SmartGiftsSection
      title={getPageTitle("Spersonalizowane Prezenty")}
      subtitle={getContextualSubtitle("Odkryj nasze wyjątkowe prezenty")}
      badgeText="Prezenty"
      gifts={allGifts}
      categoryId={categoryId} // Auto-detekcja z URL
    />
  );
}
```

## 🔄 Logika Filtrowania

1. **Wykluczenia kategorii**: Jeśli kategoria ma `excludeFrom`, produkty z wykluczonych tagów są usuwane
2. **Filtry pozytywne**: `includeCategories` - tylko wybrane kategorie
3. **Filtry negatywne**: `excludeCategories` - wykluczenie konkretnych kategorii
4. **Filtry demograficzne**: `targetAudience` - filtrowanie według płci/wieku
5. **Filtry sezonowe**: `seasonality` - całoroczne vs sezonowe

## 🚀 Zalety Rozwiązania

✅ **Automatyczne wykluczenia** - zwierzaki nie pojawiają się na Dzień Matki/Taty
✅ **Inteligentna kategoryzacja** - produkty pasują do kontekstu strony
✅ **Zachowana kompatybilność** - stare komponenty nadal działają
✅ **Elastyczność** - łatwe dodawanie nowych kategorii i reguł
✅ **Automatyczna detekcja** - rozpoznaje kontekst z URL
✅ **Przejrzystość** - użytkownik wie co i dlaczego widzi