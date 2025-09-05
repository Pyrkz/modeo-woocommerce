import { Metadata } from 'next';
import { SlubGiftsPageOptimized } from '@/features/slub-gifts';

export const metadata: Metadata = {
  title: 'Ślub - Personalizowane Prezenty | Modeo',
  description: 'Pamiątkowe prezenty ślubne dla nowożeńców. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['ślub', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: 'Ślub - Personalizowane Prezenty | Modeo',
    description: 'Pamiątkowe prezenty ślubne dla nowożeńców',
    type: 'website',
  },
};

export default function SlubGiftPage() {
  return <SlubGiftsPageOptimized />;
}