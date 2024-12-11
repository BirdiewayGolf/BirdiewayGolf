import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Sponsor from './pages/public/Sponsor';
import Fundraising from './pages/public/Fundraising';
import TournamentList from './components/public/TournamentList';
import TournamentDetails from './components/public/TournamentDetails';
import Standings from './components/public/Standings';

// Registration Components
import BusinessRegistrationForm from './components/public/registration/BusinessRegistrationForm';
import JuniorRegistrationForm from './components/public/registration/JuniorRegistrationForm';

// Admin Pages and Components
import LoginPage from './pages/admin/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTournamentList from './pages/admin/TournamentList';
import EditTournament from './pages/admin/EditTournament';
import AdminTournamentDetails from './components/admin/TournamentDetails';
import RegistrationsList from './pages/admin/RegistrationsList';
import StandingsManager from './components/admin/StandingsManager';

// Styles
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/fundraising" element={<Fundraising />} />

          {/* Tournament and Standings Routes */}
          <Route path="/tournaments" element={<TournamentList />} />
          <Route path="/tournaments/details/:id" element={<TournamentDetails />} />
          <Route path="/tournaments/:league" element={<TournamentList />} />
          <Route path="/standings/:league" element={<Standings />} />

          {/* Registration Routes */}
          <Route path="/register/business/:id" element={<BusinessRegistrationForm />} />
          <Route path="/register/junior/:id" element={<JuniorRegistrationForm />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/tournaments"
            element={
              <PrivateRoute>
                <AdminTournamentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/tournaments/new"
            element={
              <PrivateRoute>
                <EditTournament />
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
          <Route
            path="/admin/tournaments/:id"
            element={
              <PrivateRoute>
                <AdminTournamentDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/registrations"
            element={
              <PrivateRoute>
                <RegistrationsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/standings"
            element={
              <PrivateRoute>
                <StandingsManager />
              </PrivateRoute>
            }
          />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </Router>
  );
}

export default App;