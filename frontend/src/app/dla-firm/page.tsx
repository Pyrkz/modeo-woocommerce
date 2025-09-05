import type { Metadata } from 'next';
import { BusinessHero, BusinessServices, BusinessCTA, businessServicesData, businessCTAData } from '@/features/business';

export const metadata: Metadata = {
  title: 'Oferta dla firm - Modeo.pl | Profesjonalne rozwiązania B2B',
  description: 'Niezależnie od tego, czy chcesz stworzyć wyjątkową markę, potrzebujesz ubrań służbowych, czy firmowych gadżetów - dzięki naszej ofercie spełniasz każde potrzeby biznesowe.',
  openGraph: {
    title: 'Oferta dla firm - Modeo.pl',
    description: 'Profesjonalne rozwiązania dla Twojego biznesu',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/resources/modeo dla firm-min.jpg',
        width: 1200,
        height: 630,
        alt: 'Modeo - Oferta dla firm',
      },
    ],
  },
};

export default function DlaFirm() {
  return (
    <>
      <BusinessHero 
        title="Oferta dla firm"
        subtitle="Niezależnie od tego, czy chcesz stworzyć wyjątkową markę, oddana marka odzieżowa."
        description="Niezależnie od tego, czy firmowych gadżetów - dzięki temu każdemu każde potrzeby danej - mamy coś dla Ciebie. Poznasz na wszystkich razem spajena!"
        ctaButton={{
          text: "Poznaj ofertę",
          href: "/kontakt"
        }}
        backgroundImage="/resources/modeo dla firm-min.jpg"
      />
      
      <BusinessServices {...businessServicesData} />
      
      <BusinessCTA {...businessCTAData} />
    </>
  );
}