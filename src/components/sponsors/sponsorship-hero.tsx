import React from 'react';
import { Trophy } from 'lucide-react';

export function SponsorshipHero() {
  return (
    <div className="bg-[#0A5C36] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Trophy className="h-16 w-16 mx-auto mb-6 text-[#C5A572]" />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Partner with BirdieWay Golf
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto">
          Join our prestigious network of sponsors and connect with a passionate golf community
          across our Business, Junior, and Long Day Tournament leagues.
        </p>
      </div>
    </div>
  );
}