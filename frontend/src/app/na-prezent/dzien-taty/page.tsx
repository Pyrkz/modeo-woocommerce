import { Metadata } from 'next';
import { DzienTatyGiftsPageOptimized } from '@/features/dzien-taty-gifts';

export const metadata: Metadata = {
  title: 'Dzień Taty - Personalizowane Prezenty | Modeo',
  description: 'Wyjątkowe prezenty dla najlepszego Taty na świecie. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['dzień taty', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: 'Dzień Taty - Personalizowane Prezenty | Modeo',
    description: 'Wyjątkowe prezenty dla najlepszego Taty na świecie',
    type: 'website',
  },
};

export default function DzieTatyGiftPage() {
  return <DzienTatyGiftsPageOptimized />;
}