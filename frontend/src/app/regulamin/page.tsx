import React from 'react';
import type { Metadata } from 'next';
import { TermsOfServicePage } from '@/features/terms-of-service';

export const metadata: Metadata = {
  title: 'Regulamin sklepu internetowego - Modeo.pl',
  description: 'Regulamin sklepu internetowego Modeo.pl - zasady korzystania, składania zamówień, płatności, dostaw, zwrotów i reklamacji. Kompleksowe informacje dla klientów.',
  keywords: 'regulamin, sklep internetowy, Modeo, zasady zakupów, warunki sprzedaży, personalizacja odzieży, sitodruk, haft',
  openGraph: {
    title: 'Regulamin sklepu internetowego - Modeo.pl',
    description: 'Regulamin sklepu internetowego Modeo.pl - zasady korzystania, składania zamówień, płatności i dostaw.',
    type: 'website',
    locale: 'pl_PL',
    url: 'https://modeo.pl/regulamin',
  },
  alternates: {
    canonical: '/regulamin',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'effective-date': '2025-07-04',
    'document-type': 'terms-of-service',
  }
};

export default function TermsOfServicePageRoute() {
  return <TermsOfServicePage />;
}