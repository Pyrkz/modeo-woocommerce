import { Metadata } from 'next';
import { HaftPageOptimizedNew } from '@/features/haft-embroidery';

export const metadata: Metadata = {
  title: 'Haft Komputerowy - Modeo.pl | Profesjonalny haft na odzieży',
  description: 'Profesjonalny haft komputerowy na odzieży i akcesoriach. Wysokiej jakości hafty na koszulkach, bluzkach, czapkach i odzieży roboczej. ✓ Precyzyjne wykonanie ✓ Trwałość ✓ Szybka realizacja',
  keywords: 'haft komputerowy, haft na odzieży, haft logo, hafty na koszulkach, haft na czapkach, profesjonalny haft, znakowanie haftem',
  openGraph: {
    title: 'Haft Komputerowy - Modeo.pl | Profesjonalny haft na odzieży',
    description: 'Profesjonalny haft komputerowy na odzieży i akcesoriach. Wysokiej jakości hafty na koszulkach, bluzkach, czapkach i odzieży roboczej. ✓ Precyzyjne wykonanie ✓ Trwałość ✓ Szybka realizacja',
    type: 'website',
    locale: 'pl_PL',
    images: [{
      url: '/rodzaje-nadrukow/haft komputerowy-min.jpg',
      width: 1200,
      height: 630,
      alt: 'HAFT - Modeo',
    }],
  },
  alternates: {
    canonical: '/znakowanie/haft'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function HaftPage() {
  return <HaftPageOptimizedNew />;
}