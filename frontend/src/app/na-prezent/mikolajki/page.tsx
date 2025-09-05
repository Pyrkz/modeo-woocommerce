import { Metadata } from 'next';
import { MikolajkiGiftsPageOptimized } from '@/features/mikolajki-gifts';

export const metadata: Metadata = {
  title: 'Prezenty na Mikołajki - Magiczne Prezenty Personalizowane | Modeo',
  description: 'Magiczne prezenty na Mikołajki w wyjątkowy sposób! Personalizowane prezenty dla dzieci. Koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['prezenty na mikołajki', 'mikolajki prezent', 'prezent magiczny', 'koszulka mikołajki', 'bluza na prezent', 'nadruk personalizowany', 'christmas gifts', 'modeo'],
  openGraph: {
    title: 'Prezenty na Mikołajki - Magiczne Prezenty | Modeo',
    description: 'Magiczne prezenty na Mikołajki w wyjątkowy sposób z personalizowanymi prezentami.',
    type: 'website',
  }
};

export default function MikolajkiGiftPage() {
  return <MikolajkiGiftsPageOptimized />;
}