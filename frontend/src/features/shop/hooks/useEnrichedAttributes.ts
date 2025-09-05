'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Product, ProductAttribute, ProductAttributeTerm } from '@/types/product';
import { config } from '@/lib/config';

interface EnrichedAttributeTerm extends ProductAttributeTerm {
  swatch_type?: 'color' | 'image' | 'label' | 'none';
  swatch_value?: string;
  image?: {
    id: number;
    url: string;
    thumbnail?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

interface UseEnrichedAttributesReturn {
  enrichedProduct: Product;
  loading: boolean;
  error: string | null;
}

// Mapowanie kolorów - wbudowane w frontend
const COLOR_MAPPING: Record<string, string> = {
  'bialy': '#FFFFFF',
  'czarny': '#000000',
  'czerwony': '#FF0000',
  'niebieski': '#0000FF',
  'zielony': '#008000',
  'zolty': '#FFFF00',
  'pomaranczowy': '#FFA500',
  'fioletowy': '#800080',
  'rozowy': '#FFC0CB',
  'szary': '#808080',
  'brazowy': '#A52A2A',
  'srebrny': '#C0C0C0',
  'zloty': '#FFD700',
  'granatowy': '#000080',
  'bordowy': '#800000',
  'turkusowy': '#40E0D0',
  'limonkowy': '#00FF00',
  'beżowy': '#F5F5DC',
  'kremowy': '#FFFDD0',
  'khaki': '#F0E68C',
};

/**
 * Mapuje nazwę koloru na kod hex
 */
function getColorFromName(colorName: string): { swatch_type: 'color'; swatch_value: string } | null {
  const normalizedName = colorName.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z]/g, ''); // Remove non-letters
  
  const hexColor = COLOR_MAPPING[normalizedName];
  if (hexColor) {
    return {
      swatch_type: 'color',
      swatch_value: hexColor
    };
  }
  return null;
}

/**
 * Hook który wzbogaca wszystkie atrybuty produktu o metadane z WordPress taksonomii
 * (kolory RGB, obrazki wzorów, tekstury, itp.)
 */
