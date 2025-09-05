import { Metadata } from 'next';
import { NaPrezentGiftsPageOptimized } from '@/features/na-prezent-gifts';

export const metadata: Metadata = {
  title: 'Na Prezent - Personalizowane Prezenty | Modeo',
  description: 'Znajdź idealny prezent na każdą okazję. Personalizowane koszulki, bluzy i akcesoria na Boże Narodzenie, urodziny, Walentynki i inne święta.',
  keywords: ['prezenty personalizowane', 'święta', 'urodziny', 'walentynki', 'boże narodzenie', 'koszulki na prezent'],
  openGraph: {
    title: 'Na Prezent - Personalizowane Prezenty | Modeo',
    description: 'Znajdź idealny prezent na każdą okazję. Personalizowane produkty na święta i specjalne momenty.',
    type: 'website',
  },
};

export default function GiftOccasionsPage() {
  return <NaPrezentGiftsPageOptimized />;
}