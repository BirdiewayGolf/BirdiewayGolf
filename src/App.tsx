import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import { Navbar } from './components/ui/navbar';
import { Footer } from './components/ui/footer';
import { ProtectedRoute } from './components/admin/protected-route';

// Public Pages
import { Home } from './pages/home';
import { About } from './pages/about';
import { Contact } from './pages/contact';
import { Sponsors } from './pages/sponsors';
import { Standings } from './pages/standings';

// Tournament Pages
import { BusinessTournaments } from './pages/tournaments/business';
import { JuniorTournaments } from './pages/tournaments/junior';
import { LongDayTournaments } from './pages/tournaments/longday';

// Registration Pages
import { BusinessRegistrationForm } from './components/registration/business-registration-form';
import { JuniorRegistrationForm } from './components/registration/junior-registration-form';
import { LongDayRegistrationForm } from './components/registration/longday-registration-form';
import { RegistrationSuccess } from './pages/registration/success';
import { RegistrationCancel } from './pages/registration/cancel';
import { RegistrationError } from './pages/registration/error';

// Admin Pages
import { AdminLogin } from './pages/admin';
import { AdminDashboard } from './pages/admin/dashboard';
import { AdminRegistrations } from './pages/admin/registrations';
import { AdminStandings } from './pages/admin/standings';
import { AdminPricing } from './pages/admin/pricing';
import { TournamentList } from './pages/admin/tournaments';
import { TournamentDetails } from './pages/admin/tournaments/[id]';
import { CreateTournament } from './pages/admin/tournaments/create';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/sponsors" element={<Layout><Sponsors /></Layout>} />
      <Route path="/standings/*" element={<Layout><Standings /></Layout>} />
      
      {/* Tournament Routes */}
      <Route path="/tournaments/business" element={<Layout><BusinessTournaments /></Layout>} />
      <Route path="/tournaments/junior" element={<Layout><JuniorTournaments /></Layout>} />
      <Route path="/tournaments/longday" element={<Layout><LongDayTournaments /></Layout>} />

      {/* Registration Routes */}
      <Route path="/register/business" element={<Layout><BusinessRegistrationForm /></Layout>} />
      <Route path="/register/junior" element={<Layout><JuniorRegistrationForm /></Layout>} />
      <Route path="/register/longday" element={<Layout><LongDayRegistrationForm /></Layout>} />
      <Route path="/registration/success" element={<Layout><RegistrationSuccess /></Layout>} />
      <Route path="/registration/cancel" element={<Layout><RegistrationCancel /></Layout>} />
      <Route path="/registration/error" element={<Layout><RegistrationError /></Layout>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/registrations"
        element={
          <ProtectedRoute>
            <AdminRegistrations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tournaments"
        element={
          <ProtectedRoute>
            <TournamentList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tournaments/create"
        element={
          <ProtectedRoute>
            <CreateTournament />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tournaments/:id"
        element={
          <ProtectedRoute>
            <TournamentDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/standings"
        element={
          <ProtectedRoute>
            <AdminStandings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/pricing"
        element={
          <ProtectedRoute>
            <AdminPricing />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
