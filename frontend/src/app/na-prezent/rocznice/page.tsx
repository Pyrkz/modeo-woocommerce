import { Metadata } from 'next';
import { RoczniceGiftsPageOptimized } from '@/features/rocznice-gifts';

export const metadata: Metadata = {
  title: 'Prezenty na Rocznice - Pamiątkowe Prezenty Personalizowane | Modeo',
  description: 'Uczcij ważne rocznice w wyjątkowy sposób! Pamiątkowe prezenty na rocznice z personalizacją. Koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['prezenty na rocznice', 'rocznica prezent', 'prezent pamiątkowy', 'koszulka rocznica', 'bluza na prezent', 'nadruk personalizowany', 'anniversary gifts', 'modeo'],
  openGraph: {
    title: 'Prezenty na Rocznice - Pamiątkowe Prezenty | Modeo',
    description: 'Uczcij ważne rocznice w wyjątkowy sposób z personalizowanymi prezentami.',
    type: 'website',
  }
};

export default function RoczniceGiftPage() {
  return <RoczniceGiftsPageOptimized />;
}