export function useEnrichedAttributes(product: Product): UseEnrichedAttributesReturn {
  const [enrichedTermsData, setEnrichedTermsData] = useState<Map<number, EnrichedAttributeTerm>>(new Map());
  const [, setVariationImagesByTerm] = useState<Map<number, { url: string; thumbnail?: string; alt?: string }>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Znajdź wszystkie atrybuty które mają warianty
  const variationAttributes = useMemo(() => {
    if (!product.attributes) return [];
    
    const attrs = product.attributes.filter(attr => 
      attr.has_variations === true &&
      attr.terms && attr.terms.length > 0
    );
    
    return attrs;
  }, [product.attributes]);

  // Pobierz wzbogacone dane dla wszystkich terminów taksonomii
  useEffect(() => {
    const fetchEnrichedData = async () => {
      if (variationAttributes.length === 0) {
        setEnrichedTermsData(new Map());
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Zbierz wszystkie ID terminów ze wszystkich atrybutów
        const allTermIds = variationAttributes.flatMap(attr => 
          attr.terms.map(term => term.id)
        );


        // Pobierz obrazki wariantów jeśli to produkt wariantowy
        const localVariationImagesByTerm = new Map();
        if (product.type === 'variable' && product.id) {
          try {
            const variationImagesResponse = await fetch(`${config.getApiUrl()}/wp-json/modeo/v1/product-variations-images/${product.id}`);
            if (variationImagesResponse.ok) {
              const variationImages = await variationImagesResponse.json();
              
              // Mapuj obrazki wariantów na term IDs
              variationImages.forEach((variation: { 
                variation_id: number; 
                attributes: { term_id: number; name: string; taxonomy: string; slug: string; }[]; 
                image: { url: string; thumbnail: string; alt: string; } 
              }) => {
                variation.attributes.forEach(attr => {
                  localVariationImagesByTerm.set(attr.term_id, {
                    url: variation.image.url,
                    thumbnail: variation.image.thumbnail,
                    alt: variation.image.alt || attr.name,
                  });
                });
              });
              setVariationImagesByTerm(localVariationImagesByTerm);
            }
          } catch {
            // Failed to fetch variation images - continue without them
          }
        }

        if (allTermIds.length > 0) {

          // Spróbuj pobrać dane o swatchach (kolory, obrazki, etc.)
          const response = await fetch(`${config.getApiUrl()}/wp-json/modeo/v1/attribute-swatches`);
          let responseOk = response.ok;
          
          // If attribute-swatches endpoint doesn't exist, skip to fallback
          if (!response.ok && response.status === 404) {
            responseOk = false; // Force fallback
          }
          
          if (responseOk) {
            const allSwatches = await response.json();
            
            const enrichedMap = new Map<number, EnrichedAttributeTerm>();

            // Przetwórz każdy term z danymi z WordPressa
            allTermIds.forEach(termId => {
              const originalTerm = variationAttributes.flatMap(attr => attr.terms)
                .find(t => t.id === termId);
              
              const wordpressData = allSwatches.find((s: { 
                id: number; 
                name: string; 
                slug: string; 
                swatch_type?: string; 
                swatch_value?: string;
                image?: {
                  id: number;
                  url: string;
                  thumbnail?: string;
                  alt?: string;
                  width?: number;
                  height?: number;
                };
              }) => s.id === termId);

              if (originalTerm) {
                const enrichedTerm: EnrichedAttributeTerm = {
                  ...originalTerm,
                  swatch_type: wordpressData?.swatch_type || originalTerm.swatch_type,
                  swatch_value: wordpressData?.swatch_value || originalTerm.swatch_value,
                };

                // Fallback: spróbuj zmapować kolor z nazwy jeśli nie ma danych z WordPressa
                if (!wordpressData?.swatch_type && !originalTerm.swatch_type) {
                  const colorMapping = getColorFromName(originalTerm.name);
                  if (colorMapping) {
                    enrichedTerm.swatch_type = colorMapping.swatch_type;
                    enrichedTerm.swatch_value = colorMapping.swatch_value;
                  }
                }

                // PRIORYTET 1: Zachowaj kolory RGB z taksonomii (nie nadpisuj obrazkami!)
                if (wordpressData?.swatch_type === 'color' && wordpressData?.swatch_value) {
                  // Keep color data as is
                } 
                // PRIORYTET 2: Obrazki z wariantów (featured images) - tylko dla non-color terms
                else {
                  const variationImage = localVariationImagesByTerm.get(termId);
                  if (variationImage) {
                    enrichedTerm.image = {
                      id: 0, // Nie mamy ID, ale mamy URL
                      url: variationImage.url,
                      thumbnail: variationImage.thumbnail,
                      alt: variationImage.alt || originalTerm.name,
                    };
                    
                    // Automatycznie ustaw typ na image
                    enrichedTerm.swatch_type = 'image';
                    enrichedTerm.swatch_value = variationImage.url;
                  } 
                  // PRIORYTET 3: Obrazki taksonomii (z wp admin)
                  else if (wordpressData?.image) {
                    enrichedTerm.image = {
                      id: wordpressData.image.id || 0,
                      url: wordpressData.image.url || wordpressData.image.src,
                      thumbnail: wordpressData.image.thumbnail,
                      alt: wordpressData.image.alt || originalTerm.name,
                      width: wordpressData.image.width,
                      height: wordpressData.image.height,
                    };
                    
                    // Jeśli mamy obrazek ale nie ma swatch_type, ustaw na 'image'
                    if (!enrichedTerm.swatch_type) {
                      enrichedTerm.swatch_type = 'image';
                      enrichedTerm.swatch_value = enrichedTerm.image.url;
                    }
                  }
                }


                enrichedMap.set(termId, enrichedTerm);
              }
            });
            
            setEnrichedTermsData(enrichedMap);
          } else {
            // Fallback - spróbuj starszego endpointa dla kolorów i stwórz dane dla innych atrybutów
            try {
              const colorResponse = await fetch(`${config.getApiUrl()}/wp-json/modeo/v1/color-swatches`);
              const colorMap = new Map<number, EnrichedAttributeTerm>();
              let colorData = [];
              
              if (colorResponse.ok) {
                colorData = await colorResponse.json();
              }
              
              allTermIds.forEach(termId => {
                const originalTerm = variationAttributes.flatMap(attr => attr.terms)
                  .find(t => t.id === termId);
                const colorTerm = colorData.find((c: { id: number; swatch_type?: string; swatch_value?: string; }) => c.id === termId);
                
                if (originalTerm) {
                  const enrichedTerm: EnrichedAttributeTerm = {
                    ...originalTerm,
                    swatch_type: colorTerm?.swatch_type || originalTerm.swatch_type,
                    swatch_value: colorTerm?.swatch_value || originalTerm.swatch_value,
                  };

                  // Spróbuj zmapować kolor z nazwy jeśli nie ma colorTerm
                  if (!colorTerm?.swatch_type && !originalTerm.swatch_type) {
                    const colorMapping = getColorFromName(originalTerm.name);
                    if (colorMapping) {
                      enrichedTerm.swatch_type = colorMapping.swatch_type;
                      enrichedTerm.swatch_value = colorMapping.swatch_value;
                    }
                  }

                  // PRIORYTET 1: Zachowaj kolory RGB z taksonomii (nie nadpisuj obrazkami!)
                  if (colorTerm?.swatch_type === 'color' && colorTerm?.swatch_value) {
                    // Keep color data as is
                  }
                  // PRIORYTET 2: Obrazki z wariantów (featured images) - tylko dla non-color terms
                  else {
                    const variationImage = localVariationImagesByTerm.get(termId);
                    if (variationImage) {
                      enrichedTerm.image = {
                        id: 0,
                        url: variationImage.url,
                        thumbnail: variationImage.thumbnail,
                        alt: variationImage.alt || originalTerm.name,
                      };
                      
                      enrichedTerm.swatch_type = 'image';
                      enrichedTerm.swatch_value = variationImage.url;
                    }
                  }
                  
                  colorMap.set(termId, enrichedTerm);
                }
              });
              
              setEnrichedTermsData(colorMap);
            } catch (colorError) {
              console.warn('Color fallback failed:', colorError);
              setEnrichedTermsData(new Map());
            }
          }
        }
      } catch (err) {
        console.error('Error fetching enriched attribute data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrichedData();
  }, [variationAttributes, product.id, product.type]);

  // Wzbogać produkt o metadane taksonomii
  const enrichedProduct = useMemo<Product>(() => {
    if (enrichedTermsData.size === 0) {
      return product;
    }

    const enrichedAttributes: ProductAttribute[] = product.attributes?.map(attr => {
      if (variationAttributes.some(varAttr => varAttr.id === attr.id)) {
        // To jest atrybut z wariantami - wzbogać go
        const enrichedTerms = attr.terms.map(term => {
          const enrichedData = enrichedTermsData.get(term.id);
          return enrichedData || term;
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
  }, [product, enrichedTermsData, variationAttributes]);

  return {
    enrichedProduct,
    loading,
    error,
  };
}