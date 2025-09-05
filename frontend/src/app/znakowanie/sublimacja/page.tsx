import { Metadata } from 'next';
import { SublimacjaPageOptimized } from '@/features/sublimacja-printing';

export const metadata: Metadata = {
  title: 'Sublimacja - Modeo.pl | Profesjonalna sublimacja na odzieży',
  description: 'Profesjonalna sublimacja na odzieży i akcesoriach. Żywe kolory wpieczene na zawsze, trwałe nadruki idealne na poliestr. ✓ Pełne spektrum kolorów ✓ Szybka realizacja ✓ Odporność na pranie',
  keywords: 'sublimacja, nadruki sublimacyjne, sublimacja na odzieży, nadruki na poliestrze, żywe kolory, trwałe nadruki, druk sublimacyjny, personalizacja odzieży',
  openGraph: {
    title: 'Sublimacja - Modeo.pl | Profesjonalna sublimacja na odzieży',
    description: 'Profesjonalna sublimacja na odzieży i akcesoriach. Żywe kolory wpieczene na zawsze, trwałe nadruki idealne na poliestr. ✓ Pełne spektrum kolorów ✓ Szybka realizacja ✓ Odporność na pranie',
    type: 'website',
    locale: 'pl_PL',
    images: [{
      url: '/znakowanie/sublimacja-nowa-min.png',
      width: 1200,
      height: 630,
      alt: 'Sublimacja - Modeo',
    }],
  },
  alternates: {
    canonical: '/znakowanie/sublimacja'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function SublimacjaPage() {
  return <SublimacjaPageOptimized />;
}