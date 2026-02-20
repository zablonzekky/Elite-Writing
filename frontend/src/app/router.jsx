import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProtectedRoute from '../components/common/ProtectedRoute';
import RoleRoute from '../components/common/RoleRoute';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ClientDashboard from '../pages/ClientDashboard';
import CoachDashboard from '../pages/CoachDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import RequestDetailsPage from '../pages/RequestDetailsPage';
import OrderPage from '../pages/OrderPage';
import MessagesPage from '../pages/MessagesPage';
import CoachesPage from '../pages/CoachesPage';
import PricingPage from '../pages/PricingPage';

const AppRouter = ({ auth, onLogin, onLogout }) => (
  <Router>
    <Navbar isAuthenticated={!!auth.token} role={auth.role} onLogout={onLogout} />
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/coaches" exact component={CoachesPage} />
      <Route path="/pricing" exact component={PricingPage} />
      <Route path="/login" exact>
        <LoginPage onLogin={onLogin} />
      </Route>
      <Route path="/register" exact>
        <RegisterPage onLogin={onLogin} />
      </Route>

      <ProtectedRoute path="/request/:id" isAuthenticated={!!auth.token}>
        <RequestDetailsPage />
      </ProtectedRoute>
      <ProtectedRoute path="/orders/:id" isAuthenticated={!!auth.token}>
        <OrderPage />
      </ProtectedRoute>
      <ProtectedRoute path="/messages" isAuthenticated={!!auth.token}>
        <MessagesPage />
      </ProtectedRoute>

      <RoleRoute path="/client-dashboard" isAuthenticated={!!auth.token} role={auth.role} allowedRoles={['client']}>
        <ClientDashboard />
      </RoleRoute>
      <RoleRoute path="/coach-dashboard" isAuthenticated={!!auth.token} role={auth.role} allowedRoles={['coach']}>
        <CoachDashboard />
      </RoleRoute>
      <RoleRoute path="/admin-dashboard" isAuthenticated={!!auth.token} role={auth.role} allowedRoles={['admin']}>
        <AdminDashboard />
      </RoleRoute>

      <Redirect to="/" />
    </Switch>
    <Footer />
  </Router>
);

export default AppRouter;
