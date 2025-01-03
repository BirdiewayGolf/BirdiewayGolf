import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trophy, Calendar, DollarSign, Users, Menu, X } from 'lucide-react';

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Hamburger Section */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/admin/dashboard" className="flex items-center text-xl font-bold text-emerald-800">
              BirdieWay Admin
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-emerald-800 hover:text-emerald-900 hover:bg-emerald-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/admin/tournaments"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors duration-200"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Tournaments
            </Link>
            <Link
              to="/admin/standings"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors duration-200"
            >
              <Trophy className="h-5 w-5 mr-2" />
              Standings
            </Link>
            <Link
              to="/admin/registrations"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors duration-200"
            >
              <Users className="h-5 w-5 mr-2" />
              Registrations
            </Link>
            <Link
              to="/admin/pricing"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors duration-200"
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Pricing
            </Link>
            <Link
              to="/admin/tournaments/create"
              className="flex items-center px-4 py-2 bg-emerald-100 rounded-md text-emerald-800 hover:bg-emerald-200 transition-colors duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Tournament
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/admin/tournaments"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors duration-200"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Tournaments
            </Link>
            <Link
              to="/admin/standings"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors duration-200"
            >
              <Trophy className="h-5 w-5 mr-2" />
              Standings
            </Link>
            <Link
              to="/admin/registrations"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors duration-200"
            >
              <Users className="h-5 w-5 mr-2" />
              Registrations
            </Link>
            <Link
              to="/admin/pricing"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors duration-200"
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Pricing
            </Link>
            <Link
              to="/admin/tournaments/create"
              className="flex items-center px-4 py-2 bg-emerald-100 rounded-md text-emerald-800 hover:bg-emerald-200 transition-colors duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Tournament
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
