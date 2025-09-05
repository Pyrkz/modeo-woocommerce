import { Metadata } from 'next';
import { DzienChlopakaGiftsPageOptimized } from '@/features/dzien-chlopaka-gifts';

export const metadata: Metadata = {
  title: 'Dzień Chłopaka - Personalizowane Prezenty | Modeo',
  description: 'Praktyczne i stylowe prezenty dla mężczyzn. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['dzień chłopaka', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: 'Dzień Chłopaka - Personalizowane Prezenty | Modeo',
    description: 'Praktyczne i stylowe prezenty dla mężczyzn',
    type: 'website',
  },
};

export default function DzienChlopakaGiftPage() {
  return <DzienChlopakaGiftsPageOptimized />;
}