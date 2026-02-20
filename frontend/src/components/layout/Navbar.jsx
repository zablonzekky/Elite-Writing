import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, role, onLogout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div className="container">
      <Link className="navbar-brand fw-bold" to="/">
        Elite Writing
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navMain">
        <ul className="navbar-nav ms-auto gap-lg-2">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/coaches">Coaches</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/pricing">Pricing</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/messages">Messages</Link></li>
          {isAuthenticated ? (
            <>
              {role === 'client' && <li className="nav-item"><Link className="nav-link" to="/client-dashboard">Dashboard</Link></li>}
              {role === 'coach' && <li className="nav-item"><Link className="nav-link" to="/coach-dashboard">Coach</Link></li>}
              {role === 'admin' && <li className="nav-item"><Link className="nav-link" to="/admin-dashboard">Admin</Link></li>}
              <li className="nav-item"><button className="btn btn-outline-light btn-sm mt-1" onClick={onLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="btn btn-primary btn-sm mt-1" to="/register">Get Started</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
