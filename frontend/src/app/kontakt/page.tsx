import { Metadata } from 'next';
import { ContactHero } from '@/features/contact/components/ContactHero';
import { ContactInfo } from '@/features/contact/components/ContactInfo';
import { ContactInfoSection } from '@/features/contact/components/ContactInfoSection';
import { ContactForm } from '@/features/contact/components/ContactForm';
import { ContactAchievements } from '@/features/contact/components/ContactAchievements';

export const metadata: Metadata = {
  title: 'Kontakt - Modeo.pl',
  description: 'Skontaktuj się z nami - masz pytania o nasze usługi? Potrzebujesz wyceny? Napisz, zadzwoń lub wpadnij do nas.',
  openGraph: {
    title: 'Kontakt - Modeo.pl',
    description: 'Skontaktuj się z nami - masz pytania o nasze usługi? Potrzebujesz wyceny?',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <ContactHero />
        
        {/* Contact Info Cards */}
        <ContactInfo />
        
        {/* Main Contact Section - Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mt-20">
          {/* Left column - Contact Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100">
            <ContactForm pageSource="Strona kontaktowa" />
          </div>
          
          {/* Right column - Contact Information */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100">
            <ContactInfoSection />
          </div>
        </div>
        
        {/* Contact Achievements Section */}
        <div className="mt-20">
          <ContactAchievements />
        </div>
      </div>
    </main>
  );
}