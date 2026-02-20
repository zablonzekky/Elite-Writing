import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin({ id: `${role}-demo`, role, token: 'demo-token' });
    history.push(role === 'client' ? '/client-dashboard' : role === 'coach' ? '/coach-dashboard' : '/admin-dashboard');
  };

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h1 className="h3 fw-bold mb-4">Sign in</h1>
      <form className="card card-body shadow-sm" onSubmit={submitHandler}>
        <label className="form-label">Email</label>
        <input className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="form-label">Password</label>
        <input type="password" className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label className="form-label">Demo role</label>
        <select className="form-select mb-3" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="client">Client</option>
          <option value="coach">Coach</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
      <p className="mt-3">New here? <Link to="/register">Create account</Link></p>
    </div>
  );
};

export default LoginPage;
