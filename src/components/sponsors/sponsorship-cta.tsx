import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function SponsorshipCTA() {
  const navigate = useNavigate();

  return (
    <div className="py-16 bg-[#0A5C36]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Interested in Becoming a Sponsor?
        </h2>
        <p className="text-lg text-white/90 mb-8">
          Partner with BirdieWay Golf and showcase your brand to our engaged golf community.
          Contact us to discuss sponsorship opportunities and customize a package that fits your goals.
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="inline-flex items-center px-8 py-3 rounded-lg bg-white text-[#0A5C36] 
                   font-semibold hover:bg-[#C5A572] hover:text-white transition-colors group"
        >
          Contact Us About Sponsorship
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}