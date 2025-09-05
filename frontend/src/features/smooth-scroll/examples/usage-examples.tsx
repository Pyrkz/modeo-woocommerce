/**
 * Usage examples for Lenis Smooth Scroll components
 * These examples show how to integrate smooth scroll in different parts of the app
 */

import React from 'react';
import { SmoothScrollAnchor, useSmoothScroll } from '../components';

// Example 1: Navigation menu with smooth scroll
export const SmoothNavigation: React.FC = () => {
  return (
    <nav className="flex space-x-6">
      <SmoothScrollAnchor 
        href="#o-nas" 
        className="text-gray-700 hover:text-gray-900 transition-colors"
      >
        O nas
      </SmoothScrollAnchor>
      
      <SmoothScrollAnchor 
        href="#produkty" 
        className="text-gray-700 hover:text-gray-900 transition-colors"
        offset={-120} // Custom offset for sticky header
      >
        Produkty
      </SmoothScrollAnchor>
      
      <SmoothScrollAnchor 
        href="#kontakt" 
        className="text-gray-700 hover:text-gray-900 transition-colors"
        duration={2000} // Slower scroll for longer distances
      >
        Kontakt
      </SmoothScrollAnchor>
    </nav>
  );
};

// Example 2: Custom scroll button component
export const ScrollToSection: React.FC<{ targetId: string; children: React.ReactNode }> = ({ 
  targetId, 
  children 
}) => {
  const { scrollTo } = useSmoothScroll();

  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      scrollTo(element, {
        offset: -100,
        duration: 1500,
      });
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
    >
      {children}
    </button>
  );
};

// Example 3: Scroll progress indicator
export const ScrollProgress: React.FC = () => {
  const { scrollProgress } = useSmoothScroll();

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-primary transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
};

// Example 4: Scroll-based animations
export const ScrollRevealSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollProgress } = useSmoothScroll();
  
  // Simple scroll-based opacity animation
  const opacity = Math.min(1, scrollProgress * 2);

  return (
    <section 
      className="transition-opacity duration-500"
      style={{ opacity }}
    >
      {children}
    </section>
  );
};

// Example 5: Footer with smooth scroll to top
export const FooterWithScrollTop: React.FC = () => {
  const { scrollToTop } = useSmoothScroll();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <button 
            onClick={() => scrollToTop({ duration: 1000 })}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>Powrót na górę</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};