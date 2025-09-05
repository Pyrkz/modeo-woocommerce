import { Metadata } from 'next';
import { FlockPageOptimized } from '@/features/flock-printing';

export const metadata: Metadata = {
  title: 'Flock - Aksamitne nadruki na tekstyliach | Modeo.pl',
  description: 'Odkryj magię flock - technikę znakowania dającą aksamitną fakturę. Idealna do eleganckich nadruków na koszulkach, bluzkach i akcesoriach. Zamów już dziś!',
  keywords: [
    'flock',
    'nadruk flock',
    'aksamitny nadruk',
    'znakowanie tekstyliów',
    'nadruki na koszulkach',
    'folia flock',
    'eleganckie nadruki'
  ],
  openGraph: {
    title: 'Flock - Aksamitne nadruki | Modeo.pl',
    description: 'Aksamitna faktura premium - flock to idealne rozwiązanie dla eleganckich nadruków na tekstyliach.',
    images: ['/znakowanie/flock-min.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flock - Aksamitne nadruki | Modeo.pl',
    description: 'Aksamitna faktura premium - flock to idealne rozwiązanie dla eleganckich nadruków na tekstyliach.',
    images: ['/znakowanie/flock-min.png'],
  },
  alternates: {
    canonical: 'https://modeo.pl/znakowanie/flock'
  }
};

export default function FlockPage() {
  return <FlockPageOptimized />;
}