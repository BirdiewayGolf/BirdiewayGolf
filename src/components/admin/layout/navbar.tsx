import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trophy, Calendar, DollarSign, Users } from 'lucide-react';

export default function AdminNavbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/admin/dashboard" className="flex items-center text-xl font-bold text-green-600">
              BirdieWay Admin
            </Link>
            
            <div className="ml-10 flex items-center space-x-6">
              <Link
                to="/admin/tournaments"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Tournaments
              </Link>
              <Link
                to="/admin/standings"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600"
              >
                <Trophy className="h-5 w-5 mr-2" />
                Standings
              </Link>
              <Link
                to="/admin/registrations"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600"
              >
                <Users className="h-5 w-5 mr-2" />
                Registrations
              </Link>
              <Link
                to="/admin/pricing"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600"
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Pricing
              </Link>
              <Link
                to="/admin/tournaments/create"
                className="flex items-center px-4 py-2 bg-green-50 rounded-md text-green-700 hover:bg-green-100"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Tournament
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}