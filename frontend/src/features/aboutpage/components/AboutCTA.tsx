'use client';

import { ctaContactData } from '../data/aboutData';
import { AboutCTAProps } from '../types';
import { cn } from '@/lib/utils';

export function AboutCTA({ className }: AboutCTAProps) {
  const handleContactClick = (href?: string, type?: string) => {
    if (href) {
      if (type === 'address') {
        window.open(href, '_blank');
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <section className={cn(
      "py-20 bg-white",
      className
    )}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-lg mb-4 tracking-wide">
            Kontakt
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Gotowy na współpracę z najlepszymi?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Niezależnie od tego, czy jesteś dużą firmą, małym biznesem czy osobą prywatną — mamy rozwiązanie 
            dopasowane do Twoich potrzeb. Skontaktuj się z nami i przekonaj się, dlaczego klienci wybierają Modeo 
            od ponad 30 lat.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ctaContactData.map((contact) => {
            const IconComponent = contact.icon;
            
            return (
              <div
                key={contact.id}
                className={cn(
                  "bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100",
                  "hover:shadow-lg hover:border-primary/20 transition-all duration-300",
                  "cursor-pointer transform hover:-translate-y-1"
                )}
                onClick={() => handleContactClick(contact.href, contact.type)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleContactClick(contact.href, contact.type);
                  }
                }}
                aria-label={`${contact.title}: ${contact.value}`}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {contact.title}
                  </h3>
                  
                  {/* Value */}
                  <div className="text-primary font-bold text-lg">
                    {contact.value}
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {contact.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}