import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import Employees from '../pages/Employees';
import Department from '../pages/Department';
import Project from '../pages/Project';
import Report from '../pages/Report';

const isAuthenticated = false;
const AuthenticatedRoutes = () => {
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate('/');
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/reports" element={<Report />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedRoutes;
