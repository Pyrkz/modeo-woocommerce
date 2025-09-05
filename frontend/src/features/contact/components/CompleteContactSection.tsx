'use client';

import { useState } from 'react';
import { ContactSection } from './ContactSection';
import { SectionHeader } from './sections/SectionHeader';
import { ContactFormData } from '../types';
import { TeamMember } from '../../team/types';
import { submitContactForm } from '../utils/contactSubmission';

interface CompleteContactSectionProps {
  teamMember: TeamMember;
  tagline?: string;
  title: string;
  description?: string;
  onFormSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
  backgroundColor?: 'white' | 'gray' | 'transparent';
  pageSource?: string;
}

export function CompleteContactSection({
  teamMember,
  tagline,
  title,
  description,
  onFormSubmit,
  className = '',
  backgroundColor = 'white',
  pageSource = 'Nieznana strona'
}: CompleteContactSectionProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (formData: ContactFormData) => {
    setIsLoading(true);
    try {
      if (onFormSubmit) {
        await onFormSubmit(formData);
      } else {
        // Default submission with team member context
        await submitContactForm({
          ...formData,
          assignedTo: teamMember.email,
          teamMember: teamMember.name
        } as ContactFormData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getBackgroundClass = () => {
    switch (backgroundColor) {
      case 'gray':
        return 'bg-gray-50';
      case 'transparent':
        return 'bg-transparent';
      default:
        return 'bg-white';
    }
  };

  return (
    <section id="kontakt" className={`py-16 sm:py-20 lg:py-24 ${getBackgroundClass()} ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          tagline={tagline}
          title={title}
          description={description}
        />
        
        {/* Contact Section with Team Member and Form */}
        <ContactSection
          teamMember={teamMember}
          onFormSubmit={handleFormSubmit}
          isFormLoading={isLoading}
          className="bg-transparent"
          pageSource={pageSource}
        />
      </div>
    </section>
  );
}