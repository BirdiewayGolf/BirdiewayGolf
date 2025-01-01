import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/layout/admin-layout';
import { Calendar, Trophy, Users, DollarSign } from 'lucide-react';
import { useTournamentStore } from '@/lib/stores/tournament-store';
import { useRegistrationStore } from '@/lib/stores/registration-store';
import { sortTournamentsByDate } from '@/lib/utils/tournament';
import type { LeagueType, PaymentStatus } from '@/lib/types/registration';

interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  type: string;
}

interface Registration {
  id: string;
  customerEmail: string;
  leagueType: LeagueType;
  payment_status?: PaymentStatus;
  amount: number;
  createdAt: number;
  registrationData?: {
    playerName?: string;
    teamName?: string;
    parentName?: string;
    email?: string;
    [key: string]: any;
  };
}

interface RevenueDetailsProps {
  registrations: Registration[];
  totalRevenue: number;
  onClose: () => void;
}

// Helper function to check if amount should be added to revenue
const shouldIncludeInRevenue = (status: PaymentStatus | undefined): boolean => {
  if (!status || status === 'pending') return true;
  return status === 'paid';
};

// Helper function to check if amount should be subtracted from revenue
const shouldSubtractFromRevenue = (status: PaymentStatus | undefined): boolean => {
  return status === 'failed' || status === 'cancelled';
};

const getPaymentStatusColor = (status: PaymentStatus | undefined): string => {
  if (!status || status === 'pending') return 'bg-yellow-100 text-yellow-800';
  if (status === 'paid') return 'bg-green-100 text-green-800';
  if (status === 'failed' || status === 'cancelled') return 'bg-red-100 text-red-800';
  return 'bg-yellow-100 text-yellow-800';
};

// Function to calculate revenue from registrations
const calculateRevenue = (registrations: Registration[]): number => {
  return registrations
    .filter(reg => reg.payment_status !== 'cancelled') // Only include non-cancelled registrations
    .reduce((total: number, reg: Registration) => {
      if (shouldIncludeInRevenue(reg.payment_status)) {
        return total + (reg.amount || 0);
      }
      return total;
    }, 0) / 100; // Convert to dollars
};

