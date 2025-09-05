'use client';

import { useState } from 'react';
import { TeamMemberCard } from '@/features/team/components/TeamMemberCard';
// ResponsiveContactForm is used in ContactSection, no direct import needed
import { ContactSection } from '@/features/contact/components/ContactSection';
import { teamMembers, getTeamMemberByName } from '@/features/team/data/teamMembers';
import { ContactFormData } from '@/features/contact/types';
import { submitContactForm } from '@/features/contact/utils/contactSubmission';

/**
 * Example component showing how to use the new team member components
 * 
 * Usage examples:
 * 
 * 1. Simple team member card:
 * <TeamMemberCard member={piotrZietal} />
 * 
 * 2. Contact section with team member and form:
 * <ContactSection teamMember={piotrZietal} onFormSubmit={handleSubmit} />
 * 
 * 3. Dynamic team member selection:
 * <TeamContactExample />
 */

export function TeamContactExample() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Get Piotr Ziętal as default - you can change this to any team member
  const piotrZietal = getTeamMemberByName('Piotr Ziętal')!;

  const handleFormSubmit = async (formData: ContactFormData) => {
    setIsLoading(true);
    try {
      await submitContactForm(formData);
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Example 1: Simple Team Member Card */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Przykład 1: Karta członka zespołu</h2>
        <div className="max-w-md mx-auto">
          <TeamMemberCard member={piotrZietal} />
        </div>
      </div>

      {/* Example 2: Contact Section with Team Member */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Przykład 2: Sekcja kontaktu z członkiem zespołu</h2>
        <ContactSection 
          teamMember={piotrZietal}
          onFormSubmit={handleFormSubmit}
          isFormLoading={isLoading}
          pageSource="Przykład kontaktu z zespołem"
        />
      </div>

      {/* Example 3: All Team Members Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Przykład 3: Cały zespół</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard 
              key={member.id} 
              member={member}
              className="transform hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Individual component exports for easier integration
export function PiotrZietalContact() {
  const [isLoading, setIsLoading] = useState(false);
  const piotrZietal = getTeamMemberByName('Piotr Ziętal')!;

  const handleFormSubmit = async (formData: ContactFormData) => {
    setIsLoading(true);
    try {
      await submitContactForm(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContactSection 
      teamMember={piotrZietal}
      onFormSubmit={handleFormSubmit}
      isFormLoading={isLoading}
      pageSource="Kontakt z Piotrem Ziętalem"
    />
  );
}