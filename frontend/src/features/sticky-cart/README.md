# Sticky Cart Feature

Zoptymalizowane komponenty sticky add-to-cart button dla stron produktów e-commerce. Zaprojektowane z myślą o wydajności, UX i responsywności.

## 🚀 Funkcjonalności

### ✅ Główne komponenty
- **StickyAddToCartButton** - dla produktów prostych (simple products)
- **StickyVariableProductButton** - dla produktów zmiennych (variable products)
- **AnimatedStickyContainer** - kontener z 6 typami animacji
- **AnimatedButton** - buttony z micro-animacjami i ripple effects
- **useStickyCartPerformance** - zoptymalizowany hook zarządzania wydajnością
- **useScrollVisibility** - podstawowy hook wykrywania scroll'a

### 🎬 Typy animacji
- **slide** - klasyczne wysuwanie z dołu
- **bounce** - odbijający się efekt wejścia
- **fade-scale** - fade z skalowaniem
- **flip** - 3D flip effect
- **elastic** - elastyczne odbicie
- **glow** - świecący efekt wejścia z niebieskim glow

### ✅ Optymalizacje wydajności
- **RAF scheduling** - 60fps smooth animations
- **Debounced scroll events** - minimalne obciążenie CPU
- **Passive event listeners** - zero blocking
- **Smart thresholds** - inteligentne wyświetlanie/ukrywanie
- **Lazy calculations** - obliczenia tylko gdy potrzebne
- **Auto-hide** - automatyczne ukrywanie po bezczynności

### ✅ UX Improvements
- **Smooth transitions** - płynne animacje pokazywania/ukrywania
- **Mobile-first** - responsywne na wszystkich urządzeniach
- **Accessibility** - pełne wsparcie a11y z ARIA labels
- **Safe area support** - uwzględnia notche i bezpieczne obszary
- **Footer overlap prevention** - nie nakłada się na stopkę
- **Smart scroll detection** - pokazuje/ukrywa na podstawie kierunku scrollowania
- **Ripple effects** - Material Design-style ripple na touch
- **Micro-animations** - button press animations i hover effects
- **Loading states** - spinner animations podczas dodawania do koszyka

## 📁 Struktura plików

```
features/sticky-cart/
├── components/
│   ├── StickyAddToCartButton.tsx      # Simple products button
│   ├── StickyVariableProductButton.tsx # Variable products button  
│   └── index.ts                       # Component exports
├── hooks/
│   ├── useStickyCartPerformance.ts    # Main performance hook
│   ├── useScrollVisibility.ts         # Basic scroll hook
│   └── index.ts                       # Hook exports
├── index.ts                           # Main exports
└── README.md                          # Documentation
```

## 🔧 Użycie

### Simple Products
```tsx
import { StickyAddToCartButton } from '@/features/sticky-cart';

<StickyAddToCartButton
  product={product}
  onAddToCart={() => addToCart()}
  isLoading={addingToCart}
  isDisabled={addingToCart}
/>
```

### Variable Products
```tsx
import { StickyVariableProductButton } from '@/features/sticky-cart';

<StickyVariableProductButton
  product={product}
  selectedVariationId={selectedVariationId}
  onScrollToVariantSelector={() => {
    const selector = document.getElementById('variant-selector');
    selector?.scrollIntoView({ behavior: 'smooth' });
  }}
/>
```

### Custom Hook Usage
```tsx
import { useStickyCartPerformance } from '@/features/sticky-cart';

const { isVisible, shouldAnimate, scrollPercentage, isNearBottom } = useStickyCartPerformance({
  showThreshold: 300,
  hideThreshold: 150,
  debounceDelay: 8,
  autoHideDelay: 2000
});
```

## ⚙️ Konfiguracja

### Performance Hook Options
```tsx
interface UseStickyCartPerformanceOptions {
  showThreshold?: number;      // default: 300px - próg pokazania
  hideThreshold?: number;      // default: 150px - próg ukrycia przy dole
  debounceDelay?: number;      // default: 8ms - opóźnienie debounce
  throttleDelay?: number;      // default: 16ms - throttling RAF
  autoHideDelay?: number;      // default: 3000ms - auto-ukrywanie
}
```

