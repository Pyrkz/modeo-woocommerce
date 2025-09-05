import { Metadata } from 'next';
import { ParapetowkaGiftsPageOptimized } from '@/features/parapetowka-gifts/components/ParapetowkaGiftsPageOptimized';

export const metadata: Metadata = {
  title: 'Parapetówka - Personalizowane Prezenty | Modeo',
  description: 'Praktyczne prezenty na nowe mieszkanie. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['parapetówka', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: 'Parapetówka - Personalizowane Prezenty | Modeo',
    description: 'Praktyczne prezenty na nowe mieszkanie',
    type: 'website',
  },
};

export default function ParapetwkaGiftPage() {
  return <ParapetowkaGiftsPageOptimized />;
}