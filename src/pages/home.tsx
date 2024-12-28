// src/pages/home.tsx
import { Link } from 'react-router-dom';
import { Trophy, CircleDot, Sun } from 'lucide-react';
import { HeroSlider } from '../components/ui/hero-slider';
import { cn } from '../lib/utils';

// Import images
import fundraiserImage from '../assets/fundraiser.jpg';
import swingImage from '../assets/swing.jpg';
import golfImage from '../assets/golf.jpg';

const leagues = [
 {
   title: 'Junior League',
   description: 'An innovative development program designed for young golfers aged 8-17. Weekly sessions combine professional instruction, friendly competition, and essential golf etiquette training, creating a comprehensive pathway for junior golf excellence.',
   icon: CircleDot,
   path: '/tournaments/junior',
   image: fundraiserImage,
   color: 'from-[#0A5C36] to-[#0D7A48]',
 },
 {
   title: 'Business League',
   description: 'A premium networking opportunity that combines golf and business relationships. Our twice-monthly tournaments feature structured networking sessions, followed by strategic team play formats that foster meaningful professional connections.',
   icon: Trophy,
   path: '/tournaments/business',
   image: swingImage,
   color: 'from-[#0A5C36] to-[#0D7A48]',
 },
 {
   title: 'Long Day Tournament',
   description: 'The ultimate golf endurance experience spanning 36 holes. This unique format includes breakfast and lunch, professional scoring, and culminates in an evening awards ceremony, testing both skill and stamina throughout the day.',
   icon: Sun,
   path: '/tournaments/longday',
   image: golfImage,
   color: 'from-[#0A5C36] to-[#0D7A48]',
 },
];

export function Home() {
 return (
   <div className="flex flex-col">
     <HeroSlider />
     
     {/* Leagues Section */}
     <section className="py-16 bg-gray-50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h2 className="text-3xl font-bold text-center mb-12 text-[#0A5C36]">
           Our Leagues
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {leagues.map((league) => (
             <div
               key={league.title}
               className="group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
             >
               <div className="relative h-48 overflow-hidden">
                 <img
                   src={league.image}
                   alt={league.title}
                   className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
               </div>
               
               <div className="p-6 space-y-4">
                 <div className={cn(
                   "inline-flex items-center justify-center w-12 h-12 rounded-lg",
                   "bg-gradient-to-br",
                   league.color,
                   "transform transition-transform group-hover:scale-110"
                 )}>
                   <league.icon className="h-6 w-6 text-white" />
                 </div>
                 
                 <h3 className="text-xl font-semibold text-[#0A5C36]">{league.title}</h3>
                 <p className="text-gray-600">{league.description}</p>
                 
                 <div className="pt-4 flex items-center space-x-6">
                   <Link
                     to={league.path}
                     className="text-[#0A5C36] hover:text-[#0D7A48] font-medium transition-colors"
                   >
                     View Tournaments
                   </Link>
                   <Link
                     to="/about"
                     className="text-gray-500 hover:text-[#0A5C36] font-medium transition-colors flex items-center"
                   >
                     Learn More
                   </Link>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>
   </div>
 );
}