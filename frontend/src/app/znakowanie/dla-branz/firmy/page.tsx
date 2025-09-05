import { Metadata } from 'next';
import { FirmyBrandingPageOptimized } from '@/features/firmy-branding';

export const metadata: Metadata = {
  title: 'Firmy - Znakowanie dla branży | Modeo',
  description: 'Profesjonalne znakowanie dla przedsiębiorstw. Kompleksowe rozwiązania brandingowe dla firm każdej wielkości. Od wizytówek po oznakowanie siedziby.',
  keywords: 'firma, biznes, korporacja, przedsiębiorstwo, office, biuro, znakowanie, hafiarstwo, sitodruk, modeo',
  openGraph: {
    title: 'Firmy - Znakowanie dla branży | Modeo',
    description: 'Profesjonalne znakowanie dla przedsiębiorstw. Kompleksowe rozwiązania brandingowe dla firm każdej wielkości. Od wizytówek po oznakowanie siedziby.',
    type: 'website',
  }
};

export default function FirmyBrandingPage() {
  return <FirmyBrandingPageOptimized />;
}