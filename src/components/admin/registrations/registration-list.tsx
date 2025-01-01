import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useRegistrationStore } from '@/lib/stores/registration-store';
import { RegistrationData } from '@/lib/types/registration';

interface RegistrationDetailsProps {
  registration: RegistrationData;
  onClose: () => void;
}

function RegistrationDetails({ registration, onClose }: RegistrationDetailsProps) {
  const getRegistrationName = (reg: RegistrationData) => {
    if (reg.leagueType === 'business' || reg.leagueType === 'longday') {
      return reg.teamName;
    }
    if (reg.leagueType === 'junior') {
      return reg.playerName;
    }
    return 'Unknown';
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-900">Registration Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">×</button>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-1">{getRegistrationName(registration)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">League Type</p>
              <p className="mt-1 capitalize">{registration.leagueType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-1">{registration.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Payment Status</p>
              <p className="mt-1">{registration.paymentStatus}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Amount</p>
              <p className="mt-1">${((registration.amount || 0) / 100).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date</p>
              <p className="mt-1">
                {format(
                  typeof registration.createdAt === 'number'
                    ? new Date(registration.createdAt * 1000)
                    : new Date(registration.createdAt),
                  'PPP'
                )}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500">Registration Details</h3>
            <pre className="mt-2 whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
              {JSON.stringify(registration, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegistrationList({ onDelete }: { onDelete?: () => void }) {
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const registrations = useRegistrationStore((state) => state.registrations);
  const isLoading = useRegistrationStore((state) => state.isLoading);
  const deleteRegistration = useRegistrationStore((state) => state.deleteRegistration);
  const fetchRegistrations = useRegistrationStore((state) => state.fetchRegistrations);

  useEffect(() => {
    fetchRegistrations().catch(err => setError(err.message));
  }, [fetchRegistrations]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deleteRegistration(id);
      // Call refresh callback
      if (onDelete) onDelete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete registration');
    } finally {
      setIsDeleting(false);
    }
  };


  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Dismiss
        </button>
      </div>
    );
  }

  if (isLoading || isDeleting) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!registrations?.length) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <p className="text-gray-500">No registrations found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">League</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.map((registration) => (
              <tr key={registration.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(
                    typeof registration.createdAt === 'number'
                      ? new Date(registration.createdAt * 1000)
                      : new Date(registration.createdAt),
                    'PPP'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800">
                    {registration.leagueType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {registration.leagueType === 'junior'
                    ? (registration as any).playerName
                    : (registration as any).teamName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    registration.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : registration.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {registration.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    registration.paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : registration.paymentStatus === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {registration.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedRegistration(registration)}
                    className="text-green-800 hover:text-green-900 mr-4 font-semibold"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(registration.id)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedRegistration && (
        <RegistrationDetails
          registration={selectedRegistration}
          onClose={() => setSelectedRegistration(null)}
        />
      )}
    </div>
  );
}

export default RegistrationList;
