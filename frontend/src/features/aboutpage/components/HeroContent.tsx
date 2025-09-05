import { HeroContentProps } from '../types';

export function HeroContent({ 
  greeting = "Cześć", 
  title, 
  description 
}: HeroContentProps) {
  return (
    <div className="relative z-10 container mx-auto px-4">
      <div className="max-w-2xl animate-fade-in">
        {/* Greeting */}
        <p className="text-primary font-semibold text-lg mb-4 tracking-wide opacity-90 transform translate-y-0">
          {greeting}
        </p>
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          {title}
        </h1>
        
        {/* Description */}
        <p className="text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-light">
          {description}
        </p>
      </div>
    </div>
  );
}