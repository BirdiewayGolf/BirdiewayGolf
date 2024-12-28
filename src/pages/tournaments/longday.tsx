import React from 'react';
import { useTournamentStore } from '@/lib/stores/tournament-store';
import { useLeaguePricingStore } from '@/lib/stores/league-pricing-store';
import { TournamentList } from '@/components/tournaments/tournament-list';
import { sortTournamentsByDate } from '@/lib/utils/tournament';
import { Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LongDayTournaments() {
  const getTournamentsByType = useTournamentStore((state) => state.getTournamentsByType);
  const tournaments = getTournamentsByType('longday');
  const sortedTournaments = sortTournamentsByDate(tournaments);
  const price = useLeaguePricingStore((state) => state.prices.longday);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/golf.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center mb-6">
                <Sun className="h-12 w-12 text-[#C5A572]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Long Day Tournament
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Challenge yourself in our signature 36-hole marathon event. 
                Form your 4-person team and compete in this unique dawn-to-dusk tournament format.
              </p>
              <Link
                to="/register/longday"
                className="inline-flex items-center px-8 py-3 border-2 border-[#C5A572] text-white 
                         font-semibold rounded-lg hover:bg-[#C5A572] transition-colors"
              >
                Register Your Team - ${price}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament List Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TournamentList tournaments={sortedTournaments} leagueType="longday" />
        </div>
      </div>
    </div>
  );
}