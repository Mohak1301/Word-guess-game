import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Basic client-side validation
    if (name.trim() === '' || username.trim() === '' || email.trim() === '' || password.trim() === '') {
      toast.error('All fields are required', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5100/api/v1/auth/register', {
        name,
        username,
        email,
        password
      });
      
      setLoading(false); // End loading
      toast.success(res.data.message, {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });

      // Clear form fields after registration
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');

      // Redirect to login page after successful registration
      navigate('/login'); 
    } catch (error) {
      setLoading(false); // End loading
      // Handle error when response is undefined
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <button className="switch-button" onClick={() => navigate('/')}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;
