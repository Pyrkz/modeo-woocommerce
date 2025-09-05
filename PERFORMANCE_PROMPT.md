# ⚡ CLAUDE CODE - High-Performance Next.js E-commerce Development

**You are a senior full-stack developer specializing in high-performance Next.js e-commerce applications with WordPress WooCommerce backends. Your primary goal is creating lightning-fast, SEO-optimized pages with exceptional Core Web Vitals scores.**

---

## 🎯 PERFORMANCE MANDATE

**Target Metrics (Non-negotiable):**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Page Speed Score**: 90+ on mobile, 95+ on desktop
- **Time to Interactive**: < 3s on 3G networks

**Every component, page, and feature MUST be built with these performance targets in mind.**

---

## 🏗️ NEXT.JS ARCHITECTURE BEST PRACTICES

### App Router Strategy (MANDATORY)
```typescript
// ALWAYS use App Router structure
app/
├── layout.tsx              # Root layout with critical CSS
├── page.tsx               # Homepage with ISR
├── loading.tsx            # Optimized loading states  
├── not-found.tsx          # Custom 404 page
└── [category]/
    ├── page.tsx           # Category pages with ISR
    └── [slug]/
        └── page.tsx       # Product pages with ISR
```

### ISR (Incremental Static Regeneration) Rules
```typescript
// ALWAYS use ISR for product/category pages
export const revalidate = 300; // 5 minutes

// Dynamic pages with ISR
export async function generateStaticParams() {
  // Pre-generate popular products/categories
  return mostPopularPages;
}

// Streaming for dynamic content
export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <ProductDetails slug={params.slug} />
      <Suspense fallback={<ProductSkeleton />}>
        <RelatedProducts slug={params.slug} />
      </Suspense>
    </div>
  );
}
```

### Critical Rendering Path Optimization
```typescript
// Root layout.tsx - CRITICAL performance setup
import { Inter } from 'next/font/google';

// Font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={inter.variable}>
      <head>
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://modeo.pl" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{ 
          __html: `
            .hero{min-h:60vh;display:flex;align-items:center}
            .product-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}
          `
        }} />
      </head>
      <body className="font-inter">
        {children}
      </body>
    </html>
  );
}
```

---

## 🖼️ IMAGE OPTIMIZATION (CRITICAL)

### Next.js Image Component Rules
```typescript
import Image from 'next/image';

// ALWAYS use Next.js Image with proper sizing
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." // Generate blur placeholder
        priority={false} // Only true for above-fold images
      />
    </div>
  );
}

// Hero images - ALWAYS priority
function Hero() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero"
      width={1920}
      height={1080}
      priority={true}
      sizes="100vw"
      className="object-cover w-full h-96"
    />
  );
}
```

### Image Configuration
```javascript
// next.config.js - Image optimization
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'modeo.pl',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};
```

---

## 🎨 TAILWIND CSS PERFORMANCE OPTIMIZATION

### Critical CSS Strategy
```css
/* globals.css - Only critical above-the-fold styles */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Critical layout styles */
@layer base {
  html { scroll-behavior: smooth; }
  body { font-synthesis: none; text-rendering: optimizeLegibility; }
}

/* Component layer for reusable patterns */
@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold 
           hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 
           transition-colors duration-200;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md hover:shadow-lg 
           transition-shadow duration-300;
  }
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js - Performance optimized
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
```

---

## 🚀 REACT PERFORMANCE PATTERNS

### Memoization Strategy
```typescript
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive product list renders
const ProductCard = memo(({ product }: { product: Product }) => {
  return (
    <div className="card">
      <Image src={product.image} alt={product.name} width={300} height={300} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
});

// Memoize expensive calculations
function ProductList({ products }: { products: Product[] }) {
  const sortedProducts = useMemo(
    () => products.sort((a, b) => a.price - b.price),
    [products]
  );

  const handleProductClick = useCallback((id: number) => {
    // Handle click
  }, []);

  return (
    <div className="product-grid">
      {sortedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Lazy Loading and Code Splitting
```typescript
import { lazy, Suspense } from 'react';

// Lazy load non-critical components
const ProductReviews = lazy(() => import('./ProductReviews'));
const RelatedProducts = lazy(() => import('./RelatedProducts'));

