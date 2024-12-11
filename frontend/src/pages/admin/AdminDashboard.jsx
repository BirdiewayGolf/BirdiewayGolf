import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [upcomingTournaments, setUpcomingTournaments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [tournamentsRes, registrationsRes] = await Promise.all([
        apiService.tournaments.getAll(),
        apiService.registrations.getAll(),
      ]);

      const tournaments = Array.isArray(tournamentsRes.data) ? tournamentsRes.data : [];
      const registrations = Array.isArray(registrationsRes.data) ? registrationsRes.data : [];

      setStats({
        totalTournaments: tournaments.length,
        activeTournaments: tournaments.filter((t) => t.status === 'upcoming').length,
        totalRegistrations: registrations.length,
        pendingRegistrations: registrations.filter((r) => r.status === 'pending').length,
      });

      setUpcomingTournaments(
        tournaments
          .filter((t) => t.status === 'upcoming')
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 5)
      );

      setRecentRegistrations(
        registrations
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
      );
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-emerald-600">Admin Dashboard</h1>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <Link to="/admin/tournaments" className="flex items-center text-gray-700 hover:bg-emerald-50 rounded-lg p-2">
                    Tournaments
                  </Link>
                </li>
                <li>
                  <Link to="/admin/registrations" className="flex items-center text-gray-700 hover:bg-emerald-50 rounded-lg p-2">
                    Registrations
                  </Link>
                </li>
                <li>
                  <Link to="/admin/standings" className="flex items-center text-gray-700 hover:bg-emerald-50 rounded-lg p-2">
                    Standings
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="w-full text-left text-gray-700 hover:text-red-600 p-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm p-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div>
                  <p className="text-gray-500 text-sm">Active Tournaments</p>
                  <p className="text-2xl font-bold">{stats?.activeTournaments || 0}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div>
                  <p className="text-gray-500 text-sm">Total Registrations</p>
                  <p className="text-2xl font-bold">{stats?.totalRegistrations || 0}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div>
                  <p className="text-gray-500 text-sm">Pending Registrations</p>
                  <p className="text-2xl font-bold">{stats?.pendingRegistrations || 0}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Tournaments */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Upcoming Tournaments</h3>
                <div className="space-y-4">
                  {upcomingTournaments.map((tournament) => (
                    <Link
                      key={tournament._id}
                      to={`/admin/tournaments/${tournament._id}`}
                      className="block p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{tournament.name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(tournament.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            tournament.currentPlayers >= tournament.maxPlayers
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {tournament.currentPlayers || 0}/{tournament.maxPlayers} Players
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/admin/tournaments"
                  className="mt-4 inline-block text-emerald-600 hover:text-emerald-700"
                >
                  View all tournaments →
                </Link>
              </div>

              {/* Recent Registrations */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Registrations</h3>
                <div className="space-y-4">
                  {recentRegistrations.map((registration) => (
                    <div key={registration._id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{registration.playerName}</p>
                          <p className="text-sm text-gray-500">
                            {registration.tournament?.name || 'Unknown Tournament'}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            registration.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : registration.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {registration.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/admin/registrations"
                  className="mt-4 inline-block text-emerald-600 hover:text-emerald-700"
                >
                  View all registrations →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
