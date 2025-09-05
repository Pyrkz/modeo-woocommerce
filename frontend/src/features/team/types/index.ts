export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  email: string;
  phone: string;
  image: string;
  imageHover?: string;
}

export interface TeamMemberCardProps {
  member: TeamMember;
  className?: string;
}