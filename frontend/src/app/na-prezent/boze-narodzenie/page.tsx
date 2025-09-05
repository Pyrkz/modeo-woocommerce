import { Metadata } from 'next';
import { ChristmasGiftsPageOptimized } from '@/features/christmas-gifts';

export const metadata: Metadata = {
  title: 'Boże Narodzenie - Personalizowane Prezenty Świąteczne | Modeo',
  description: 'Odkryj wyjątkowe prezenty na Boże Narodzenie. Personalizowane koszulki, bluzy i akcesoria z motywami świątecznymi. Szybka realizacja i dostawa.',
  keywords: ['boże narodzenie', 'prezenty świąteczne', 'koszulki świąteczne', 'christmas', 'personalizowane', 'nadruk świąteczny'],
  openGraph: {
    title: 'Boże Narodzenie - Personalizowane Prezenty Świąteczne | Modeo',
    description: 'Wyjątkowe prezenty świąteczne z personalizacją. Koszulki, bluzy i akcesoria na Boże Narodzenie.',
    type: 'website',
  },
  alternates: {
    canonical: '/na-prezent/boze-narodzenie',
  },
};

export default function BozemNarodzenieGiftPage() {
  return <ChristmasGiftsPageOptimized />;
}