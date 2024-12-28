import React from 'react';
import { Mail } from 'lucide-react';

export function ContactHero() {
  return (
    <div className="bg-[#0A5C36] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Mail className="h-16 w-16 mx-auto mb-6 text-[#C5A572]" />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Get in Touch
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto">
          Have questions about our tournaments or sponsorship opportunities? 
          We'd love to hear from you.
        </p>
      </div>
    </div>
  );
}