import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, loggedIn }) {
  return (
    loggedIn ? children : <Navigate to="/sign-in" replace />
  );
}

export default ProtectedRoute;
