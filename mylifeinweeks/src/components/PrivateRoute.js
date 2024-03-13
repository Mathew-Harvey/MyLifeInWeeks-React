// In PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or any appropriate loading indicator.
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;