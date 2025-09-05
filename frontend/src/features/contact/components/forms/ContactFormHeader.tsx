'use client';

import { memo } from 'react';

interface ContactFormHeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export const ContactFormHeader = memo(({ 
  title = "Zadaj pytanie",
  subtitle = "Wypełnij formularz", 
  description = "Wypełnij poniższy formularz, aby wysłać nam wiadomość. Odpowiemy na Twoje pytania jak najszybciej jak to możliwe :)",
  className = '' 
}: ContactFormHeaderProps) => {
  return (
    <div className={`mb-6 sm:mb-8 ${className}`}>
      <div className="text-xs sm:text-sm text-red-600 font-semibold mb-2 tracking-wider uppercase">
        {title}
      </div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
        {subtitle}
      </h2>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
});

ContactFormHeader.displayName = 'ContactFormHeader';