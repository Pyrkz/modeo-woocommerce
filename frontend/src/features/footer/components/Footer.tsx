import Link from 'next/link';
import { FooterProps } from '../types';
import { footerSections, legalLinks } from '../data/footerSections';
import FooterSection from './FooterSection';
import PaymentMethods from './PaymentMethods';
import SocialMedia from './SocialMedia';

const Footer = ({ className = '', showSections = true }: FooterProps) => {
  if (showSections) {
    return (
      <footer className={`bg-gray-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {footerSections.map((section) => (
                <FooterSection key={section.title} section={section} />
              ))}
            </div>
          </div>

          {/* Payment Methods and Social Media */}
          <div className="py-8 border-t border-gray-200">
            <div className="flex flex-col items-center gap-6">
              <PaymentMethods />
              <SocialMedia />
            </div>
          </div>

          {/* Bottom Legal Links and Copyright */}
          <div className="border-t border-gray-200 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 order-2 lg:order-1">
                © 2025 Modeo.pl
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 text-sm text-gray-500 order-1 lg:order-2">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-gray-700 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
                <span className="text-gray-400">Polska</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Simple Footer (fallback)
  return (
    <footer className={`bg-gray-50 border-t ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-600">© 2025 Modeo.pl Wszystkie prawa zastrzeżone.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
              Strona główna
            </Link>
            <Link href="/sklep" className="text-gray-600 hover:text-primary transition-colors">
              Sklep
            </Link>
            <Link href="/koszyk" className="text-gray-600 hover:text-primary transition-colors">
              Koszyk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;