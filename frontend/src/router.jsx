import { createBrowserRouter, Outlet } from 'react-router-dom';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Fundraising from './pages/public/Fundraising';
import Sponsor from './pages/public/Sponsor';

// Public Components
import TournamentList from './components/public/TournamentList';
import TournamentDetails from './components/public/TournamentDetails';
import Standings from './components/public/Standings';
import BusinessRegistrationForm from './components/public/registration/BusinessRegistrationForm';
import JuniorRegistrationForm from './components/public/registration/JuniorRegistrationForm';
import LongDayRegistrationForm from './components/public/registration/LongDayRegistrationForm';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import EditTournament from './pages/admin/EditTournament';
import LoginPage from './pages/admin/LoginPage';
import RegistrationsList from './pages/admin/RegistrationsList';
import TournamentListAdmin from './pages/admin/TournamentList';

// Admin Components
import StandingsManager from './components/admin/StandingsManager';
import TournamentForm from './components/admin/TournamentForm';

// Auth Components
import PrivateRoute from './components/auth/PrivateRoute';

// 404 Page
import NotFound from './pages/NotFound';

// Root Layout
const RootLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// Router Configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      // Public Routes
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'fundraising', element: <Fundraising /> },
      { path: 'sponsor', element: <Sponsor /> },

      // Tournament Routes
      { path: 'tournaments', element: <TournamentList /> },
      { path: 'tournaments/details/:id', element: <TournamentDetails /> },
      { path: 'standings', element: <Standings /> },

      // Registration Routes
      { path: 'register/business', element: <BusinessRegistrationForm /> },
      { path: 'register/junior', element: <JuniorRegistrationForm /> },
      { path: 'register/longday', element: <LongDayRegistrationForm /> },

      // Admin Routes
      { path: 'admin/login', element: <LoginPage /> },
      { path: 'admin', element: <PrivateRoute><AdminDashboard /></PrivateRoute> },
      { path: 'admin/tournaments', element: <PrivateRoute><TournamentListAdmin /></PrivateRoute> },
      { path: 'admin/tournaments/new', element: <PrivateRoute><TournamentForm /></PrivateRoute> },
      { path: 'admin/tournaments/:id/edit', element: <PrivateRoute><EditTournament /></PrivateRoute> },
      { path: 'admin/registrations', element: <PrivateRoute><RegistrationsList /></PrivateRoute> },
      { path: 'admin/standings', element: <PrivateRoute><StandingsManager /></PrivateRoute> },
    ],
  },
  // Catch-all route for 404
  { path: '*', element: <NotFound /> },
]);

export default router;
