import { Metadata } from 'next';
import { KlubyBrandingPageOptimized } from '@/features/kluby-sportowe-branding/components/KlubyBrandingPageOptimized';

export const metadata: Metadata = {
  title: 'Kluby sportowe - Znakowanie dla branży | Modeo',
  description: 'Profesjonalna odzież sportowa z logo. Wysokiej jakości stroje sportowe i akcesoria dla klubów, drużyn i organizacji sportowych.',
  keywords: 'sport, drużyna, klub, piłka, fitness, trening, zawody, znakowanie, hafiarstwo, sitodruk, modeo',
  openGraph: {
    title: 'Kluby sportowe - Znakowanie dla branży | Modeo',
    description: 'Profesjonalna odzież sportowa z logo. Wysokiej jakości stroje sportowe i akcesoria dla klubów, drużyn i organizacji sportowych.',
    type: 'website',
  }
};

export default function KlubysportoweBrandingPage() {
  return <KlubyBrandingPageOptimized />;
}