### Component Props
```tsx
// StickyAddToCartButton
interface StickyAddToCartButtonProps {
  product: Product;
  onAddToCart: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}

// StickyVariableProductButton  
interface StickyVariableProductButtonProps {
  product: Product;
  selectedVariationId: number | null;
  onScrollToVariantSelector: () => void;
  className?: string;
}
```

## 📊 Optymalizacje wydajności

### Scroll Performance
- **8ms debounce** - minimalne opóźnienie dla responsywności
- **16ms RAF throttling** - zapewnia 60fps
- **Passive listeners** - zero scroll blocking
- **Smart calculations** - tylko gdy widoczny

### Memory Management
- **useRef** dla wartości nie powodujących re-render
- **useCallback** dla stabilnych referencji funkcji
- **Cleanup** - proper unmounting i cleanup
- **RAF cancellation** - anuluje niepotrzebne animacje

### CSS Performance
- **transform** zamiast position changes
- **opacity** transitions
- **will-change** hints dla GPU acceleration
- **backdrop-blur** dla premium feel
- **safe-area-inset** support

## 🎨 Dostępność (A11y)

### ARIA Support
- `role="toolbar"` - semantic meaning
- `aria-label` - screen reader descriptions
- `aria-describedby` - context information
- Focus management - keyboard navigation

### Mobile Support
- Touch-friendly tap targets (44px minimum)
- Safe area insets dla iPhone X+
- Responsive text sizing
- High contrast support

## 🚀 Integracja z produktem

### Product Page Integration
Automatycznie zintegrowane w `frontend/src/app/sklep/[slug]/page.tsx`:

```tsx
{enrichedProduct.type === 'variable' ? (
  <StickyVariableProductButton
    product={enrichedProduct}
    selectedVariationId={selectedVariationId}
    onScrollToVariantSelector={() => {
      const variantSelector = document.getElementById('variant-selector');
      if (variantSelector) {
        variantSelector.scrollIntoView({ behavior: 'smooth', block: 'start' });
        variantSelector.focus({ preventScroll: true });
      }
    }}
  />
) : (
  <StickyAddToCartButton
    product={enrichedProduct}
    onAddToCart={() => addToCart()}
    isLoading={addingToCart}
    isDisabled={addingToCart}
  />
)}
```

### CSS Classes
- `pb-safe-area-inset-bottom` - padding bottom dla safe areas
- `fixed bottom-0` - sticky positioning
- `z-50` - above content z-index
- `backdrop-blur-sm` - premium glass effect

## 🔍 Testowanie

### Performance Testing
```bash
# Test scroll performance
npm run dev
# Navigate to /sklep/[any-product]
# Open Chrome DevTools > Performance
# Record while scrolling to test 60fps
```

### Accessibility Testing
```bash
# Test with screen readers
# axe-core integration test
# Keyboard navigation test
# Color contrast test
```

## 🎯 Metryki wydajności

### Target Performance
- **60fps** smooth scrolling
- **<16ms** per frame processing
- **<100ms** touch response
- **<8ms** scroll event handling
- **0 layout shifts** during animations

### WooCommerce Compatibility
- ✅ Simple products
- ✅ Variable products  
- ✅ Sale prices display
- ✅ Currency formatting
- ✅ Image thumbnails
- ✅ Stock status (if needed)

## 🚨 Znane ograniczenia

- Nie wyświetla się dla produktów out-of-stock (można rozszerzyć)
- Variable products wymagają konfiguracji variant selector ID
- iOS Safari wymaga -webkit-backdrop-filter fallback
- Starsze przeglądarki mogą nie obsługiwać smooth scroll

## 🔮 Przyszłe rozszerzenia

- [ ] Quantity selector w sticky button
- [ ] Mini cart preview on hover
- [ ] Animation variations (slide, fade, bounce)
- [ ] Cross-sell suggestions
- [ ] Price change animations
- [ ] Stock level indicators