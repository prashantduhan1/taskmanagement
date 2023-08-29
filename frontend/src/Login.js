import React, { useState } from 'react';
import './Styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Please fill in both username and password fields.');
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        'https://task-management-l6a9.onrender.com/api/login',
        {
          username: username,
          password: password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Incorrect username or password
        setErrorMessage('Username or password is incorrect.');
      } else {
        // Handle other errors here
        console.error(error);
        setErrorMessage('An error occurred while logging in.');
      }
    } finally {
      setIsLoading(false); // Stop loading, whether the request succeeds or fails
    }
  };

  return (
    <div>
      <div className='login-container'>
        <div className='login-input'>
          <h1>Login</h1>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            <button onClick={handleLogin} disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
        <div>
          <p>
            New user?
            <button onClick={() => navigate('/register')}>Register</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
