import { createBrowserRouter } from 'react-router-dom';
import App from './App';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Fundraising from './pages/public/Fundraising';
import Sponsor from './pages/public/Sponsor';

// Public Components
import TournamentList from './components/public/TournamentList';
import TournamentDetails from './components/public/TournamentDetails';

// Registration Components
import BusinessRegistrationForm from './components/public/registration/BusinessRegistrationForm';
import JuniorRegistrationForm from './components/public/registration/JuniorRegistrationForm';
import LongDayRegistrationForm from './components/public/registration/LongDayRegistrationForm';
import FundraiserRegistrationForm from './components/public/registration/FundraiserRegistrationForm';

// Admin Components
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTournamentList from './pages/admin/TournamentList';
import EditTournament from './pages/admin/EditTournament';
import LoginPage from './pages/admin/LoginPage';
import RegistrationsList from './pages/admin/RegistrationsList';
import StandingsEditor from './components/admin/StandingsManager';
import TournamentStandingsList from './components/admin/TournamentStandingsList';

// Auth Components
import PrivateRoute from './components/auth/PrivateRoute';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        // Public Routes
        {
          path: '/',
          element: <Home />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'contact',
          element: <Contact />,
        },
        {
          path: 'fundraising',
          element: <Fundraising />,
        },
        {
          path: 'sponsor',
          element: <Sponsor />,
        },

        // Tournament Routes
        {
          path: 'tournaments',
          element: <TournamentList />,
        },
        {
          path: 'tournaments/league/:league',
          element: <TournamentList />,
        },
        {
          path: 'tournaments/details/:id',
          element: <TournamentDetails />,
        },

        // Registration Routes
        {
          path: 'register/business/:id',
          element: <BusinessRegistrationForm />,
        },
        {
          path: 'register/junior/:id',
          element: <JuniorRegistrationForm />,
        },
        {
          path: 'register/longday/:id',
          element: <LongDayRegistrationForm />,
        },
        {
          path: 'register/fundraiser/:id',
          element: <FundraiserRegistrationForm />,
        },

        // Admin Routes
        {
          path: 'admin/login',
          element: <LoginPage />,
        },
        {
          path: 'admin',
          element: (
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          ),
        },
        {
          path: 'admin/tournaments',
          element: (
            <PrivateRoute>
              <AdminTournamentList />
            </PrivateRoute>
          ),
        },
        {
          path: 'admin/tournaments/:id/edit',
          element: (
            <PrivateRoute>
              <EditTournament />
            </PrivateRoute>
          ),
        },
        {
          path: 'admin/registrations',
          element: (
            <PrivateRoute>
              <RegistrationsList />
            </PrivateRoute>
          ),
        },
        // Updated Standings Routes
        {
          path: 'admin/standings',
          element: (
            <PrivateRoute>
              <TournamentStandingsList />
            </PrivateRoute>
          ),
        },
        {
          path: 'admin/standings/:tournamentId',
          element: (
            <PrivateRoute>
              <StandingsEditor />
            </PrivateRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;