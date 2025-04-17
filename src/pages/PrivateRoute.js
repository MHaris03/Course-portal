import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ loggedIn, redirectTo = '/' }) => {
  return loggedIn ? <Outlet /> : <Navigate to={redirectTo} state={{ needLogin: true }} replace />;
};

export default PrivateRoute;
