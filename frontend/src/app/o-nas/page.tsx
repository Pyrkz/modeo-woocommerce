import { Metadata } from 'next';
import { AboutHero } from '@/features/aboutpage/components/AboutHero';
import { AboutFeatures } from '@/features/aboutpage/components/AboutFeatures';
import { AboutContent } from '@/features/aboutpage/components/AboutContent';
import { AboutValues } from '@/features/aboutpage/components/AboutValues';
import { AboutBusiness } from '@/features/aboutpage/components/AboutBusiness';
import { AboutTeam } from '@/features/aboutpage/components/AboutTeam';
import { AboutStats } from '@/features/aboutpage/components/AboutStats';
import { AboutCTA } from '@/features/aboutpage/components/AboutCTA';

export const metadata: Metadata = {
  title: 'O nas - Modeo.pl',
  description: 'Jesteśmy zespołem ludzi, którzy kochają to, co robią. Modeo to więcej niż firma — to miejsce, gdzie pasja spotyka się z profesjonalizmem.',
  openGraph: {
    title: 'O nas - Modeo.pl',
    description: 'Poznaj zespół Modeo - specjalistów od personalizacji i brandingu.',
    images: ['/resources/Banner-sklep.webp'],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutFeatures />
      <AboutContent />
      <AboutValues />
      <AboutBusiness />
      <AboutStats />
      <AboutTeam />
      <AboutCTA />
    </main>
  );
}