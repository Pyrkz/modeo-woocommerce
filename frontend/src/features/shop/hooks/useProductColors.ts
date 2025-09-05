'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Product, ProductAttribute } from '@/types/product';
import { ColorTerm } from '../api/taxonomy.api';
import { inferColorFromName } from '@/utils/colorMapping';
import { config } from '@/lib/config';

interface UseProductColorsReturn {
  enrichedProduct: Product;
  loading: boolean;
  error: string | null;
}

/**
 * Hook który wzbogaca produkt o rzeczywiste kolory RGB z WordPress taksonomii
 * Używa TaxonomyApi do pobrania metadanych kolorów
 */
export function useProductColors(product: Product): UseProductColorsReturn {
  const [colorTerms, setColorTerms] = useState<ColorTerm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Znajdź atrybuty kolorów w produkcie
  const colorAttributes = useMemo(() => {
    if (!product.attributes) return [];
    
    return product.attributes.filter(attr => 
      (attr.name.toLowerCase().includes('kolor') || 
       attr.name.toLowerCase().includes('color') ||
       attr.taxonomy === 'pa_color' ||
       attr.taxonomy === 'pa_kolor') &&
      attr.has_variations === true &&
      attr.terms && attr.terms.length > 0
    );
  }, [product.attributes]);

  // Pobierz kolory RGB dla znalezionych atrybutów
  useEffect(() => {
    const fetchColors = async () => {
      if (colorAttributes.length === 0) {
        setColorTerms([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Zbierz wszystkie ID terminów kolorów
        const termIds = colorAttributes.flatMap(attr => 
          attr.terms.map(term => term.id)
        );

        if (termIds.length > 0) {
          // Pobierz kolory RGB z custom endpointa WordPress
          const response = await fetch(`${config.getApiUrl()}/wp-json/modeo/v1/color-swatches`);
          
          if (response.ok) {
            const allColors = await response.json();
            console.log('🎨 USEPRODUCTCOLORS: All WordPress colors:', allColors.slice(0, 3));
            console.log('🎨 USEPRODUCTCOLORS: Looking for term IDs:', termIds);
            
            // Filtruj kolory tylko dla tego produktu
            const productColorTerms = termIds.map(termId => {
              const wordpressColor = allColors.find((c: { 
                id: number; 
                name: string; 
                slug: string; 
                swatch_type?: string; 
                swatch_value?: string 
              }) => c.id === termId);
              const originalTerm = colorAttributes.flatMap(attr => attr.terms)
                .find(t => t.id === termId);
              
              if (wordpressColor) {
                // Użyj RGB z WordPress
                const color = (wordpressColor.swatch_value && wordpressColor.swatch_type === 'color' && wordpressColor.swatch_value !== '') 
                  ? wordpressColor.swatch_value 
                  : inferColorFromName(wordpressColor.name);
                
                console.log(`🎨 TERM ${termId} (${wordpressColor.name}):`, {
                  swatch_type: wordpressColor.swatch_type,
                  swatch_value: wordpressColor.swatch_value,
                  finalColor: color
                });
                
                return {
                  id: termId,
                  name: wordpressColor.name,
                  slug: wordpressColor.slug,
                  color,
                  description: originalTerm?.description,
                  // WAŻNE: Przekaż swatch dane do AttributeSwatch
                  swatch_type: wordpressColor.swatch_type,
                  swatch_value: wordpressColor.swatch_value
                };
              }
              
              // Fallback jeśli nie znaleziono w WordPress
              return {
                id: termId,
                name: originalTerm?.name || `Color ${termId}`,
                slug: originalTerm?.slug || `color-${termId}`,
                color: inferColorFromName(originalTerm?.name || `Color ${termId}`),
                description: originalTerm?.description
              };
            });
            
            setColorTerms(productColorTerms);
          } else {
            // Fallback na stary system jeśli endpoint nie działa
            const allTermData = colorAttributes.flatMap(attr => 
              attr.terms.map(term => ({
                id: term.id,
                name: term.name,
                slug: term.slug
              }))
            );
            
            const enrichedTerms: ColorTerm[] = allTermData.map(termData => {
              const originalTerm = colorAttributes.flatMap(attr => attr.terms)
                .find(t => t.id === termData.id);
              
              const color = originalTerm?.swatch_value && originalTerm?.swatch_type === 'color'
                ? originalTerm.swatch_value
                : inferColorFromName(termData.name);
                
              return {
                ...termData,
                color,
                description: originalTerm?.description
              };
            });
            
            setColorTerms(enrichedTerms);
          }
        }
      } catch (err) {
        console.error('Error fetching product colors:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, [colorAttributes]);

  // Wzbogać produkt o kolory RGB
  const enrichedProduct = useMemo<Product>(() => {
    if (colorTerms.length === 0) {
      return product;
    }

    // Stwórz mapę kolorów dla szybkiego lookup
    const colorMap = new Map(colorTerms.map(term => [term.id, term]));

    // Zaktualizuj atrybuty produktu o kolory RGB
    const enrichedAttributes: ProductAttribute[] = product.attributes?.map(attr => {
      if (colorAttributes.some(colorAttr => colorAttr.id === attr.id)) {
        // To jest atrybut kolorów - wzbogać o RGB
        const enrichedTerms = attr.terms.map(term => {
          const colorData = colorMap.get(term.id);
          return {
            ...term,
            color: colorData?.color || undefined,
            description: colorData?.description || term.description,
          };
        });

        return {
          ...attr,
          terms: enrichedTerms,
        };
      }
      return attr;
    }) || [];

    return {
      ...product,
      attributes: enrichedAttributes,
    };
  }, [product, colorTerms, colorAttributes]);

  return {
    enrichedProduct,
    loading,
    error,
  };
}