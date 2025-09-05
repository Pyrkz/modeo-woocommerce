# Christmas Gifts Feature

A high-performance, responsive Christmas gifts product grid for the Modeo e-commerce platform.

## 🎄 Features

- **Responsive Grid**: 4 columns on desktop, 3 on tablet, 2 on mobile
- **Performance Optimized**: Lazy loading, image optimization, skeleton states
- **Smart API Integration**: Automatic category detection and fallback strategies
- **Empty State Handling**: Beautiful empty state with call-to-action
- **Loading States**: Smooth skeleton loaders and progressive enhancement
- **Cart Integration**: One-click add to cart functionality
- **SEO Optimized**: Proper meta tags, structured data ready

## 🚀 Usage

### Basic Implementation

```tsx
import { ChristmasGiftsPage } from '@/features/christmas-gifts';

export default function ChristmasPage() {
  return <ChristmasGiftsPage />;
}
```

### Custom Grid Usage

```tsx
import { ChristmasGiftsGrid, useChristmasGifts } from '@/features/christmas-gifts';

export default function CustomChristmasGrid() {
  const { gifts, loading, error, retry } = useChristmasGifts({
    filters: {
      featured: true,
      priceRange: { max: 100 }
    },
    initialPerPage: 12
  });

  return (
    <ChristmasGiftsGrid
      gifts={gifts}
      loading={loading}
      error={error}
      onRetry={retry}
      onAddToCart={(giftId) => console.log('Add to cart:', giftId)}
    />
  );
}
```

## 📁 Architecture

```
christmas-gifts/
├── api/
│   ├── christmas.api.ts      # API layer with smart category detection
│   └── index.ts
├── components/
│   ├── ChristmasGiftsPage.tsx    # Main page component
│   ├── ChristmasGiftsGrid.tsx    # Responsive product grid
│   ├── ChristmasGiftCard.tsx     # Individual product card
│   ├── ChristmasEmptyState.tsx   # Empty state component
│   └── index.ts
├── hooks/
│   ├── useChristmasGifts.ts      # Main data fetching hook
│   └── index.ts
├── types/
│   └── index.ts              # TypeScript definitions
├── utils/
│   ├── performance.ts        # Performance optimization utilities
│   └── index.ts
└── index.ts                  # Main exports
```

## 🔧 API Integration

The Christmas API automatically:

1. **Searches for Christmas categories** by slug and name
2. **Falls back to keyword search** if no category found
3. **Provides featured products** as final fallback
4. **Handles errors gracefully** with user-friendly messages

### Supported Search Terms

- 'święta', 'christmas', 'boże narodzenie'
- 'świąteczny', 'mikołaj', 'choinka'

## 🎨 Styling

Components use Tailwind CSS with:

- **Christmas theme colors**: Red-600, Green-50, etc.
- **Responsive design**: Mobile-first approach
- **Smooth animations**: Hover effects, loading states
- **Accessibility**: ARIA labels, keyboard navigation

## ⚡ Performance Features

- **Image Optimization**: Next.js Image with proper sizes
- **Lazy Loading**: Below-fold content loads on scroll
- **Priority Loading**: First 4 images load eagerly
- **Skeleton States**: Instant perceived performance
- **Error Boundaries**: Graceful error handling
- **Memory Management**: Proper cleanup and memoization

## 🧪 Testing Scenarios

1. **With Christmas products**: Shows proper grid
2. **Empty category**: Shows attractive empty state
3. **API errors**: Shows error message with retry
4. **Loading states**: Skeleton animations
5. **Mobile responsiveness**: 2-column grid
6. **Tablet responsiveness**: 3-column grid
7. **Desktop responsiveness**: 4-column grid

## 🔄 Future Enhancements

- [ ] Product filtering by price/attributes
- [ ] Sort options (price, popularity, etc.)
- [ ] Infinite scroll implementation
- [ ] Advanced search within Christmas products
- [ ] Wishlist integration
- [ ] Product comparison
- [ ] Quick preview modal

## 🐛 Common Issues

### Products not loading
- Check WordPress WooCommerce API is running
- Verify CORS plugin is active
- Check network connectivity

### Empty state showing incorrectly  
- Ensure category exists in WooCommerce
- Check product visibility settings
- Verify featured products exist

### Images not loading
- Check WordPress media URLs
- Verify image permissions
- Check CDN configuration

## 📱 Mobile Optimization

- Touch-friendly buttons (min 44px)
- Optimized images for mobile screens  
- Reduced animations on low-power devices
- Simplified navigation for small screens