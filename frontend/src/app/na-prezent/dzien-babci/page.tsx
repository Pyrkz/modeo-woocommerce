import { Metadata } from 'next';
import { DzienBabciGiftsPageOptimized } from '@/features/dzien-babci-gifts/components/DzienBabciGiftsPageOptimized';

export const metadata: Metadata = {
  title: 'Dzień Babci - Personalizowane Prezenty | Modeo',
  description: 'Serdeczne prezenty dla kochanej Babci. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['dzień babci', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: 'Dzień Babci - Personalizowane Prezenty | Modeo',
    description: 'Serdeczne prezenty dla kochanej Babci',
    type: 'website',
  },
};

export default function DzieBabciGiftPage() {
  return <DzienBabciGiftsPageOptimized />;
}