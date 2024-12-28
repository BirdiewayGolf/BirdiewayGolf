import React from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import type { Registration } from '@/lib/types/registration';

interface RegistrationDetailsProps {
  registration: Registration;
  onClose: () => void;
}

export function RegistrationDetails({ registration, onClose }: RegistrationDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Registration Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Registration Date</h3>
              <p className="mt-1 text-sm text-gray-900">
                {format(new Date(registration.createdAt), 'PPP')}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">League Type</h3>
              <p className="mt-1 text-sm text-gray-900 capitalize">
                {registration.leagueType}
              </p>
            </div>
          </div>

          {registration.leagueType === 'business' && (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Company Details</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-900">Team: {registration.teamName}</p>
                  <p className="text-sm text-gray-900">Company: {registration.companyName}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-900">Name: {registration.contactName}</p>
                  <p className="text-sm text-gray-900">Email: {registration.email}</p>
                  <p className="text-sm text-gray-900">Phone: {registration.phone}</p>
                </div>
              </div>
            </>
          )}

          {registration.leagueType === 'junior' && (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Player Details</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-900">Name: {registration.playerName}</p>
                  <p className="text-sm text-gray-900">
                    Date of Birth: {format(new Date(registration.dateOfBirth), 'PP')}
                  </p>
                  <p className="text-sm text-gray-900">Shirt Size: {registration.shirtSize}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Parent/Guardian Information</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-900">Name: {registration.parentName}</p>
                  <p className="text-sm text-gray-900">Email: {registration.parentEmail}</p>
                  <p className="text-sm text-gray-900">Phone: {registration.parentPhone}</p>
                </div>
              </div>
            </>
          )}

          {registration.leagueType === 'longday' && (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Team Information</h3>
                <p className="mt-1 text-sm text-gray-900">Team: {registration.teamName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Players</h3>
                <div className="mt-2 space-y-4">
                  {registration.players.map((player, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">Player {index + 1}</p>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-gray-600">Name: {player.name}</p>
                        <p className="text-sm text-gray-600">Email: {player.email}</p>
                        <p className="text-sm text-gray-600">Phone: {player.phone}</p>
                        <p className="text-sm text-gray-600">Shirt Size: {player.shirtSize}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Registration Status</h3>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                ${registration.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  registration.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'}`}>
                {registration.status}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Payment Status</h3>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                ${registration.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                  registration.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'}`}>
                {registration.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}