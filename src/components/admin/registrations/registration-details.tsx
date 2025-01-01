import React from 'react';
import { format } from 'date-fns';

interface RegistrationDataViewProps {
  data: {
    createdAt: string;
    leagueType: string;
    paymentStatus: string;
    status: string;
    teamName?: string;
    companyName?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    playerName?: string;
    dateOfBirth?: string;
    shirtSize?: string;
    parentName?: string;
    parentEmail?: string;
    parentPhone?: string;
    players?: Array<{
      name?: string;
      email?: string;
      phone?: string;
      shirtSize?: string;
    }>;
  };
}

const RegistrationDataView: React.FC<RegistrationDataViewProps> = ({ data }) => {
  const renderStatusBadges = () => (
    <div className="col-span-2 mb-4 flex items-center space-x-2">
      <span className={`px-3 py-1 rounded-full text-sm font-semibold
        ${data.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
          data.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'}`}>
        Payment: {data.paymentStatus}
      </span>
      <span className={`px-3 py-1 rounded-full text-sm font-semibold
        ${data.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : 
          data.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-gray-100 text-gray-800'}`}>
        Status: {data.status}
      </span>
    </div>
  );

  const renderCommonDetails = () => (
    <>
      <div className="border-b pb-3">
        <h3 className="text-base font-semibold text-gray-700">Registration Date</h3>
        <p className="mt-1 text-base text-gray-900">
          {format(new Date(data.createdAt), 'PPP')}
        </p>
      </div>
      <div className="border-b pb-3">
        <h3 className="text-base font-semibold text-gray-700">League Type</h3>
        <p className="mt-1 text-base text-gray-900 capitalize">
          {data.leagueType}
        </p>
      </div>
    </>
  );

  const renderLeagueDetails = () => {
    switch (data.leagueType) {
      case 'business':
        return (
          <>
            <div className="col-span-2 border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Company Details</h3>
              <div className="space-y-2">
                <p className="text-base text-gray-700">Team: <span className="font-medium">{data.teamName}</span></p>
                <p className="text-base text-gray-700">Company: <span className="font-medium">{data.companyName}</span></p>
              </div>
            </div>
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <p className="text-base text-gray-700">Name: <span className="font-medium">{data.contactName}</span></p>
                <p className="text-base text-gray-700">Email: <span className="font-medium">{data.email}</span></p>
                <p className="text-base text-gray-700">Phone: <span className="font-medium">{data.phone}</span></p>
              </div>
            </div>
          </>
        );

      case 'junior':
        return (
          <>
            <div className="col-span-2 md:col-span-1 border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Player Details</h3>
              <div className="space-y-2">
                <p className="text-base text-gray-700">Name: <span className="font-medium">{data.playerName}</span></p>
                <p className="text-base text-gray-700">
                  Date of Birth: <span className="font-medium">{data.dateOfBirth ? format(new Date(data.dateOfBirth), 'PP') : 'N/A'}</span>
                </p>
                <p className="text-base text-gray-700">Shirt Size: <span className="font-medium">{data.shirtSize}</span></p>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Parent/Guardian Information</h3>
              <div className="space-y-2">
                <p className="text-base text-gray-700">Name: <span className="font-medium">{data.parentName}</span></p>
                <p className="text-base text-gray-700">Email: <span className="font-medium">{data.parentEmail}</span></p>
                <p className="text-base text-gray-700">Phone: <span className="font-medium">{data.parentPhone}</span></p>
              </div>
            </div>
          </>
        );

      case 'longday':
        return (
          <>
            <div className="col-span-2 border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Team Information</h3>
              <p className="text-base text-gray-700">Team: <span className="font-medium">{data.teamName}</span></p>
            </div>
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Players</h3>
              <div className="space-y-4">
                {(data.players || []).map((player, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-base font-semibold text-gray-800 mb-2">Player {index + 1}</p>
                    <div className="space-y-2">
                      <p className="text-base text-gray-700">Name: <span className="font-medium">{player.name}</span></p>
                      <p className="text-base text-gray-700">Email: <span className="font-medium">{player.email}</span></p>
                      <p className="text-base text-gray-700">Phone: <span className="font-medium">{player.phone}</span></p>
                      <p className="text-base text-gray-700">Shirt Size: <span className="font-medium">{player.shirtSize}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {renderStatusBadges()}
        {renderCommonDetails()}
        {renderLeagueDetails()}
      </div>
    </div>
  );
};

export default RegistrationDataView;
