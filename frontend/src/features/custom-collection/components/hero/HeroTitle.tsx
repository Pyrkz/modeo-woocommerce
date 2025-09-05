import { memo } from 'react';

interface HeroTitleProps {
  title: string;
  subtitle: string;
}

export const HeroTitle = memo<HeroTitleProps>(({ title, subtitle }) => (
  <div className="flex-1 text-left">
    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
      {title}
    </h1>
    <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
      {subtitle}
    </p>
  </div>
));

HeroTitle.displayName = 'HeroTitle';