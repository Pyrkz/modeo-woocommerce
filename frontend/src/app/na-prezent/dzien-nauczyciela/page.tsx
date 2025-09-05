import { Metadata } from 'next';
import { DzienNauczycielaGiftsPageOptimized } from '@/features/dzien-nauczyciela-gifts/components/DzienNauczycielaGiftsPageOptimized';

export const metadata: Metadata = {
  title: 'Dzień Nauczyciela - Personalizowane Prezenty | Modeo',
  description: 'Podziękowania dla nauczycieli za ich pracę. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['dzień nauczyciela', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: 'Dzień Nauczyciela - Personalizowane Prezenty | Modeo',
    description: 'Podziękowania dla nauczycieli za ich pracę',
    type: 'website',
  },
};

export default function DzieNauczycielaGiftPage() {
  return <DzienNauczycielaGiftsPageOptimized />;
}