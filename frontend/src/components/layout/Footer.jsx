// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';
import './Footer.css';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    tournaments: [
      { name: 'Business League', path: '/tournaments/business' },
      { name: 'Amateur League', path: '/tournaments/amateur' },
      { name: 'Junior League', path: '/tournaments/junior' }
    ],
    standings: [
      { name: 'Business Standings', path: '/standings/business' },
      { name: 'Amateur Standings', path: '/standings/amateur' },
      { name: 'Junior Standings', path: '/standings/junior' }
    ],
    company: [
      
    ]
  };

  return (
    <footer className="bg-white border-t border-gold-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-serif text-emerald-800">
              BirdieWay
            </Link>
            <p className="text-gray-600 text-sm">
              The Ultimate Golf League
            </p>
            <a 
              href="https://instagram.com/birdieway" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-600 hover:text-emerald-700 transition-colors"
            >
              <Instagram size={20} className="mr-2" />
              @birdiewaygolf
            </a>
          </div>

          {/* Tournaments */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Tournaments</h3>
            <ul className="space-y-2">
              {links.tournaments.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-emerald-700 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standings */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Standings</h3>
            <ul className="space-y-2">
              {links.standings.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-emerald-700 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:birdieway@gmail.com"
                  className="inline-flex items-center text-gray-600 hover:text-emerald-700 transition-colors"
                >
                  <Mail size={16} className="mr-2" />
                  birdiewaygolf@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:8011111111"
                  className="inline-flex items-center text-gray-600 hover:text-emerald-700 transition-colors"
                >
                  <Phone size={16} className="mr-2" />
                  (801) 111-1111
                </a>
              </li>
              {links.company.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-emerald-700 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} BirdieWay Golf. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 space-x-6">
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;