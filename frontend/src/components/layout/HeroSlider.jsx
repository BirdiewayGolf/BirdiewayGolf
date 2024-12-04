import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

import businessImg from '../../assets/Business.jpg';
import amateurImg from '../../assets/am.jpeg';
import juniorImg from '../../assets/jun.jpg';
import aboutImg from '../../assets/about.jpg';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: businessImg,
      title: 'Business League',
      description: 'Golf for businesses to network, compete, and enjoy a fun yet competitive atmosphere',
      buttonText: 'Business Tournaments',
      path: '/tournaments/business',
    },
    {
      image: amateurImg,
      title: 'Bridieway Series',
      description:
        'Our Long Day Challenge and Collegiate Tournament highlight the exceptional skill and competitive spirit of golfers in a high-stakes setting.',
      buttonText: 'Tournaments',
      path: '/tournaments/amateur',
    },
    {
      image: juniorImg,
      title: 'Junior League',
      description: 'Develop skills and compete with young golfers',
      buttonText: 'Junior Tournaments',
      path: '/tournaments/junior',
    },
    {
      image: aboutImg,
      title: 'About BirdieWay',
      description: 'Learn about our professional tournament platform',
      buttonText: 'Learn More',
      path: '/about',
    },
  ];

  // Automatically change slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[calc(100vh-5rem)] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />

            <div className="relative z-20 h-full flex items-center px-6 md:px-20">
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 opacity-0 animate-slideUp">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 opacity-0 animate-slideUp animation-delay-200">
                  {slide.description}
                </p>
                <Link
                  to={slide.path}
                  className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg 
                   hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105
                   opacity-0 animate-slideUp animation-delay-400"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full
         bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300
         text-white hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full
         bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300
         text-white hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
