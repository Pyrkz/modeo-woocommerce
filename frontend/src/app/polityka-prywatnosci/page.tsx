import React from 'react';
import type { Metadata } from 'next';
import { PrivacyPolicyPage } from '@/features/privacy-policy';

export const metadata: Metadata = {
  title: 'Polityka Prywatności - Modeo.pl',
  description: 'Polityka prywatności sklepu internetowego Modeo.pl - informacje o przetwarzaniu danych osobowych, bezpieczeństwie i prawach użytkowników.',
  keywords: 'polityka prywatności, RODO, dane osobowe, Modeo, sklep internetowy, ochrona danych',
  openGraph: {
    title: 'Polityka Prywatności - Modeo.pl',
    description: 'Polityka prywatności sklepu internetowego Modeo.pl - informacje o przetwarzaniu danych osobowych.',
    type: 'website',
    locale: 'pl_PL',
  },
  alternates: {
    canonical: '/polityka-prywatnosci',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPageRoute() {
  return <PrivacyPolicyPage />;
}