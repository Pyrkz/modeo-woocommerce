import { Metadata } from 'next';
import { DzienMamyGiftsPageOptimized } from '@/features/dzien-mamy-gifts';

export const metadata: Metadata = {
  title: 'Dzień Mamy - Personalizowane Prezenty | Modeo',
  description: 'Serdeczne prezenty dla najlepszej Mamy na świecie. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['dzień mamy', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: 'Dzień Mamy - Personalizowane Prezenty | Modeo',
    description: 'Serdeczne prezenty dla najlepszej Mamy na świecie',
    type: 'website',
  },
};

export default function DzienMamyGiftPage() {
  return <DzienMamyGiftsPageOptimized />;
}