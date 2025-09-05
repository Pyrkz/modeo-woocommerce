'use client';

import { memo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TechniqueCardProps } from '../../types/techniques';
import { TechniqueImage, TechniqueOverlay } from './card';
import { useTechniquePrefetch } from '../../hooks/useTechniquePrefetch';

const TechniqueCard = memo(({ 
  technique, 
  className = '',
  priority = false,
  style 
}: TechniqueCardProps) => {
  const { handleMouseEnter } = useTechniquePrefetch();

  const onMouseEnter = useCallback(() => {
    handleMouseEnter(technique.href);
  }, [handleMouseEnter, technique.href]);

  const router = useRouter();

  const onClick = useCallback(() => {
    // Force navigation using router
    router.push(technique.href);
  }, [technique.href, router]);

  return (
    <Link
      href={technique.href}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={style}
      className={`
        group relative block overflow-hidden
        rounded-xl sm:rounded-2xl border border-gray-200
        bg-white shadow-sm
        transition-all duration-500 ease-out
        hover:shadow-xl hover:shadow-gray-400/20
        hover:-translate-y-1 hover:border-gray-300
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        active:scale-95 active:transition-transform active:duration-75
        ${className}
      `}
      aria-label={`Przejdź do ${technique.name} - ${technique.description}`}
    >
      <TechniqueImage 
        src={technique.image}
        alt={technique.name}
        priority={priority}
      />
      
      <TechniqueOverlay name={technique.name} description={technique.description} />
    </Link>
  );
});

TechniqueCard.displayName = 'TechniqueCard';

export default TechniqueCard;