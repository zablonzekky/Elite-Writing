import React, { useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.scss';
import AppRouter from './app/router';
import { clearAuth, loadAuth, saveAuth } from './app/store';

function App() {
  const initial = useMemo(() => loadAuth() || { id: null, role: null, token: null }, []);
  const [auth, setAuth] = useState(initial);

  const handleLogin = ({ id, role, token }) => {
    const next = { id, role, token };
    setAuth(next);
    saveAuth(next);
  };

  const handleLogout = () => {
    setAuth({ id: null, role: null, token: null });
    clearAuth();
  };

  return <AppRouter auth={auth} onLogin={handleLogin} onLogout={handleLogout} />;
}

export default App;
