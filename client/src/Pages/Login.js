import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5100/api/v1/auth/login', {
        email,
        password,
      });

      if (res.status === 200) {
        // Store token and userId in localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user._id); // Assuming res.data.user contains the user object with _id

        navigate('/user/profile'); // Redirect to dashboard or another page after login
        toast.success(res.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error('Error during login:', error); // Improved error logging
      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <button
          className="switch-button"
          onClick={() => navigate('/register')}
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default Login;
