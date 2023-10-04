import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AuthenticatedRoutes from './routes/AuthenticatedRoutes';
import UnAuthenticatedRoutes from './routes/UnAuthenticatedRoutes';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      <ToastContainer position="top-right" />
      {!isAuthenticated ? (
        <UnAuthenticatedRoutes />
      ) : (
        <AuthenticatedRoutes />
      )}
    </div>
  );
};

export default App;
