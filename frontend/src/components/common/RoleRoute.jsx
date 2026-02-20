import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const RoleRoute = ({ isAuthenticated, role, allowedRoles, children, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      isAuthenticated && allowedRoles.includes(role) ? children : <Redirect to="/" />
    }
  />
);

export default RoleRoute;
