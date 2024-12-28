import React from 'react';
import { Check } from 'lucide-react';

export function HostLeague() {
  const benefits = [
    'Professional tournament management',
    'Online registration and payment system',
    'Live scoring and statistics',
    'Marketing and promotion support',
    'Player communication tools',
    'Custom league website',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Host a League</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Why Host with Us?</h2>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Get Started</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Name</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                <textarea rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}