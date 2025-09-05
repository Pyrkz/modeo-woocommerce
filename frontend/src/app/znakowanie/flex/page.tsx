import { Metadata } from 'next';
import { FlexPageOptimized } from '@/features/flex-printing';

export const metadata: Metadata = {
  title: 'Flex - Modeo.pl | Profesjonalny nadruk flex',
  description: 'Profesjonalny nadruk flex na odzieży i akcesoriach. Matowe wykończenie, elastyczny materiał, idealny na napisy i proste wzory. ✓ Precyzyjny krój ✓ Szybka realizacja ✓ Trwały nadruk',
  keywords: 'flex, nadruk flex, folia flex, napisy na koszulkach, matowy nadruk, elastyczny nadruk, precyzyjny krój, proste wzory, personalizacja odzieży',
  openGraph: {
    title: 'Flex - Modeo.pl | Profesjonalny nadruk flex',
    description: 'Profesjonalny nadruk flex na odzieży i akcesoriach. Matowe wykończenie, elastyczny materiał, idealny na napisy i proste wzory. ✓ Precyzyjny krój ✓ Szybka realizacja ✓ Trwały nadruk',
    type: 'website',
    locale: 'pl_PL',
    images: [{
      url: '/znakowanie/flex-min.png',
      width: 1200,
      height: 630,
      alt: 'Flex - Modeo',
    }],
  },
  alternates: {
    canonical: '/znakowanie/flex'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function FlexPage() {
  return <FlexPageOptimized />;
}