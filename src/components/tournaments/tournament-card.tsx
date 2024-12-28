import React, { useState } from 'react';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { LeaderboardView } from './tournament-details/leaderboard-view';
import { PairingsView } from './tournament-details/pairings-view';
import { ParticipantsView } from './tournament-details/participants-view';
import type { Tournament } from '@/lib/types/tournament';
import { cn } from '@/lib/utils';

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'leaderboard' | 'pairings' | 'participants'>('details');
  const isUpcoming = new Date(tournament.date) > new Date();
  
  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl",
      isUpcoming ? "border-[#C5A572]" : "border-gray-200"
    )}>
      <div className="p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            {isUpcoming && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0A5C36] text-white">
                Upcoming
              </span>
            )}
            
            <h3 className="text-2xl font-bold text-gray-900">{tournament.name}</h3>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2 text-[#C5A572]" />
                <span>{new Date(tournament.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-[#C5A572]" />
                <span>{tournament.location}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center px-6 py-3 border-2 border-[#C5A572] text-[#0A5C36] font-semibold rounded-lg hover:bg-[#C5A572] hover:text-white transition-colors"
            >
              Tournament Details
              <ChevronDown className={cn(
                "ml-2 h-5 w-5 transition-transform duration-200",
                isExpanded && "rotate-180"
              )} />
            </button>
          </div>
        </div>

        {/* Expandable Details */}
        <div className={cn(
          "mt-8 space-y-6 transition-all duration-300",
          isExpanded ? "block" : "hidden"
        )}>
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex space-x-8 min-w-max">
              {['details', 'leaderboard', 'pairings', 'participants'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors",
                    activeTab === tab
                      ? "border-[#0A5C36] text-[#0A5C36]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="pt-4">
            {activeTab === 'details' && (
              <div className="prose max-w-none">
                <p className="text-gray-600">{tournament.description}</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Course Details</h4>
                    <div className="space-y-2 text-gray-600">
                      <p>Type: {tournament.courseType === '18hole' ? '18 Holes' : '9 Holes'}</p>
                      <p>Par: {tournament.coursePar}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && tournament.leaderboard && (
              <LeaderboardView 
                entries={tournament.leaderboard} 
                coursePar={tournament.coursePar}
              />
            )}

            {activeTab === 'pairings' && tournament.pairings && (
              <PairingsView pairings={tournament.pairings} />
            )}

            {activeTab === 'participants' && tournament.participants && (
              <ParticipantsView participants={tournament.participants} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}