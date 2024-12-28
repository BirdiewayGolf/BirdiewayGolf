import { useAuth } from '@/lib/auth';
import { AdminLoginForm } from '@/components/admin/login-form';
import { Navigate } from 'react-router-dom';

export function AdminLogin() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <AdminLoginForm />;
}