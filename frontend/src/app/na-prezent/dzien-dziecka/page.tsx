import { Metadata } from 'next';
import { DzienDzieckaGiftsPageOptimized } from '@/features/dzien-dziecka-gifts/components/DzienDzieckaGiftsPageOptimized';

export const metadata: Metadata = {
  title: 'Dzień Dziecka - Personalizowane Prezenty | Modeo',
  description: 'Radosne prezenty dla najmłodszych. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['dzień dziecka', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: 'Dzień Dziecka - Personalizowane Prezenty | Modeo',
    description: 'Radosne prezenty dla najmłodszych',
    type: 'website',
  },
};

export default function DzieDzieckaGiftPage() {
  return <DzienDzieckaGiftsPageOptimized />;
}