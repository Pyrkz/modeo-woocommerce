import { Metadata } from 'next';
import { ImieninyGiftsPageOptimized } from '@/features/imieniny-gifts';

export const metadata: Metadata = {
  title: 'Prezenty na Imieniny - Tradycyjne i Personalizowane Prezenty | Modeo',
  description: 'Święć tradycję imienin w wyjątkowy sposób! Tradycyjne i nowoczesne prezenty na imieniny z personalizacją. Koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['prezenty na imieniny', 'imieniny prezent', 'prezent tradycyjny', 'koszulka na imieniny', 'bluza na prezent', 'nadruk personalizowany', 'nameday gifts', 'modeo'],
  openGraph: {
    title: 'Prezenty na Imieniny - Tradycyjne i Personalizowane | Modeo',
    description: 'Święć tradycję imienin w wyjątkowy sposób z personalizowanymi prezentami.',
    type: 'website',
  }
};

export default function ImieninyGiftPage() {
  return <ImieninyGiftsPageOptimized />;
}