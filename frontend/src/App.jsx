import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Sponsor from './pages/public/Sponsor';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import TournamentForm from './components/admin/TournamentForm';
import TournamentList from './pages/admin/TournamentList';
import EditTournament from './pages/admin/EditTournament';
import AdminTournamentDetails from './pages/admin/TournamentDetails';
import PublicTournamentDetails from './pages/public/TournamentDetails';
import Standings from './components/admin/StandingsEditor';
import Registrations from './components/admin/RegistrationsList';
import Tournaments from './pages/public/Tournaments';

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Layout Component to handle spacing
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[80px]">  {/* Matches navbar height exactly */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sponsor" element={<Sponsor />} />
          
          {/* Public Tournament Routes */}
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/tournaments/:category" element={<Tournaments />} />
          <Route path="/tournaments/details/:id" element={<PublicTournamentDetails />} />
          
          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          
          {/* Admin Tournament Routes */}
          <Route
            path="/admin/tournaments"
            element={
              <PrivateRoute>
                <TournamentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/tournaments/new"
            element={
              <PrivateRoute>
                <TournamentForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/tournaments/:id"
            element={
              <PrivateRoute>
                <AdminTournamentDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/tournaments/:id/edit"
            element={
              <PrivateRoute>
                <EditTournament />
              </PrivateRoute>
            }
          />
          
          {/* Other Admin Routes */}
          <Route
            path="/admin/standings"
            element={
              <PrivateRoute>
                <Standings />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/registrations"
            element={
              <PrivateRoute>
                <Registrations />
              </PrivateRoute>
            }
          />
          
          {/* Admin Redirect */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Navigate to="/admin/dashboard" replace />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;