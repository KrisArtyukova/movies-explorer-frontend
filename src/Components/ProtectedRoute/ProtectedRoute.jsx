import React from 'react';
import { Navigate } from 'react-router-dom';
import { MAIN_PAGE } from '../../utils/constants';

function ProtectedRoute({ children, loggedIn }) {
  return (
    loggedIn ? children : <Navigate to={MAIN_PAGE} replace />
  );
}

export default ProtectedRoute;
