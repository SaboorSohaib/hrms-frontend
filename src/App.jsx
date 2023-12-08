import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AuthenticatedRoutes from './routes/AuthenticatedRoutes';
import UnAuthenticatedRoutes from './routes/UnAuthenticatedRoutes';
import { NavbarProvider } from './components/NavbarContext';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="h-full">
      <NavbarProvider>
        {/* All routes should be inside NavbarProvider */}
        {isAuthenticated ? (
          <AuthenticatedRoutes />
        ) : (
          <UnAuthenticatedRoutes />
        )}
        {/* Include your ToastContainer here or anywhere else in the NavbarProvider */}
        <ToastContainer position="top-right" />
      </NavbarProvider>
    </div>
  );
};

export default App;
