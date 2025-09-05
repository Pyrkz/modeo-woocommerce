# 🚀 Lenis Smooth Scroll Feature

A professional-grade smooth scroll implementation using Lenis, optimized for performance and UX in Next.js applications.

## ✨ Features

- **🎯 Performance Optimized**: Device-specific configurations for optimal performance
- **📱 Mobile Friendly**: Disabled smooth scroll on touch devices for better performance
- **⚡ GPU Accelerated**: Uses CSS transforms and will-change properties
- **🎨 Customizable**: Configurable easing, duration, and behavior
- **♿ Accessible**: Respects `prefers-reduced-motion` settings
- **🔧 TypeScript**: Fully typed for better developer experience

## 📁 Structure

```
features/smooth-scroll/
├── components/
│   ├── SmoothScrollProvider.tsx  # Context provider
│   ├── ScrollToTop.tsx          # Scroll to top button with progress
│   ├── SmoothScrollAnchor.tsx   # Enhanced anchor links
│   └── index.ts                 # Component exports
├── hooks/
│   └── useLenis.ts             # Core Lenis hook
├── types/
│   └── index.ts                # TypeScript definitions
├── utils/
│   └── lenisConfig.ts          # Configuration presets
├── examples/
│   └── usage-examples.tsx      # Implementation examples
└── README.md                   # This file
```

## 🚀 Quick Start

### 1. Basic Setup (Already Done)

The smooth scroll is already integrated into your layout at `features/layout/components/LayoutContent.tsx`:

```tsx
<SmoothScrollProvider>
  <CartProvider>
    {/* Your app content */}
    <ScrollToTop /> {/* Automatic scroll-to-top button */}
  </CartProvider>
</SmoothScrollProvider>
```

### 2. Using Smooth Scroll Anchors

```tsx
import { SmoothScrollAnchor } from '@/features/smooth-scroll';

<SmoothScrollAnchor 
  href="#section-id" 
  className="nav-link"
  offset={-120} // Account for sticky header
>
  Go to Section
</SmoothScrollAnchor>
```

### 3. Programmatic Scrolling

```tsx
import { useSmoothScroll } from '@/features/smooth-scroll';

const MyComponent = () => {
  const { scrollTo, scrollToTop } = useSmoothScroll();

  const handleClick = () => {
    scrollTo('#target-section', {
      offset: -100,
      duration: 1500
    });
  };

  return <button onClick={handleClick}>Scroll to Section</button>;
};
```

## ⚙️ Configuration

### Device-Optimized Presets

The library automatically selects the best configuration based on device:

- **Desktop**: Full smooth scroll with 1.2s duration
- **Mobile**: Disabled for better performance (native scroll)
- **Slow Devices**: Reduced effects for better performance

### Custom Configuration

```tsx
<SmoothScrollProvider options={{
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothTouch: false, // Better mobile performance
}}>
  {/* Your app */}
</SmoothScrollProvider>
```

## 🎨 Components

### ScrollToTop

Floating button with scroll progress indicator:

```tsx
<ScrollToTop 
  threshold={400}        // Show after 400px scroll
  showOnMobile={true}    // Show on mobile devices
  className="custom-styles"
/>
```

### SmoothScrollAnchor

Enhanced anchor links with smooth scroll:

```tsx
<SmoothScrollAnchor 
  href="#contact"
  offset={-100}          // Offset for sticky headers
  duration={2000}        // Custom duration
>
  Contact Us
</SmoothScrollAnchor>
```

## 🚀 Performance Features

### 1. GPU Acceleration
```css
.scroll-enhanced {
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### 2. Device Detection
- Automatically disables on mobile for better performance
- Detects slow devices and reduces effects
- Respects user motion preferences

### 3. Memory Management
- Proper cleanup on component unmount
- Efficient event listeners
- Optimized animation frames

## ♿ Accessibility

### Reduced Motion Support
Automatically respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }
}
```

### Keyboard Navigation
- Maintains native keyboard scroll behavior
- Works with screen readers
- Proper ARIA labels on buttons

## 📊 Performance Metrics

Expected improvements:
- **Scroll Smoothness**: 60fps smooth scrolling
- **Bundle Size**: +8KB gzipped (Lenis library)
- **Performance Impact**: Minimal on modern devices
- **Mobile Performance**: No impact (disabled by default)

## 🔧 Advanced Usage

### Scroll Progress Tracking

```tsx
const { scrollProgress, velocity, isScrolling } = useSmoothScroll();

// Use for progress bars, animations, etc.
<div style={{ width: `${scrollProgress * 100}%` }} />
```

### Custom Scroll Animations

```tsx
const ScrollReveal = ({ children }) => {
  const { scrollProgress } = useSmoothScroll();
  const opacity = Math.min(1, scrollProgress * 2);
  
  return (
    <div style={{ opacity, transform: `translateY(${(1-opacity) * 50}px)` }}>
      {children}
    </div>
  );
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Scroll not smooth on mobile**
   - Expected behavior for performance
   - Can be enabled with `smoothTouch: true`

2. **Performance issues**
   - Check device capabilities
   - Use performance preset: `performanceLenisConfig`

3. **Conflicts with other scroll libraries**
   - Ensure only one scroll library is active
   - Check CSS `scroll-behavior` conflicts

### Debug Mode

Enable debug mode to see Lenis events:

```tsx
const lenis = useLenis({ debug: true });
```

## 🔄 Future Enhancements

Potential improvements:
- Intersection Observer for scroll animations
- Momentum-based easing presets
- Advanced mobile scroll customization
- Integration with loading states

## 📚 Examples

Check `examples/usage-examples.tsx` for complete implementation examples including:
- Navigation menus
- Scroll progress indicators
- Reveal animations
- Footer scroll-to-top buttons

---

## 🎉 Ready to Use!

The smooth scroll feature is now active on your site. Visit any page and enjoy the enhanced scrolling experience!