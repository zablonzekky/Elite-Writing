import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home/Home';
import Header from './shared/header/Header';
import Auth from './pages/Auth/Auth';
import Delete from './pages/Delete/Delete';
import View from './pages/View/View';
import Services from './pages/Services/Services';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Pricing from './pages/Pricing/Pricing';
import { AuthContext } from './shared/context/auth-context';
import UserReviews from './pages/Home/components/UserReviews';

function App() {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      login(user.userId, user.token);
    }
  }, [login]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>
      <Router>
        <main>
          <Switch>
            {/* Public routes */}
            <Route path="/login" exact>
              <Auth login />
            </Route>
            <Route path="/signup" exact>
              <Auth signup />
            </Route>
            <Route path="/reviews" exact>
              <>
                <Header />
                <UserReviews />
              </>
            </Route>

            {/* Routes for non-logged-in users */}
            {!token && (
              <>
                <Route path="/view/:pid" exact>
                  <>
                    <Header minimal />
                    <View />
                  </>
                </Route>
                <Route path="/services" exact component={Services} />
                <Route path="/pricing" exact component={Pricing} />
                <Route path="/about" exact component={About} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/" exact>
                  <>
                    <Header />
                    <Home />
                  </>
                </Route>
              </>
            )}

            {/* Routes for logged-in users */}
            {token && (
              <>
                <Route path="/" exact>
                  <>
                    <Header />
                    <Home />
                  </>
                </Route>
                <Route path="/view/:pid" exact>
                  <>
                    <Header minimal />
                    <View />
                  </>
                </Route>
                <Route path="/delete/:pid" exact component={Delete} />
                <Route path="/services" exact component={Services} />
                <Route path="/pricing" exact component={Pricing} />
                <Route path="/about" exact component={About} />
                <Route path="/contact" exact component={Contact} />
              </>
            )}

            {/* Redirect any unknown route to home */}
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
