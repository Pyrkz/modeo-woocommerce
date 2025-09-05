import Link from 'next/link';
import { FooterSection as FooterSectionType } from '../types';

interface FooterSectionProps {
  section: FooterSectionType;
}

const FooterSection = ({ section }: FooterSectionProps) => {
  return (
    <div>
      <h4 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-6">
        {section.title}
      </h4>
      <nav className="space-y-3">
        {section.links.map((link) => (
          <Link 
            key={link.href}
            href={link.href}
            className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline"
            {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FooterSection;