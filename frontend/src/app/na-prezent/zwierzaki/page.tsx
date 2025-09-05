import { Metadata } from 'next';
import { ZwierzakiGiftsPageOptimized } from '@/features/zwierzaki-gifts/components/ZwierzakiGiftsPageOptimized';

export const metadata: Metadata = {
  title: 'Zwierzaki - Personalizowane Prezenty | Modeo',
  description: 'Akcesoria dla miłośników zwierząt. Personalizowane koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['zwierzaki', 'prezent personalizowany', 'koszulka na prezent', 'bluza na prezent', 'nadruk'],
  openGraph: {
    title: 'Zwierzaki - Personalizowane Prezenty | Modeo',
    description: 'Akcesoria dla miłośników zwierząt',
    type: 'website',
  },
};

export default function ZwierzakiGiftPage() {
  return <ZwierzakiGiftsPageOptimized />;
}