import React, { useState } from 'react';
import { format } from 'date-fns';
import { useRegistrationStore } from '@/lib/stores/registration-store';
import { RegistrationDetails } from './registration-details';
import type { Registration } from '@/lib/types/registration';

export function RegistrationList() {
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const registrations = useRegistrationStore((state) => state.registrations);
  const deleteRegistration = useRegistrationStore((state) => state.deleteRegistration);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      deleteRegistration(id);
    }
  };

  if (registrations.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">No registrations found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                League
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.map((registration) => (
              <tr key={registration.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(new Date(registration.createdAt), 'PPP')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800">
                    {registration.leagueType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {'teamName' in registration ? registration.teamName : registration.playerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${registration.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      registration.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {registration.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${registration.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                      registration.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {registration.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedRegistration(registration)}
                    className="text-green-600 hover:text-green-900 mr-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(registration.id)}
                    className="text-red-600 hover:text-red-900"
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