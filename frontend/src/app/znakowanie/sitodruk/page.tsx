import { Metadata } from 'next';
import { SitodrukPageOptimized } from '@/features/sitodruk-printing';

export const metadata: Metadata = {
  title: 'Sitodruk - Modeo.pl | Profesjonalny sitodruk na odzieży',
  description: 'Profesjonalny sitodruk na odzieży i akcesoriach. Żywe kolory, trwałe nadruki idealne dla dużych nakładów. ✓ Wysokiej jakości farby ✓ Szybka realizacja ✓ Atrakcyjne ceny',
  keywords: 'sitodruk, nadruki na odzieży, sitodruk na koszulkach, nadruki sitodruk, druk na textilach, profesjonalny sitodruk, żywe kolory',
  openGraph: {
    title: 'Sitodruk - Modeo.pl | Profesjonalny sitodruk na odzieży',
    description: 'Profesjonalny sitodruk na odzieży i akcesoriach. Żywe kolory, trwałe nadruki idealne dla dużych nakładów. ✓ Wysokiej jakości farby ✓ Szybka realizacja ✓ Atrakcyjne ceny',
    type: 'website',
    locale: 'pl_PL',
    images: [{
      url: '/rodzaje-nadrukow/sitodruk-min.jpg',
      width: 1200,
      height: 630,
      alt: 'SITODRUK - Modeo',
    }],
  },
  alternates: {
    canonical: '/znakowanie/sitodruk'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function SitodrukPage() {
  return <SitodrukPageOptimized />;
}