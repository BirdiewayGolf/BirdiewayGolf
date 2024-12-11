import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t-4 border-emerald-600">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company Name */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide">
              Birdieway Golf
            </h1>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-right space-y-4">
            <p className="text-gray-700 text-sm md:text-base flex items-center justify-center md:justify-end">
              <Instagram className="h-6 w-6 mr-3 text-emerald-600 transition-transform hover:scale-110" />
              <a
                href="https://instagram.com/birdiewaygolf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 font-medium transition-colors"
              >
                @birdiewaygolf
              </a>
            </p>
            <p className="text-gray-700 text-sm md:text-base flex items-center justify-center md:justify-end">
              <Mail className="h-6 w-6 mr-3 text-emerald-600 transition-transform hover:scale-110" />
              <a
                href="mailto:birdiewaygolf@gmail.com"
                className="hover:text-emerald-600 font-medium transition-colors"
              >
                birdiewaygolf@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 text-center text-sm md:text-base text-gray-500">
          <p className="hover:tracking-wide transition-all">
            © {new Date().getFullYear()} Birdieway Golf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
