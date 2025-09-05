'use client';

import { memo } from 'react';
import Head from 'next/head';
import { ShopFilters } from '../types';

interface ShopMetaProps {
  totalProducts: number;
  currentProductsCount: number;
  filters: ShopFilters;
}

export const ShopMeta = memo<ShopMetaProps>(({
  totalProducts,
  currentProductsCount,
  filters
}) => {
  const getTitle = () => {
    if (filters.search) {
      return `Szukaj "${filters.search}" - Sklep Modeo.pl`;
    }
    if (filters.category) {
      return `Kategoria ${filters.category} - Sklep Modeo.pl`;
    }
    return `Sklep - Modeo.pl | ${totalProducts} produktów`;
  };

  const getDescription = () => {
    if (filters.search) {
      return `Znaleziono ${currentProductsCount} produktów dla zapytania "${filters.search}". Przeglądaj najlepsze oferty w sklepie Modeo.pl`;
    }
    if (filters.category) {
      return `Kategoria ${filters.category} - ${currentProductsCount} produktów. Najlepsze oferty i konkurencyjne ceny w sklepie Modeo.pl`;
    }
    return `Odkryj ${totalProducts} produktów w sklepie Modeo.pl. Najlepsza jakość, konkurencyjne ceny, szybka dostawa na terenie Polski.`;
  };

  const getStructuredData = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: getTitle(),
      description: getDescription(),
      url: 'https://modeo.pl/sklep',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Modeo.pl',
        url: 'https://modeo.pl',
      },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: totalProducts,
        itemListElement: []
      }
    };
  };

  return (
    <Head>
      <title>{getTitle()}</title>
      <meta name="description" content={getDescription()} />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content={getTitle()} />
      <meta property="og:description" content={getDescription()} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://modeo.pl/sklep" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={getTitle()} />
      <meta name="twitter:description" content={getDescription()} />
      <link rel="canonical" href="https://modeo.pl/sklep" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
      />
    </Head>
  );
});

ShopMeta.displayName = 'ShopMeta';