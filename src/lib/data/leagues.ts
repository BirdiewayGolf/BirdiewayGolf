import { Trophy, Users, Clock } from 'lucide-react';
import type { League } from '../types/league';

export const leagues: League[] = [
  {
    title: 'Business League',
    description: 'Experience competitive golf with a networking twist in our premier 8-tournament series. Each event combines strategic play with valuable business connections, featuring exciting prizes and premium swag.',
    features: [
      '8 competitive morning events throughout the season',
      'Flexible team composition for business networking',
      'Season standings and championship tracking',
      'Premium prizes and golf merchandise',
      'Post-round networking opportunities'
    ],
    icon: Users
  },
  {
    title: 'Junior League',
    description: 'Our junior program makes golf accessible and exciting for young players through 9-hole tournaments designed specifically for youth development. Each event features different engaging formats including scrambles, best ball, and individual play.',
    features: [
      '9-hole tournaments for manageable playing time',
      'Varied tournament formats for skill development',
      'Complimentary lunch at all events',
      'Age-appropriate divisions and yardages',
      'Structured competition in a supportive environment'
    ],
    icon: Trophy
  },
  {
    title: 'Long Day Tournament',
    description: 'Challenge yourself in our signature 36-hole marathon event, where endurance meets excellence. This 4-person scramble format pushes teams to their limits across a full day of golf.',
    features: [
      '36 holes of competitive scramble play',
      'Top 12 teams advance to sudden-death match play',
      'Premium prizes and awards',
      'Comprehensive food service throughout the day',
      'Exciting bracket-style finale to determine the champion'
    ],
    icon: Clock
  }
];