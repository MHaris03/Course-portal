import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/LoginPopup.css';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../utils/BASE_URL';

function LoginPopUp({ show, onClose, onLoginSuccess, needLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log(response,"login data")
      toast.success("Login Success")
      sessionStorage.setItem('loggedIn', 'true');
      setErrorMessage('');
      setPassword('');
      setEmail('');
      onLoginSuccess();
      onClose();
    } else {
      setErrorMessage('Invalid email or password');
    }
  };


  const handleGoToRegister = () => {
    navigate('/register');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="login-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        {needLogin && <p className="warning">Please login or register to write a review.</p>}
        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Log In</button>
        </form>
        <button className="register-button" onClick={handleGoToRegister}>Register</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
      <Toaster />
    </div>
  );
}

export default LoginPopUp;
