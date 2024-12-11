import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(!!authService.getCurrentUser());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        if (authService.getCurrentUser()) {
          const isValid = await authService.verifyToken();
          if (!isValid) {
            handleLogout();
          }
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        if (error?.response?.status === 429) {
          // Don't logout on rate limit, just wait
          return;
        }
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const userData = await authService.login(credentials);
      if (userData) {
        setUser(userData.user);
        setIsAuthenticated(true);
        navigate('/admin');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login: handleLogin,
    logout: handleLogout
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;