import { Metadata } from 'next';
import { DzienDziadkaGiftsPageOptimized } from '@/features/dzien-dziadka-gifts/components/DzienDziadkaGiftsPageOptimized';

export const metadata: Metadata = {
  title: 'Dzień Dziadka - Personalizowane Prezenty | Modeo',
  description: 'Wyjątkowe prezenty dla ukochanego Dziadka. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['dzień dziadka', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: 'Dzień Dziadka - Personalizowane Prezenty | Modeo',
    description: 'Wyjątkowe prezenty dla ukochanego Dziadka',
    type: 'website',
  },
};

export default function DzienDziadkaGiftPage() {
  return <DzienDziadkaGiftsPageOptimized />;
}