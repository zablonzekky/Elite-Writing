import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/loadingSpinner/LoadingSpinner";
import Header from "../../shared/header/Header";
import Footer from "../Home/components/Footer";
import "./Auth.css";

const Auth = (props) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState({ value: '', isValid: true });
  const [email, setEmail] = useState({ value: '', isValid: true });
  const [password, setPassword] = useState({ value: '', isValid: true });
  const [isFormValid, setIsFormValid] = useState(true);
  const [code, setCode] = useState("c");
  const [receivedCode, setReceivedCode] = useState();

  const auth = useContext(AuthContext);
  const history = useHistory(); // ← useHistory instead of useNavigate

  useEffect(() => {
    fetch('http://localhost:5000/user/users')
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

  useEffect(() => {
    document.title = props.login ? 'Login' : 'Signup';
  }, [props.login]);

  const setUsernameChangeHandler = (event) => {
    const name = event.target.value;
    let isValid = true;
    setError('');

    if (users.find(user => user.name === name)) {
      setError('User already exists');
      isValid = false;
    }
    if (name.includes(" ")) {
      setError("Username cannot contain spaces");
      isValid = false;
    }

    setUsername({ value: name, isValid });
    setIsFormValid(isValid && email.isValid && password.isValid);
  };

  const setEmailChangeHandler = (event) => {
    const value = event.target.value;
    const isValid = value.includes('@');

    setEmail({ value, isValid });
    setIsFormValid(username.isValid && password.isValid && isValid);
  };

  const setPasswordChangeHandler = (event) => {
    const value = event.target.value;
    const isValid = value.length > 4;

    setPassword({ value, isValid });
    setIsFormValid(username.isValid && email.isValid && isValid);
  };

  const submitLoginHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, password: password.value })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        auth.login(data.userId, data.token);
        history.push('/profile'); // ← changed navigate to history.push
      }
    } catch (err) {
      console.log(err);
      setError("Login failed. Please try again.");
    }

    setLoading(false);
  };

  const submitSignupHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/user/validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, name: username.value }),
      });

      const data = await res.json();
      if (!res.ok) setError(data.message);
      else setReceivedCode(data.code);
    } catch (err) {
      console.log(err);
      setError("Validation failed. Try again.");
    }

    setLoading(false);
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: username.value,
          email: email.value,
          password: password.value,
          code: code,
          hashedCode: receivedCode
        }),
      });

      const data = await res.json();
      if (!res.ok) setError(data.message);
      else history.push('/login'); // ← changed navigate to history.push
    } catch (err) {
      console.log(err);
      setError("Signup failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="container-fluid py-5" style={{
        backgroundImage: 'url(http://localhost:5000/static/images/auth.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}>
        <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="col-md-6 col-lg-5">
            <div className="card p-4 shadow-lg">
              <h3 className="mb-4 text-center">
                {receivedCode ? "Activate Your Email" : props.login ? "Login to Freelance" : "Create Freelance Account"}
              </h3>

              <form onSubmit={receivedCode ? signupHandler : (props.login ? submitLoginHandler : submitSignupHandler)}>

                {!props.login && !receivedCode && (
                  <div className="mb-3">
                    <label>Username</label>
                    <input type="text" className={`form-control ${!username.isValid && "is-invalid"}`}
                      onChange={setUsernameChangeHandler} required />
                  </div>
                )}

                {!receivedCode && (
                  <>
                    <div className="mb-3">
                      <label>Email</label>
                      <input type="email" className={`form-control ${!email.isValid && "is-invalid"}`}
                        onChange={setEmailChangeHandler} required />
                    </div>
                    <div className="mb-3">
                      <label>Password</label>
                      <input type="password" className={`form-control ${!password.isValid && "is-invalid"}`}
                        onChange={setPasswordChangeHandler} required />
                    </div>
                  </>
                )}

                {receivedCode && (
                  <div className="mb-3">
                    <label>Activation Code</label>
                    <input type="text" className="form-control"
                      onChange={e => setCode(e.target.value)} required />
                  </div>
                )}

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={!isFormValid}
                >
                  {receivedCode ? "Activate" : props.login ? "Login" : "Sign Up"}
                </button>

                <div className="text-center">
                  {props.login ? (
                    <NavLink to="/signup">Don't have an account?</NavLink>
                  ) : (
                    <NavLink to="/login">Already have an account?</NavLink>
                  )}
                </div>

                <LoadingSpinner isLoading={loading} />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
