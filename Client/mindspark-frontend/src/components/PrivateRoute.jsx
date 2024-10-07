// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Check for authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check for role authorization
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // If authenticated and authorized, render the child components
  return children;
};

export default PrivateRoute;
