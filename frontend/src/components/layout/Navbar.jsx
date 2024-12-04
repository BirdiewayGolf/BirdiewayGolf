import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveDropdown(null); // Close any open dropdowns
  };

  const navItems = [
    {
      name: 'Tournaments',
      submenu: [
        { name: 'Junior', path: '/tournaments/junior' },
        { name: 'Birdieway Series', path: '/tournaments/amateur' },
        { name: 'Business', path: '/tournaments/business' },
      ],
    },
    {
      name: 'Standings',
      submenu: [
        { name: 'Junior', path: '/standings/junior' },
        { name: 'Birdieway Series', path: '/standings/amateur' },
        { name: 'Business', path: '/standings/business' },
      ],
    },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Sponsor', path: '/sponsor' }, // Added the Sponsor link
  ];

  return (
    <nav
      className={`fixed w-full z-50 border-2 border-gold-300 transition-all duration-500 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex items-center justify-between h-20">
          <Link
            to="/"
            className="text-2xl font-serif text-emerald-800 hover:text-emerald-700 transition-all duration-300 hover:scale-105"
          >
            BirdieWay Golf
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-emerald-50 transition-all duration-300 hover:scale-110"
          >
            <Menu
              size={28}
              className={`text-emerald-800 transform transition-transform duration-300 ${
                isOpen ? 'rotate-90' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white border-t border-gold-300`}
      >
        <div className="px-4 py-2 space-y-2">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-gold-200 last:border-0">
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => handleDropdown(item.name)}
                    className="w-full flex items-center justify-between py-3 text-gray-700 hover:text-emerald-700 transition-colors duration-300"
                  >
                    <span className="font-medium">{item.name}</span>
                    <ChevronDown
                      size={20}
                      className={`transform transition-transform duration-300 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      activeDropdown === item.name ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden bg-emerald-50`}
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        onClick={handleLinkClick}
                        className="block py-3 px-6 text-gray-600 hover:text-emerald-700 hover:bg-emerald-100 transition-all duration-300"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className="block py-3 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-300"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
