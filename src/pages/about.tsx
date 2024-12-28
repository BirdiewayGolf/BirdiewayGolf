import React from 'react';
import { HeroSection } from '@/components/about/hero-section';
import { LeagueCard } from '@/components/about/league-card';
import { leagues } from '@/lib/data/leagues';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-24">
            {leagues.map((league, index) => (
              <LeagueCard 
                key={league.title} 
                league={league} 
                isReversed={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}