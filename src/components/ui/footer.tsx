import React from 'react';
import { Mail, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A5C36] text-white border-t-2 border-[#C5A572]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h2 className="text-2xl font-bold text-white">
            BirdieWay Golf
          </h2>
          
          <div className="flex flex-col items-center space-y-4">
            <a 
              href="mailto:birdiewaygolf@gmail.com"
              className="flex items-center hover:text-[#C5A572] transition-colors group"
            >
              <Mail className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              <span>birdiewaygolf@gmail.com</span>
            </a>
            
            <a 
              href="https://instagram.com/birdiewaygolf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-[#C5A572] transition-colors group"
            >
              <Instagram className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              <span>@birdiewaygolf</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} BirdieWay Golf. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}