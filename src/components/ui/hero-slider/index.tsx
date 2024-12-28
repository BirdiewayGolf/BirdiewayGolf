// src/components/ui/hero-slider/index.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Slide } from './slide';
import { cn } from '@/lib/utils';

// Import images properly
import juniorImage from '../../../assets/junior.jpg';
import businessImage from '../../../assets/business.jpg';
import longdayImage from '../../../assets/longday.jpg';

const slides = [
  {
    title: 'Junior League',
    description: 'A fun introduction to golf with exciting tournament formats and team events, designed to spark a lifelong passion for the game',
    backgroundImage: juniorImage,
    path: '/tournaments/junior',
    ctaText: 'View Tournaments',
  },
  {
    title: 'Business League',
    description: 'Elevate your networking on the course with competitive rounds and social events, creating valuable connections in a relaxed business environment',
    backgroundImage: businessImage,
    path: '/tournaments/business',
    ctaText: 'View Tournaments',
  },
  {
    title: 'Long Day Tournament',
    description: 'Challenge yourself in our signature sunrise-to-sunset event, where passion for the game meets pure golf immersion',
    backgroundImage: longdayImage,
    path: '/tournaments/longday',
    ctaText: 'View Tournaments',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentSlide((current) => (current + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <section
      className="relative h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <Slide
          key={slide.title}
          {...slide}
          isActive={currentSlide === index}
          index={index}
          onNavigate={handleNavigate}
        />
      ))}

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={handlePrevious}
          className="ml-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={handleNext}
          className="mr-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index
                ? "bg-[#C5A572] scale-125"
                : "bg-white/50 hover:bg-[#C5A572]/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}