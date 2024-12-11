import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const slides = [
  {
    image: '/src/assets/Business.jpg',
    title: 'Business League',
    description: 'Join our premier Business League golf tournaments',
    link: '/tournaments/business',
  },
  {
    image: '/src/assets/jun.jpg',
    title: 'Junior League',
    description: 'Developing the next generation of golfers',
    link: '/tournaments/junior',
  },
  {
    image: '/src/assets/am.jpeg',
    title: 'Long Day Tournament',
    description: 'Test your endurance in our long day tournament',
    link: '/tournaments/longday',
  },
  {
    image:'/src/assets/About.jpg',
    title: 'Host a Fundraiser',
    description: 'Let us run your fundraising events.',
    link: '/pages/public/Fundraising',
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-[600px] overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 transform ${
              index === currentSlide
                ? 'opacity-100 scale-100 translate-x-0'
                : 'opacity-0 scale-95 translate-x-full'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent flex items-center">
              <div className="pl-10 md:pl-20 max-w-lg space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg tracking-wide animate-slide-in">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg text-white drop-shadow-md animate-fade-in">
                  {slide.description}
                </p>
                <a
                  href={slide.link}
                  className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-105 animate-slide-up"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-6 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`w-4 h-4 rounded-full border-2 transition-colors ${
              index === currentSlide
                ? 'bg-emerald-500 border-emerald-500'
                : 'bg-gray-200 border-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
