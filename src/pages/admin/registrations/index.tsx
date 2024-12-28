import React from 'react';
import { AdminLayout } from '@/components/admin/layout/admin-layout';
import { RegistrationList } from '@/components/admin/registrations/registration-list';

export function AdminRegistrations() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">League Registrations</h1>
        </div>

        <RegistrationList />
      </div>
    </AdminLayout>
  );
}