'use client';

import { TeamMemberCard } from '../../team/components/TeamMemberCard';
import { ResponsiveContactForm } from './ResponsiveContactForm';
import { TeamMember } from '../../team/types';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  teamMember: TeamMember;
  onFormSubmit?: (data: ContactFormData) => Promise<void>;
  isFormLoading?: boolean;
  className?: string;
  pageSource?: string;
}

export function ContactSection({ 
  teamMember, 
  onFormSubmit, 
  isFormLoading = false,
  className = '',
  pageSource = 'Nieznana strona'
}: ContactSectionProps) {
  return (
    <div className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Team Member Card */}
          <div className="order-2 lg:order-1">
            <TeamMemberCard 
              member={teamMember}
              className="h-full"
            />
          </div>
          
          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <ResponsiveContactForm 
              onSubmit={onFormSubmit}
              isLoading={isFormLoading}
              className="h-full"
              pageSource={pageSource}
            />
          </div>
        </div>
      </div>
    </div>
  );
}