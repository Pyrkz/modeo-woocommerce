'use client';

import { ContactCard } from './ContactCard';
import { contactInfoData } from '../data/contactData';

export function ContactInfo() {
  return (
    <section className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {contactInfoData.map((info) => (
          <ContactCard key={info.id} info={info} />
        ))}
      </div>
    </section>
  );
}