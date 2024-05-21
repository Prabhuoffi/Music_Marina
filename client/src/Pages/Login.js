import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import LoginImage from '../assets/login.jpg';
import { Link } from 'react-router-dom';
import UserUrls from '../utils/userUrls';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(UserUrls.login, { email, password });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/adminHome-page');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="lg:w-1/2 relative">
          <img
            src={LoginImage}
            alt="Login"
            className="w-full h-auto scale-75 lg:scale-100 max-w-full"
          />
        </div>
        <div className="lg:w-1/2 bg-purple-800 text-white py-12 px-6 lg:px-24 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-8">Login to Music Marina</h1>
          <form className="flex flex-col mb-8" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 mb-4 bg-purple-700 text-white rounded-lg border-none focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 mb-4 bg-purple-700 text-white rounded-lg border-none focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="px-6 py-3 bg-white text-purple-800 rounded-lg font-semibold text-lg hover:bg-purple-700 hover:text-white">
              Login
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-lg">
            Don't have an account? <Link to="/register" className="text-purple-300 hover:underline">Sign up here</Link>.
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
