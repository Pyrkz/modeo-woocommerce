import { Metadata } from 'next';
import { SylwesterGiftsPageOptimized } from '@/features/sylwester-gifts';

export const metadata: Metadata = {
  title: 'Prezenty na Sylwestra - Błyszczące Prezenty Personalizowane | Modeo',
  description: 'Powitaj Nowy Rok w wielkim stylu! Błyszczące prezenty na sylwestrowe imprezy. Koszulki, bluzy i akcesoria z indywidualnym nadrukiem.',
  keywords: ['prezenty na sylwestra', 'sylwester prezent', 'prezent błyszczący', 'koszulka sylwester', 'bluza na prezent', 'nadruk personalizowany', 'new year gifts', 'modeo'],
  openGraph: {
    title: 'Prezenty na Sylwestra - Błyszczące Prezenty | Modeo',
    description: 'Powitaj Nowy Rok w wielkim stylu z personalizowanymi prezentami.',
    type: 'website',
  }
};

export default function NowyRokSylwesterGiftPage() {
  return <SylwesterGiftsPageOptimized />;
}