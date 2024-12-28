// src/components/ui/hero-slider/slide.tsx
import React from 'react';
import { cn } from '../../../lib/utils';

interface SlideProps {
  title: string;
  description: string;
  backgroundImage: string;
  path: string;
  ctaText: string;
  isActive: boolean;
  index?: number;
  onNavigate: (path: string) => void;
}

export function Slide({
  title,
  description,
  backgroundImage,
  path,
  ctaText,
  isActive,
  onNavigate
}: SlideProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 transition-opacity duration-1000',
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      )}
    >
      {/* Background Image with Subtle Zoom */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center transform transition-transform duration-[8000ms] ease-out",
          isActive && "scale-105"
        )}
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 
            className={cn(
              "text-5xl md:text-6xl font-bold text-white mb-6",
              "transform transition-all duration-1000 delay-200",
              isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            {title}
          </h1>
          
          <p 
            className={cn(
              "text-xl md:text-2xl text-white/90 mb-8",
              "transform transition-all duration-1000 delay-400",
              isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            {description}
          </p>
          
          <button
            onClick={() => onNavigate(path)}
            className={cn(
              "inline-flex items-center px-8 py-3 rounded-lg text-lg font-semibold",
              "border-2 border-[#C5A572] text-white",
              "bg-transparent hover:bg-[#C5A572] transition-all duration-300",
              "hover:scale-105 hover:shadow-lg",
              "transform duration-1000 delay-600",
              isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}