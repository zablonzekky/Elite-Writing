import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children, ...rest }) => (
  <Route
    {...rest}
    render={() => (isAuthenticated ? children : <Redirect to="/login" />)}
  />
);

export default ProtectedRoute;
