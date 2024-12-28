import React from 'react';
import { Mail, Instagram, Clock } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
      
      <div className="space-y-6">
        <a 
          href="mailto:birdiewaygolf@gmail.com"
          className="flex items-center group hover:text-[#0A5C36] transition-colors"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#0A5C36]/10 group-hover:bg-[#0A5C36]/20 transition-colors">
            <Mail className="h-6 w-6 text-[#0A5C36]" />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-900">Email Us</p>
            <p className="text-gray-600">birdiewaygolf@gmail.com</p>
          </div>
        </a>

        <a 
          href="https://instagram.com/birdiewaygolf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center group hover:text-[#0A5C36] transition-colors"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#0A5C36]/10 group-hover:bg-[#0A5C36]/20 transition-colors">
            <Instagram className="h-6 w-6 text-[#0A5C36]" />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-900">Follow Us</p>
            <p className="text-gray-600">@birdiewaygolf</p>
          </div>
        </a>

        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#0A5C36]/10">
            <Clock className="h-6 w-6 text-[#0A5C36]" />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-900">Response Time</p>
            <p className="text-gray-600">Within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}