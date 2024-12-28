import React from 'react';
import { SponsorshipHero } from '@/components/sponsors/sponsorship-hero';
import { SponsorshipTiers } from '@/components/sponsors/sponsorship-tiers';
import { SponsorshipCTA } from '@/components/sponsors/sponsorship-cta';

export function Sponsors() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SponsorshipHero />
      <SponsorshipTiers />
      <SponsorshipCTA />
    </div>
  );
}