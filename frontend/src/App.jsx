import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import router from './router';
// Styles
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Create a router instance with the AuthProvider and ToastContainer
  const routerWithAuth = {
    ...router,
    element: (
      <AuthProvider>
        {router.element}
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
    ),
  };

  return <RouterProvider router={routerWithAuth} />;
}

export default App;