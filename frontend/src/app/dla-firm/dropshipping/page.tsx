import { Metadata } from 'next';
import { DropshippingPage } from '@/features/dropshipping';

export const metadata: Metadata = {
  title: 'Dropshipping - Sprzedawaj bez inwestycji w towar | Modeo',
  description: 'Rozpocznij sprzedaż online bez kapitału początkowego. Dropshipping z Modeo - projektuj, marketuj, sprzedawaj. Zero ryzyka, maksymalny zysk.',
  keywords: 'dropshipping, sprzedaż online, biznes bez kapitału, własna marka, dropshipping Polska',
  openGraph: {
    title: 'Dropshipping - Sprzedawaj pod własną marką bez inwestycji',
    description: 'Projektuj, marketuj, sprzedawaj - my zajmiemy się produkcją, pakowaniem i wysyłką dla Twoich klientów.',
    type: 'website',
  },
};

export default function DropsshippingPageRoute() {
  return <DropshippingPage />;
}