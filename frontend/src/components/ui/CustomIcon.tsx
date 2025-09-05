'use client';

import Image from 'next/image';

interface CustomIconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const CustomIcon = ({ 
  src, 
  alt, 
  width = 20, 
  height = 20, 
  className = '' 
}: CustomIconProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={false}
    />
  );
};

export default CustomIcon;