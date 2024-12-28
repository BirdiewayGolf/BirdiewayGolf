import React from 'react';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactInfo } from '@/components/contact/contact-info';

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContactHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ContactInfo />
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}