const RevenueDetails: React.FC<RevenueDetailsProps> = ({ registrations, totalRevenue, onClose }) => {
  const validRegistrations = registrations.filter(reg => !shouldSubtractFromRevenue(reg.payment_status));

  const revenueByLeague = validRegistrations.reduce((acc, reg) => {
    if (!reg.leagueType) return acc;
    acc[reg.leagueType] = (acc[reg.leagueType] || 0) + (reg.amount || 0);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Revenue Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 text-2xl">×</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-3xl font-bold text-green-800">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Total Registrations</p>
            <p className="text-3xl font-bold text-green-800">{validRegistrations.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500">Average Revenue</p>
            <p className="text-3xl font-bold text-green-800">
              ${validRegistrations.length ? (totalRevenue / validRegistrations.length).toLocaleString() : '0'}
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by League</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(revenueByLeague).map(([league, amount]) => (
                <div key={league} className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-500 capitalize">{league}</p>
                  <p className="text-2xl font-bold text-green-800">
                    ${(amount / 100).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">League</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {validRegistrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(registration.createdAt * 1000).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800">
                          {registration.leagueType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.registrationData?.playerName ||
                          registration.registrationData?.teamName ||
                          registration.customerEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        ${((registration.amount || 0) / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  const tournaments = useTournamentStore((state) => state.tournaments);
  const registrationStore = useRegistrationStore();
  const upcomingTournaments = sortTournamentsByDate(
    tournaments.filter((t: Tournament) => new Date(t.date) >= new Date())
  );
  
  const [recentRegistrations, setRecentRegistrations] = useState<Registration[]>([]);
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [showRevenueDetails, setShowRevenueDetails] = useState(false);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      await registrationStore.fetchRegistrations();
      const registrations = registrationStore.registrations
        .filter(reg => reg.status !== 'cancelled' && reg.paymentStatus !== 'cancelled')
        .map(reg => ({
          id: reg.id,
          customerEmail: reg.customerEmail || '',
          leagueType: reg.leagueType,
          payment_status: reg.paymentStatus,
          amount: reg.amount,
          createdAt: typeof reg.createdAt === 'string' ? Date.parse(reg.createdAt) / 1000 : reg.createdAt,
          registrationData: {
            playerName: 'playerName' in reg ? (reg as any).playerName : undefined,
            teamName: 'teamName' in reg ? (reg as any).teamName : undefined,
            parentName: 'parentName' in reg ? (reg as any).parentName : undefined,
            email: 'email' in reg ? (reg as any).email : undefined,
            ...reg.registrationData
          }
        })) as Registration[];
      
      const sortedRegistrations = [...registrations].sort((a, b) => 
        (b.createdAt as number) - (a.createdAt as number)
      );
      
      setAllRegistrations(sortedRegistrations);
      setRecentRegistrations(sortedRegistrations.slice(0, 3));
      setTotalRevenue(calculateRevenue(sortedRegistrations));
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    try {
      if (!window.confirm('Are you sure you want to delete this registration?')) {
        return;
      }
  
      // Call store method to delete registration
      await registrationStore.deleteRegistration(id);
      
      // Remove from all registrations
      const updatedRegistrations = allRegistrations.filter(reg => reg.id !== id);
      setAllRegistrations(updatedRegistrations);
      
      // Update recent registrations
      const updatedRecent = updatedRegistrations.slice(0, 3);
      setRecentRegistrations(updatedRecent);
      
      // Recalculate revenue immediately
      const newRevenue = calculateRevenue(updatedRegistrations);
      setTotalRevenue(newRevenue);
  
      // Force a refresh of the registrations from server
      await registrationStore.fetchRegistrations();
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/admin/tournaments" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100">
            <div className="flex items-center">
              <Calendar className="h-12 w-12 text-green-800" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Tournaments</h3>
                <p className="text-3xl font-bold text-green-800">{upcomingTournaments.length}</p>
              </div>
            </div>
          </Link>

          <Link to="/admin/standings" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100">
            <div className="flex items-center">
              <Trophy className="h-12 w-12 text-green-800" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">League Standings</h3>
                <p className="text-sm text-gray-600 mt-1">View & manage standings</p>
              </div>
            </div>
          </Link>

          <Link to="/admin/registrations" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100">
            <div className="flex items-center">
              <Users className="h-12 w-12 text-green-800" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Registrations</h3>
                <p className="text-3xl font-bold text-green-800">
                  {isLoading ? '...' : allRegistrations.length}
                </p>
              </div>
            </div>
          </Link>

          <div
            onClick={() => setShowRevenueDetails(true)}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 cursor-pointer"
          >
            <div className="flex items-center">
              <DollarSign className="h-12 w-12 text-green-800" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
                <p className="text-3xl font-bold text-green-800">
                  ${isLoading ? '...' : totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Recent Registrations</h2>
                <p className="text-sm text-gray-600">Showing latest 3 registrations</p>
              </div>
              <Link to="/admin/registrations" className="text-green-800 hover:text-green-900 font-semibold">
                View All →
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {isLoading ? (
              <div className="px-6 py-8 text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ) : recentRegistrations.length > 0 ? (
              recentRegistrations.map((registration) => (
                <div key={registration.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {registration.leagueType.charAt(0).toUpperCase() + registration.leagueType.slice(1)} League
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {registration.customerEmail} • {new Date(registration.createdAt * 1000).toLocaleDateString()}
                      </p>
                      {registration.registrationData && (
                        <p className="text-sm text-gray-600 mt-2">
                          {registration.leagueType === 'junior' && `Player: ${registration.registrationData.playerName}`}
                          {registration.leagueType === 'business' && `Team: ${registration.registrationData.teamName}`}
                          {registration.leagueType === 'longday' && 'Long Day Tournament Team'}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        getPaymentStatusColor(registration.payment_status)
                      }`}>
                        {(registration.payment_status || 'pending').replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${((registration.amount || 0) / 100).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleDeleteRegistration(registration.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <p>No recent registrations</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Tournaments</h2>
              <Link to="/admin/tournaments/create" className="text-green-800 hover:text-green-900 font-semibold">
                Create New →
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {upcomingTournaments.length > 0 ? (
              upcomingTournaments.map((tournament) => (
                <Link
                  key={tournament.id}
                  to={`/admin/tournaments/${tournament.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{tournament.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(tournament.date).toLocaleDateString()} • {tournament.location}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {tournament.type}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <p>No upcoming tournaments</p>
                <Link
                  to="/admin/tournaments/create"
                  className="text-green-800 hover:text-green-900 font-semibold inline-block mt-2"
                >
                  Create your first tournament
                </Link>
              </div>
            )}
          </div>
        </div>

        {showRevenueDetails && (
          <RevenueDetails
            registrations={allRegistrations}
            totalRevenue={totalRevenue}
            onClose={() => setShowRevenueDetails(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;