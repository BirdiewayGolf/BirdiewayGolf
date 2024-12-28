import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { BusinessRegistrationForm } from '@/components/registration/business-registration-form';
import { JuniorRegistrationForm } from '@/components/registration/junior-registration-form';
import { LongDayRegistrationForm } from '@/components/registration/longday-registration-form';

export function LeagueRegistration() {
  const { leagueType } = useParams<{ leagueType: string }>();

  const getRegistrationForm = () => {
    switch (leagueType) {
      case 'business':
        return <BusinessRegistrationForm />;
      case 'junior':
        return <JuniorRegistrationForm />;
      case 'longday':
        return <LongDayRegistrationForm />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  const getLeagueTitle = () => {
    switch (leagueType) {
      case 'business':
        return 'Business League Registration';
      case 'junior':
        return 'Junior League Registration';
      case 'longday':
        return 'Long Day Tournament Registration';
      default:
        return '';
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">{getLeagueTitle()}</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {getRegistrationForm()}
        </div>
      </div>
    </div>
  );
}