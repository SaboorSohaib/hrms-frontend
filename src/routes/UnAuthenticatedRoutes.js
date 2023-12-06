import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import FirstPage from '../pages/FirstPage';

const UnAuthenticatedRoutes = () => (
  <Routes>
    <Route path="/" element={<FirstPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
);

export default UnAuthenticatedRoutes;
