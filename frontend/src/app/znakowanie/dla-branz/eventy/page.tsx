import { Metadata } from 'next';
import { EventyBrandingPageOptimized } from '@/features/eventy-branding';

export const metadata: Metadata = {
  title: 'Eventy - Znakowanie dla branży | Modeo',
  description: 'Profesjonalne znakowanie na eventy i wydarzenia. Kompleksowe rozwiązania brandingowe dla organizatorów eventów, targów i konferencji. Od identyfikatorów po gadżety eventowe.',
  keywords: 'event, wydarzenie, targi, konferencje, eventy, znakowanie eventowe, gadżety, identyfikatory, roll-upy, hafiarstwo, sitodruk, modeo',
  openGraph: {
    title: 'Eventy - Znakowanie dla branży | Modeo',
    description: 'Profesjonalne znakowanie na eventy i wydarzenia. Kompleksowe rozwiązania brandingowe dla organizatorów eventów, targów i konferencji. Od identyfikatorów po gadżety eventowe.',
    type: 'website',
  }
};

export default function EventyBrandingPage() {
  return <EventyBrandingPageOptimized />;
}