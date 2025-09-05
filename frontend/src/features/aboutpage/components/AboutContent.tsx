'use client';

import { AboutContentProps } from '../types';
import { cn } from '@/lib/utils';

export function AboutContent({ className }: AboutContentProps) {
  return (
    <section className={cn(
      "py-20 bg-white",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <p className="text-primary font-semibold text-lg mb-4 tracking-wide">
            Krótko o nas
          </p>
          
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Współpraca, która działa
          </h2>
          
          {/* Description Text */}
          <div className="text-lg md:text-xl text-gray-600 leading-relaxed space-y-6">
            <p>
              W Modeo od samego początku wiedzieliśmy, że dobra odzież reklamowa to coś 
              więcej niż tylko znakowanie koszulek. To sposób na wyrażenie tożsamości, 
              wartości i charakteru marki. Łączymy nowoczesne technologie nadruku z 
              wysokiej jakości materiałami i luźnym, partnerskim podejściem do współpracy.
            </p>
            
            <p>
              Realizujemy projekty dla firm i marek, ale też dla klientów indywidualnych, którzy 
              chcą nosić coś własnego, wyjątkowego. Bez względu na to, czy jesteś dużą 
              firmą, czy szukasz pojedynczej personalizowanej koszulki – w Modeo znajdziesz 
              rozwiązanie skrojone pod siebie. Działamy szybko, konkretnie i z nastawieniem 
              na świetny efekt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}