import { Metadata } from 'next';
import { RestauracjeBrandingPageOptimized } from '@/features/restauracje-branding';

export const metadata: Metadata = {
  title: 'Restauracje - Znakowanie dla branży | Modeo',
  description: 'Profesjonalne znakowanie dla gastronomii. Uniformy, fartuchy i akcesoria brandingowe zgodne z HACCP. Bezpieczne dla kontaktu z żywnością.',
  keywords: 'restauracja, gastronomia, fartuchy, uniformy, znakowanie, hafiarstwo, sitodruk, haccp, food-safe, modeo',
  openGraph: {
    title: 'Restauracje - Znakowanie dla branży | Modeo',
    description: 'Profesjonalne znakowanie dla gastronomii. Uniformy, fartuchy i akcesoria brandingowe zgodne z HACCP. Bezpieczne dla kontaktu z żywnością.',
    type: 'website',
  }
};

export default function RestauracjeBrandingPage() {
  return <RestauracjeBrandingPageOptimized />;
}