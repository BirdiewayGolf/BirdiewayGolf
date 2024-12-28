// src/components/ui/hero-slider/slider-controls.tsx
import React from 'react';

interface SliderControlsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function SliderControls({ total, current, onSelect }: SliderControlsProps) {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-3 h-3 rounded-full transition-all ${
            current === index
              ? 'bg-white scale-110'
              : 'bg-white/50 hover:bg-white/70'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}