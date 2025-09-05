'use client';

import { useEffect, useState, useCallback } from 'react';
import { useCartContext } from '@/features/cart/context/CartProvider';
import { useCart } from '@/hooks/useCart';
import { CategoriesSection, useCategories } from '@/features/categories';
import { HeroSlider, heroSliderData, sliderSettings } from '@/features/slider';
import { PromoSection, promoData } from '@/features/promo';
import { FeaturedProductsSection, useFeaturedProducts, featuredContent } from '@/features/featured';
import { PersonalizedGiftsSection, giftsData, giftsContent } from '@/features/gifts';
import { HomepageBlogSection, blogContent, useHomepageBlog } from '@/features/blog';

export default function Home() {
  const [, setAddingToCart] = useState<number | null>(null);
  
  // Cart context hooks
  const { openCart } = useCartContext();
  const { refreshCart } = useCart();
  
  // Categories hook
  const { categories, content } = useCategories();
  
  // Featured products hook
  const { products: featuredProducts, loading: featuredLoading } = useFeaturedProducts();
  
  // Blog posts hook
  const { posts: blogPosts, loading: blogLoading, error: blogError } = useHomepageBlog({ 
    maxPosts: 4,
    enableCache: true 
  });

  // Add to cart function
  const addToCart = useCallback(async (productId: number) => {
    setAddingToCart(productId);
    try {
      // Get nonce first
      const nonceResponse = await fetch('http://localhost:8080/wp-json/wc/store/cart', {
        credentials: 'include',
      });
      const nonce = nonceResponse.headers.get('Nonce');
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (nonce) {
        headers['Nonce'] = nonce;
      }
      
      const response = await fetch('http://localhost:8080/wp-json/wc/store/cart/add-item', {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({
          id: productId,
          quantity: 1,
        }),
      });
      
      if (response.ok) {
        // Refresh cart and open slide cart
        await refreshCart();
        openCart();
      } else {
        console.error('Błąd dodawania do koszyka:', response.status);
        alert('Błąd dodawania do koszyka');
      }
    } catch (error) {
      console.error('Błąd połączenia:', error);
      alert('Błąd połączenia z serwerem');
    } finally {
      setAddingToCart(null);
    }
  }, [refreshCart, openCart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8080/wp-json/wc/store/products', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        await res.json();
        // Data fetched but not currently used in UI
      } catch (err) {
        console.error('Błąd połączenia z WordPress:', err);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Slider */}
      <HeroSlider 
        slides={heroSliderData}
        autoplay={sliderSettings.autoplay}
        autoplayDelay={sliderSettings.autoplayDelay}
        showDots={sliderSettings.showDots}
        showArrows={sliderSettings.showArrows}
      />


      {/* Categories Section */}
      <CategoriesSection 
        title={content.title}
        subtitle={content.subtitle}
        categories={categories}
      />

      {/* Promo Section */}
      <PromoSection promos={promoData} />

      {/* Featured Products Section */}
      {!featuredLoading && featuredProducts.length > 0 && (
        <FeaturedProductsSection
          title={featuredContent.title}
          subtitle={featuredContent.subtitle}
          badgeText={featuredContent.badgeText}
          products={featuredProducts}
          onAddToCart={addToCart}
        />
      )}

      {/* Personalized Gifts Section */}
      <PersonalizedGiftsSection
        title={giftsContent.title}
        subtitle={giftsContent.subtitle}
        badgeText={giftsContent.badgeText}
        gifts={giftsData}
      />

      {/* Blog Section */}
      <HomepageBlogSection
        title={blogContent.title}
        subtitle={blogContent.subtitle}
        badgeText={blogContent.badgeText}
        posts={blogPosts}
        ctaText="Sprawdź wszystkie"
        ctaHref="/blog"
        maxPosts={4}
        loading={blogLoading}
        error={blogError}
      />

    </div>
  );
}
