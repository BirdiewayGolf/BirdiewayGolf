import React from 'react';
import { AdminLayout } from '@/components/admin/layout/admin-layout';
import { RegistrationList } from '@/components/admin/registrations/registration-list';
import { useRegistrationStore } from '@/lib/stores/registration-store';

export function AdminRegistrations() {
  const fetchRegistrations = useRegistrationStore((state) => state.fetchRegistrations);
  const [key, setKey] = React.useState(0); // Add this line

  React.useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations, key]); // Add key to dependencies

  // Add a refresh function
  const handleRefresh = () => {
    setKey(prev => prev + 1);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">League Registrations</h1>
        </div>
        <RegistrationList onDelete={handleRefresh} />
      </div>
    </AdminLayout>
  );
}