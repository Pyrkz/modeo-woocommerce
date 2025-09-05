/**
 * Dekoduje HTML entities do zwykłego tekstu
 * Rozwiązuje problem z &#8211; (en-dash) i innymi HTML entities z WordPress
 */
export const decodeHtmlEntities = (text: string): string => {
  if (typeof window === 'undefined') {
    // Server-side fallback dla najczęstszych entities
    return text
      .replace(/&#8211;/g, '-')
      .replace(/&#8212;/g, '—')
      .replace(/&#8216;/g, "'")
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }
  
  // Client-side - używamy DOM API dla pełnego dekodowania
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};