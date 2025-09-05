import { Metadata } from 'next';
import { SzkolyBrandingPageOptimized } from '@/features/szkoly-branding';

export const metadata: Metadata = {
  title: 'Szkoły - Znakowanie dla branży | Modeo',
  description: 'Znakowanie dla placówek edukacyjnych. Specjalne rozwiązania dla szkół, przedszkoli i uczelni. Odzież szkolna i akcesoria edukacyjne.',
  keywords: 'szkoła, edukacja, uczniowie, nauczyciele, przedszkole, uczelnia, znakowanie, hafiarstwo, sitodruk, modeo',
  openGraph: {
    title: 'Szkoły - Znakowanie dla branży | Modeo',
    description: 'Znakowanie dla placówek edukacyjnych. Specjalne rozwiązania dla szkół, przedszkoli i uczelni. Odzież szkolna i akcesoria edukacyjne.',
    type: 'website',
  }
};

export default function SzkolyBrandingPage() {
  return <SzkolyBrandingPageOptimized />;
}