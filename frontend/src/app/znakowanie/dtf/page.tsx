import { Metadata } from 'next';
import { DTFPageOptimized } from '@/features/dtf-printing';

export const metadata: Metadata = {
  title: 'DTF - Modeo.pl | Nowoczesne nadruki DTF',
  description: 'Nowoczesne nadruki DTF na odzieży i akcesoriach. Fotorealistyczne detale, bez ograniczeń kolorów, elastyczne nadruki. ✓ Wysokiej jakości tusze ✓ Szybka realizacja ✓ Na różnych materiałach',
  keywords: 'DTF, nadruki DTF, Direct to Film, nadruki na odzieży, fotorealistyczne nadruki, elastyczne nadruki, kolorowe nadruki, nadruki bez ograniczeń',
  openGraph: {
    title: 'DTF - Modeo.pl | Nowoczesne nadruki DTF',
    description: 'Nowoczesne nadruki DTF na odzieży i akcesoriach. Fotorealistyczne detale, bez ograniczeń kolorów, elastyczne nadruki. ✓ Wysokiej jakości tusze ✓ Szybka realizacja ✓ Na różnych materiałach',
    type: 'website',
    locale: 'pl_PL',
    images: [{
      url: '/znakowanie/dtf-min.png',
      width: 1200,
      height: 630,
      alt: 'DTF - Modeo',
    }],
  },
  alternates: {
    canonical: '/znakowanie/dtf'
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function DTFPage() {
  return <DTFPageOptimized />;
}