import { Metadata } from 'next';
import { UrodzinyGiftsPageClean } from '@/features/urodziny-gifts/components/UrodzinyGiftsPageClean';

export const metadata: Metadata = {
  title: 'Prezenty na Urodziny - Personalizowane Prezenty Urodzinowe | Modeo',
  description: 'Spraw radość w wyjątkowym dniu! Personalizowane prezenty urodzinowe na każdy wiek. Koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['prezenty na urodziny', 'urodziny prezent', 'koszulka urodzinowa', 'bluza na prezent', 'nadruk personalizowany', 'birthday gifts', 'modeo'],
  openGraph: {
    title: 'Prezenty na Urodziny - Personalizowane Prezenty | Modeo',
    description: 'Spraw radość w wyjątkowym dniu z personalizowanymi prezentami urodzinowymi.',
    type: 'website',
  }
};

export default function UrodzinyGiftPage() {
  return <UrodzinyGiftsPageClean />;
}