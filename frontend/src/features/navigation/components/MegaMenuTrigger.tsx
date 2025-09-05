'use client';

import { MegaMenuTriggerProps } from '../types';
import { cn } from '@/lib/utils';

const MegaMenuTrigger = ({ 
  onMouseEnter, 
  onMouseLeave, 
  onClick, 
  children, 
  className 
}: MegaMenuTriggerProps) => {
  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MegaMenuTrigger;