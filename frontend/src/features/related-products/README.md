# Related Products Feature

Inteligentny system podobnych produktów zoptymalizowany pod kątem wydajności i UX. Wykorzystuje istniejący FeaturedProductsSection z custom logiką wyszukiwania produktów.

## 🚀 Funkcjonalności

### ✅ Smart Product Matching
- **Category-based matching** - produkty z tych samych kategorii
- **Tag-based matching** - produkty z podobnymi tagami  
- **Fallback strategy** - popularne produkty z kategorii jako backup
- **Smart deduplication** - eliminuje duplikaty i aktualny produkt
- **Dynamic limit** - konfigurowalny limit produktów (default: 8)

### ⚡ Performance Optimizations
- **Intelligent caching** - in-memory + sessionStorage cache
- **5-minute TTL** - automatyczne odświeżanie cache
- **Cache hit counting** - statystyki użycia
- **Batch invalidation** - smart cache invalidation
- **Memory management** - automatic cleanup expired items
- **Prefetching support** - background loading for better UX

### 🎯 API Strategy
- **WooCommerce Store API** integration
- **Category filtering** - `?category=1,2,3`
- **Tag filtering** - `?tag=1,2,3`  
- **Exclude current** - `?exclude=123`
- **Popularity sorting** - `?orderby=popularity&order=desc`
- **Optimized queries** - minimal API calls with smart batching

## 📁 Struktura plików

```
features/related-products/
├── api/
│   ├── related-products.api.ts       # API logic & WooCommerce integration
│   └── index.ts                      # API exports
├── components/
│   ├── RelatedProductsSection.tsx    # Main component reusing FeaturedProductsSection
│   └── index.ts                      # Component exports  
├── hooks/
│   ├── useRelatedProducts.ts         # Main hook with caching & performance
│   └── index.ts                      # Hook exports
├── utils/
│   ├── performance-cache.ts          # Advanced caching system
│   └── index.ts                      # Utils exports
├── index.ts                          # Main feature exports
└── README.md                         # Documentation
```

## 🔧 Użycie

### Basic Usage
```tsx
import { RelatedProductsSection } from '@/features/related-products';

<RelatedProductsSection
  currentProduct={product}
  onAddToCart={handleAddToCart}
  limit={8}
  className="mt-16"
/>
```

### Hook Usage
```tsx
import { useRelatedProducts } from '@/features/related-products';

const { products, loading, error, refetch } = useRelatedProducts({
  currentProduct: product,
  limit: 8,
  enabled: true
});
```

### API Direct Usage
```tsx
import { RelatedProductsApi } from '@/features/related-products';

// Get smart related products
const related = await RelatedProductsApi.getSmartRelatedProducts(product, { limit: 8 });

// Get by categories
const byCategory = await RelatedProductsApi.getProductsByCategories([1, 2], { 
  exclude: [123], 
  limit: 8 
});
```

## 🎨 Component Integration

### Reuses FeaturedProductsSection
- **Same slider functionality** - smooth scrolling, responsive
- **Same design** - consistent with homepage featured products  
- **Custom content** - dynamic titles based on current product
- **Background color** - white instead of gray-50 to differentiate

### Dynamic Content Generation
```tsx
const sectionContent = {
  title: 'Podobne produkty',
  subtitle: `Sprawdź inne produkty z kategorii "${primaryCategory}"`,
  badgeText: 'Polecane'
};
```

## ⚙️ Konfiguracja

### Cache Settings
```tsx
const CACHE_CONFIG = {
  TTL: 5 * 60 * 1000,           // 5 minutes
  MAX_ITEMS: 50,                // Max cache items
  ENABLE_STORAGE: true,         // Use sessionStorage
  CLEANUP_INTERVAL: 10 * 60 * 1000  // 10 minutes
};
```

### API Settings
```tsx
const API_CONFIG = {
  DEFAULT_LIMIT: 8,             // Default products per request
  POPULAR_FALLBACK: true,       // Use popular products as fallback
  EXCLUDE_CURRENT: true,        // Always exclude current product
  SORT_BY_POPULARITY: true      // Sort by popularity
};
```

## 📊 Performance Metrics

### Target Performance
- **Cache hit rate**: >80% for repeat visits
- **API calls**: <3 per product page load
- **Load time**: <200ms with cache, <800ms without
- **Memory usage**: <5MB cache storage
- **Browser support**: All modern browsers + graceful degradation

### Cache Statistics
```tsx
import { relatedProductsCache } from '@/features/related-products';

const stats = relatedProductsCache.getStats();
console.log(stats); // { memoryItems: 15, totalHits: 47 }
```

## 🔄 Matching Algorithm

### Priority Order
1. **Same categories** - products from identical categories
2. **Same tags** - products with matching tags
3. **Popular from category** - best-selling in primary category
4. **Fallback to general** - if insufficient matches

### Smart Deduplication
- Remove current product from results
- Remove already matched products between strategies
- Limit final results to requested count
- Maintain order preference (category > tags > popular)

## 🌐 WooCommerce Integration

### Supported Product Types
- ✅ Simple products
- ✅ Variable products  
- ✅ Grouped products
- ✅ External products
- ❌ Subscription products (not tested)

### Category & Tag Support
- **Categories**: WooCommerce product categories
- **Tags**: WooCommerce product tags
- **Attributes**: Not used for matching (performance)
- **Custom taxonomies**: Could be extended

## 🚀 Deployment

### Integration on Product Page
Automatycznie zintegrowane w `frontend/src/app/sklep/[slug]/page.tsx`:

```tsx
{/* Related Products Section */}
<RelatedProductsSection
  currentProduct={enrichedProduct}
  onAddToCart={addToCart}
  className="mt-16"
/>
```

### Performance Monitoring
```tsx
// Enable cache statistics in development
if (process.env.NODE_ENV === 'development') {
  setInterval(() => {
    console.log('Related Products Cache Stats:', relatedProductsCache.getStats());
  }, 30000); // Every 30 seconds
}
```

## 🔮 Future Enhancements

- [ ] **Machine Learning**: Product similarity based on user behavior
- [ ] **A/B Testing**: Different matching algorithms
- [ ] **Cross-sells**: "Frequently bought together" logic
- [ ] **Recently Viewed**: Integration with browsing history
- [ ] **Price Range Matching**: Similar price point products
- [ ] **Brand Matching**: Products from same brand/manufacturer
- [ ] **Inventory Awareness**: Hide out-of-stock products
- [ ] **Personalization**: User preference based matching

## 🎯 Integration Benefits

### For Homepage (FeaturedProductsSection)
- **No changes needed** - continues working exactly as before
- **Same performance** - uses existing `useFeaturedProducts` hook
- **Same design** - gray background with featured products
- **Same functionality** - all slider features intact

### For Product Pages (RelatedProductsSection)  
- **Smart matching** - relevant products based on categories/tags
- **Performance optimized** - intelligent caching system
- **Design consistency** - reuses existing slider components
- **User engagement** - encourages browsing similar products