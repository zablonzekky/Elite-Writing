import React, { useContext, useEffect, useState } from "react";
<img src="/logo.png" alt="Logo" />

import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from "../context/auth-context";

const Header = () => {
  const [user, setUser] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const history = useHistory();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.userId) {
      fetch(`http://localhost:5000/user/${auth.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    }
  }, [auth.userId]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
  };

  return (
    <header
      className={`${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}
      style={{ marginTop: 0, paddingTop: '10px' }}
    >
      <nav
        className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} container py-2`}
      >
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </NavLink>

        <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Services">Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/About">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Pricing">FAQs</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user && <span className="fw-bold">{user.name}</span>}
            {!auth.isLoggedIn ? (
              <>
                <NavLink className="btn btn-outline-primary" to="/login">Login</NavLink>
                <NavLink className="btn btn-primary" to="/signup">Sign Up</NavLink>
              </>
            ) : (
              <NavLink className="btn btn-danger" to="/" onClick={auth.logout}>Logout</NavLink>
            )}
            <button className="btn btn-secondary ms-2" onClick={toggleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-2"> {/* Reduced margin-top */}
        <p className="lead mb-2">
          RACHAEL, freelancer – Upgrade your cv to meet ATS compliance and optimize Social media presence for your Business        </p>
      </div>
    </header>
  );
};

export default Header;
