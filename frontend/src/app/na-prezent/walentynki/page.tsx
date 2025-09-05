import { Metadata } from 'next';
import { WalentynkiGiftsPageOptimized } from '@/features/walentynki-gifts';

export const metadata: Metadata = {
  title: 'Prezenty na Walentynki - Romantyczne Prezenty Personalizowane | Modeo',
  description: 'Pokaż swoją miłość w wyjątkowy sposób! Romantyczne prezenty na Walentynki z personalizacją. Koszulki dla par, bluzy z sercem i akcesoria miłosne.',
  keywords: ['prezenty na walentynki', 'romantyczne prezenty', 'koszulki dla par', 'prezenty dla zakochanych', 'valentine gifts', 'modeo'],
  openGraph: {
    title: 'Prezenty na Walentynki - Romantyczne Prezenty | Modeo',
    description: 'Wyrażaj swoją miłość w wyjątkowy sposób z personalizowanymi prezentami na Walentynki.',
    type: 'website',
  }
};

export default function WalentynkiGiftPage() {
  return <WalentynkiGiftsPageOptimized />;
}