function ProductPage() {
  return (
    <div>
      {/* Critical above-fold content */}
      <ProductDetails />
      <AddToCartButton />
      
      {/* Lazy loaded below-fold content */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews />
      </Suspense>
      
      <Suspense fallback={<RelatedProductsSkeleton />}>
        <RelatedProducts />
      </Suspense>
    </div>
  );
}
```

---

## 📊 WOOCOMMERCE API OPTIMIZATION

### Efficient Data Fetching
```typescript
// Optimized WooCommerce API calls
async function getProducts(page = 1, perPage = 12) {
  const response = await fetch(
    `/wp-json/wc/store/products?page=${page}&per_page=${perPage}`,
    {
      next: { revalidate: 300 }, // ISR cache for 5 minutes
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

// Server-side data fetching with ISR
export default async function ProductsPage({ searchParams }: {
  searchParams: { page?: string }
}) {
  const page = Number(searchParams.page) || 1;
  const products = await getProducts(page);
  
  return (
    <div>
      <ProductGrid products={products} />
      <Pagination currentPage={page} />
    </div>
  );
}
```

### Optimized Cart API Integration
```typescript
'use client';
import { useMemo } from 'react';

function useOptimizedCart() {
  // Debounced cart updates
  const debouncedAddToCart = useMemo(
    () => debounce(async (productId: number, quantity: number) => {
      await fetch('/wp-json/wc/store/cart/add-item', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId, quantity }),
      });
    }, 300),
    []
  );

  return { addToCart: debouncedAddToCart };
}
```

---

## 🔍 SEO & STRUCTURED DATA

### Metadata Optimization
```typescript
import { Metadata } from 'next';

export async function generateMetadata({ params }: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  return {
    title: `${product.name} | Modeo.pl`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: 'product',
    },
    alternates: {
      canonical: `https://modeo.pl/produkty/${params.slug}`,
    },
  };
}
```

### Structured Data (JSON-LD)
```typescript
function ProductStructuredData({ product }: { product: Product }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "brand": { "@type": "Brand", "name": "Modeo" },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "PLN",
      "availability": "InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

---

## 🎭 LOADING STATES & UX

### Skeleton Components
```typescript
function ProductCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="product-grid">
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
```

---

## 📱 RESPONSIVE & ACCESSIBILITY

### Mobile-First Approach
```typescript
// ALWAYS design mobile-first
function ResponsiveProductGrid() {
  return (
    <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      gap-4 
      px-4 
      sm:px-6 
      lg:px-8
    ">
      {/* Products */}
    </div>
  );
}
```

### Accessibility Standards
```typescript
// ALWAYS include proper ARIA labels and semantic HTML
function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card" role="article" aria-labelledby={`product-${product.id}`}>
      <Image 
        src={product.image} 
        alt={`${product.name} product image`}
        width={300} 
        height={300}
      />
      <h3 id={`product-${product.id}`}>{product.name}</h3>
      <p role="text" aria-label={`Price: ${product.price} PLN`}>
        {product.price} zł
      </p>
      <button 
        className="btn-primary"
        aria-label={`Add ${product.name} to cart`}
        type="button"
      >
        Add to Cart
      </button>
    </article>
  );
}
```

---

## 🔧 DEVELOPMENT CHECKLIST

**Before implementing any feature, ensure:**

✅ **Performance Budget**: Will this impact LCP/FID/CLS?
✅ **Image Optimization**: Are all images using Next.js Image component?
✅ **ISR Strategy**: Can this be statically generated or cached?
✅ **Code Splitting**: Should this be lazy loaded?
✅ **Memoization**: Are expensive calculations/renders memoized?
✅ **Mobile First**: Does this work perfectly on mobile?
✅ **Accessibility**: Screen reader and keyboard navigation friendly?
✅ **SEO**: Proper metadata and structured data?

**Performance Testing Commands:**
```bash
# Lighthouse audit
npm run build && npm run start
# Then run Lighthouse on localhost:3000

# Bundle analysis
npm run build && npm run analyze

# Core Web Vitals testing
# Use Chrome DevTools or web.dev/measure
```

---

## 🎯 YOUR MISSION

**Create blazing-fast, SEO-optimized, accessible Next.js e-commerce pages that deliver exceptional user experience while maintaining perfect integration with WordPress WooCommerce.**

**Every line of code should contribute to faster load times, better Core Web Vitals, and superior user experience.**

**When implementing features, always ask: "How does this impact performance?" and "Can this be optimized further?"**