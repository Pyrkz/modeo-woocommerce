import { Metadata } from 'next';
import { ZnakowaniePage } from '@/features/znakowanie';

export const metadata: Metadata = {
  title: 'Znakowanie nadruki - Profesjonalne usługi znakowania odzieży | Modeo',
  description: 'Jesteśmy liderem w branży odzieży firmowej z wieloletnim doświadczeniem i tysiącami zadowolonych klientów. Profesjonalne znakowanie, nadruki, hafty.',
  keywords: 'znakowanie, nadruki, hafty, odzież firmowa, sitodruk, DTF, DTG, termotransfer',
  openGraph: {
    title: 'Znakowanie nadruki - Modeo',
    description: 'Profesjonalne usługi znakowania odzieży firmowej',
    type: 'website',
    locale: 'pl_PL',
  },
};

export default function Znakowanie() {
  return <ZnakowaniePage />;
}