import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RegisterPage = ({ onLogin }) => {
  const history = useHistory();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'client' });

  const submitHandler = (e) => {
    e.preventDefault();
    onLogin({ id: `${form.role}-new`, role: form.role, token: 'demo-token' });
    history.push(form.role === 'coach' ? '/coach-dashboard' : '/client-dashboard');
  };

  return (
    <div className="container py-5" style={{ maxWidth: 620 }}>
      <h1 className="h3 fw-bold mb-4">Create account</h1>
      <form className="card card-body shadow-sm" onSubmit={submitHandler}>
        <div className="row g-3">
          <div className="col-md-6"><input className="form-control" placeholder="First name" required onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></div>
          <div className="col-md-6"><input className="form-control" placeholder="Last name" required onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></div>
          <div className="col-12"><input className="form-control" type="email" placeholder="Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div className="col-12"><input className="form-control" type="password" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          <div className="col-12"><select className="form-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="client">Client</option><option value="coach">Coach</option></select></div>
        </div>
        <button className="btn btn-primary mt-3" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
