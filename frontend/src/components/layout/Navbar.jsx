import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [activeDropdown, setActiveDropdown] = useState(null); // Desktop dropdown toggle
  const [clickedDropdown, setClickedDropdown] = useState(null); // Mobile dropdown toggle
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
    setClickedDropdown(clickedDropdown === name ? null : name);
  };

  const handleLeagueClick = (path) => {
    setIsOpen(false);
    setActiveDropdown(null);
    setClickedDropdown(null);
    navigate(path); // Navigate directly to the league path
  };

  const navLinks = [
    {
      name: "Tournaments",
      dropdownItems: [
        { name: "Business League", path: "/tournaments/business" },
        { name: "Junior League", path: "/tournaments/junior" },
        { name: "Long Day Tournament", path: "/tournaments/longday" },
        { name: "Fundraisers", path: "/tournaments/fundraisers" },
      ],
    },
    {
      name: "Standings",
      dropdownItems: [
        { name: "Business League Standings", path: "/standings/business" },
        { name: "Junior League Standings", path: "/standings/junior" },
      ],
    },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    { name: "Sponsor", path: "/sponsor" },
    { name: "Fundraising", path: "/fundraising" },
  ];

  return (
    <nav className="bg-white shadow-lg border-b-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold font-serif text-emerald-800 hover:text-emerald-600 transition-all duration-300"
          >
            Birdieway Golf
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            {navLinks.map((link, index) =>
              link.dropdownItems ? (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onFocus={() => setActiveDropdown(link.name)}
                  onBlur={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 text-gray-800 hover:text-emerald-600 transition-all duration-300">
                    <span className="font-medium text-sm lg:text-base">
                      {link.name}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transform ${
                        activeDropdown === link.name ? "rotate-180" : ""
                      } transition-transform duration-300`}
                    />
                  </button>
                  {activeDropdown === link.name && (
                    <div className="absolute z-10 top-full left-0 w-56 bg-white shadow-md rounded-md py-2">
                      {link.dropdownItems.map((item, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleLeagueClick(item.path)}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-800 hover:text-emerald-600 font-medium text-sm lg:text-base transition-all duration-300"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-emerald-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {navLinks.map((link, index) => (
            <div key={index} className="px-4 py-2">
              {link.dropdownItems ? (
                <div>
                  <button
                    className="flex items-center justify-between w-full text-gray-800 hover:text-emerald-600 transition-all duration-300"
                    onClick={() => handleDropdown(link.name)}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`h-4 w-4 transform ${
                        clickedDropdown === link.name ? "rotate-180" : ""
                      } transition-transform duration-300`}
                    />
                  </button>
                  {clickedDropdown === link.name && (
                    <div className="pl-4 mt-2 space-y-2">
                      {link.dropdownItems.map((item, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleLeagueClick(item.path)}
                          className="block w-full text-left text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={link.path}
                  className="block text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
