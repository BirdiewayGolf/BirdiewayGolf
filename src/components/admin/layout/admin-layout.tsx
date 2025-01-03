import React from 'react';
import AdminNavbar from './navbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="max-w-7xl mx-auto py-4 px-4 md:py-6 md:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
