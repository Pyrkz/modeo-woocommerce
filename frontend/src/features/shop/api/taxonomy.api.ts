// API dla pobierania metadanych taksonomii (kolory RGB)
import { inferColorFromName } from '@/utils/colorMapping';
import { config } from '@/lib/config';

export interface ColorTerm {
  id: number;
  name: string;
  slug: string;
  color?: string; // RGB value from taxonomy meta
  description?: string;
}

export class TaxonomyApi {
  /**
   * Pobiera szczegóły taksonomii kolorów - obecnie używa mapowania nazw na RGB
   * @param termIds - array ID terminów do pobrania - obecnie nieużywany
   * @param termData - dane terminów z produktu (nazwa, slug, id)
   */
  static async getColorTerms(termIds?: number[], termData?: Array<{id: number, name: string, slug: string}>): Promise<ColorTerm[]> {
    try {
      // Jeśli mamy dane terminów z produktu, używaj ich
      if (termData && termData.length > 0) {
        return termData.map(term => ({
          id: term.id,
          name: term.name,
          slug: term.slug,
          color: inferColorFromName(term.name), // Użyj bogaty system mapowania
          description: undefined,
        }));
      }
      
      // Fallback - zwróć puste jeśli brak danych
      if (!termIds || termIds.length === 0) {
        return [];
      }

      // Prosty fallback dla ID - zwróć dummy dane
      return termIds.map(id => ({
        id,
        name: `Kolor ${id}`,
        slug: `kolor-${id}`,
        color: inferColorFromName(`Kolor ${id}`),
        description: undefined,
      }));
      
    } catch (error) {
      console.error('Error processing color terms:', error);
      return [];
    }
  }


  /**
   * Pobiera szczegóły konkretnego termu kolorów
   * @param termId - ID termu
   * @param taxonomySlug - slug taksonomii
   */
  static async getColorTerm(termId: number, taxonomySlug: string = 'pa_kolor'): Promise<ColorTerm | null> {
    try {
      const url = new URL(`${config.getApiUrl()}/wp-json/wp/v2/${taxonomySlug}/${termId}`);
      url.searchParams.set('context', 'view');
      
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.warn(`Failed to fetch color term ${termId}: ${response.status} ${response.statusText}`);
        return null;
      }
      
      const term = await response.json();
      
      return {
        id: term.id,
        name: term.name,
        slug: term.slug,
        // Sprawdź różne możliwe lokalizacje danych o kolorze RGB
        color: term.meta?.color || term.acf?.color || term.meta?.rgb || term.meta?.kolor_rgb || undefined,
        description: term.description || undefined,
      };
      
    } catch (error) {
      console.error('Error fetching color term:', error);
      return null;
    }
  }

  /**
   * Cache dla kolorów - unikaj wielokrotnego fetchowania tych samych danych
   */
  private static colorCache = new Map<string, ColorTerm[]>();
  
  /**
   * Cached version of getColorTerms
   */
  static async getCachedColorTerms(taxonomySlug: string = 'pa_kolor', termIds?: number[], termData?: Array<{id: number, name: string, slug: string}>): Promise<ColorTerm[]> {
    const cacheKey = `${taxonomySlug}-${termIds ? termIds.sort().join(',') : 'all'}`;
    
    if (this.colorCache.has(cacheKey)) {
      return this.colorCache.get(cacheKey)!;
    }
    
    const terms = await this.getColorTerms(termIds, termData);
    this.colorCache.set(cacheKey, terms);
    
    // Clear cache after 5 minutes
    setTimeout(() => {
      this.colorCache.delete(cacheKey);
    }, 5 * 60 * 1000);
    
    return terms;
  }
}