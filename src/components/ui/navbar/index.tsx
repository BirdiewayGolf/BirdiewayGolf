import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';

const navItems = [
  {
    label: 'Tournaments',
    dropdownItems: [
      { label: 'Business League', href: '/tournaments/business' },
      { label: 'Junior League', href: '/tournaments/junior' },
      { label: 'Long Day', href: '/tournaments/longday' },
    ],
  },
  {
    label: 'Standings',
    dropdownItems: [
      { label: 'Business League', href: '/standings/business' },
      { label: 'Junior League', href: '/standings/junior' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Sponsors', href: '/sponsors' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      'border-b border-[#C5A572]',
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white',
      isOpen ? 'bg-white shadow-lg' : ''
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <span className={cn(
              "text-2xl font-bold transition-colors duration-300",
              scrolled ? "text-[#0A5C36]" : "bg-gradient-to-r from-[#0A5C36] to-[#0D7A48] bg-clip-text text-transparent"
            )}>
              BirdieWay Golf
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navItems.map((item) => (
              item.dropdownItems ? (
                <div
                  key={item.label}
                  className="relative group isolate"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:text-[#0A5C36] transition-colors">
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className={cn(
                    'absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 transition-all duration-200',
                    'transform origin-top z-50',
                    'border border-gray-200',
                    activeDropdown === item.label ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
                  )}>
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.href}
                        to={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0A5C36]/10 hover:text-[#0A5C36] transition-colors bg-white"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href || '#'}
                  className="px-4 py-2 text-gray-700 hover:text-[#0A5C36] transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors duration-300",
              isOpen ? "text-[#C5A572] bg-[#0A5C36]" : "text-[#0A5C36] hover:bg-[#0A5C36]/10"
            )}
          >
            {isOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        'fixed inset-0 z-40 lg:hidden',
        isOpen ? 'visible' : 'invisible'
      )}>
        {/* Backdrop */}
        <div 
          className={cn(
            'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
            isOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu panel */}
        <div className={cn(
          'absolute right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out',
          'flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <div className="flex flex-col py-6 bg-white flex-1">
            <div className="px-4 space-y-1 bg-white">
              {navItems.map((item) => (
                <div key={item.label} className="bg-white">
                  {item.dropdownItems ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:text-[#0A5C36] hover:bg-[#0A5C36]/10 rounded-md transition-all duration-300 bg-white"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          activeDropdown === item.label ? 'rotate-180' : ''
                        )} />
                      </button>
                      <div className={cn(
                        'pl-4 space-y-1 overflow-hidden transition-all duration-300',
                        'bg-white rounded-md',
                        activeDropdown === item.label ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      )}>
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            to={dropdownItem.href}
                            className="block px-3 py-2 text-gray-700 hover:text-[#0A5C36] hover:bg-[#0A5C36]/10 rounded-md transition-all duration-300 bg-white"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.href || '#'}
                      className="block px-3 py-2 text-gray-700 hover:text-[#0A5C36] hover:bg-[#0A5C36]/10 rounded-md transition-all duration-300 bg-white"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}