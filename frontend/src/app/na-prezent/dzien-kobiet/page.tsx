import { Metadata } from 'next';
import { DzienKobietGiftsPageOptimized } from '@/features/dzien-kobiet-gifts';

export const metadata: Metadata = {
  title: 'Prezenty na Dzień Kobiet - Uhonoruj Wyjątkowe Kobiety | Modeo',
  description: 'Celebruj siłę i piękno kobiet! Wyjątkowe prezenty na Dzień Kobiet z personalizacją. Motywujące hasła, eleganckie wzory i produkty celebrujące kobiecość.',
  keywords: ['prezenty na dzień kobiet', 'dzień kobiet', 'prezenty dla kobiet', 'motywujące hasła', 'kobiece prezenty', 'modeo'],
  openGraph: {
    title: 'Prezenty na Dzień Kobiet - Celebruj Siłę Kobiet | Modeo',
    description: 'Uhonoruj wyjątkowe kobiety w Twoim życiu z personalizowanymi prezentami na Dzień Kobiet.',
    type: 'website',
  }
};

export default function DzienKobietGiftPage() {
  return <DzienKobietGiftsPageOptimized />;
}