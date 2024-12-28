import React from 'react';
import { Calendar } from 'lucide-react';
import type { League } from '@/lib/types/league';

interface LeagueCardProps {
  league: League;
  isReversed?: boolean;
}

export function LeagueCard({ league }: LeagueCardProps) {
  const Icon = league.icon;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-[#C5A572]/20">
      <div className="space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#0A5C36] text-white">
          <Icon className="h-8 w-8" />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{league.title}</h2>
          <p className="text-lg text-gray-600">{league.description}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-[#C5A572]/10">
          <h3 className="text-lg font-semibold text-[#0A5C36] mb-4">
            {league.title === 'Long Day Tournament' ? 'Tournament Details' : 
             league.title === 'Junior League' ? 'Program Highlights' : 
             'Tournament Features'}
          </h3>
          <ul className="space-y-3">
            {league.features.map((feature) => (
              <li key={feature} className="flex items-start">
                <Calendar className="h-5 w-5 text-[#C5A572] mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}