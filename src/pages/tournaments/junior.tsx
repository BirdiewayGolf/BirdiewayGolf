import React from 'react';
import { useTournamentStore } from '@/lib/stores/tournament-store';
import { TournamentList } from '@/components/tournaments/tournament-list';
import { sortTournamentsByDate } from '@/lib/utils/tournament';
import { CircleDot } from 'lucide-react';
import { Link } from 'react-router-dom';

export function JuniorTournaments() {
  const getTournamentsByType = useTournamentStore((state) => state.getTournamentsByType);
  const tournaments = getTournamentsByType('junior');
  const sortedTournaments = sortTournamentsByDate(tournaments);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/fundraiser.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center mb-6">
                <CircleDot className="h-12 w-12 text-[#C5A572]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Junior Golf League Series
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join our 8-tournament series designed specifically for young golfers. 
                Build confidence, make friends, and develop your game in a supportive environment.
              </p>
              <Link
                to="/register/junior"
                className="inline-flex items-center px-8 py-3 border-2 border-[#C5A572] text-white 
                         font-semibold rounded-lg hover:bg-[#C5A572] transition-colors"
              >
                Register for Tournament Series - $500
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament List Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TournamentList tournaments={sortedTournaments} leagueType="junior" />
        </div>
      </div>
    </div>
  );
}