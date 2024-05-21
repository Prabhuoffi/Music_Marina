import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import RegisterImage from '../assets/Register.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import UserUrls from '../utils/userUrls'

Modal.setAppElement('#root');

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(UserUrls.register, {
        username,
        email,
        password,
      });
      console.log('Registration successful:', response.data);
      setModalIsOpen(true);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="lg:w-1/2 relative">
          <img
            src={RegisterImage}
            alt="Register"
            className="w-full scale-75 h-auto lg:w-auto max-w-full"
          />
        </div>
        <div className="lg:w-1/2 bg-purple-800 text-white py-12 px-6 lg:px-24 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-8">Create an Account</h1>
          <form className="flex flex-col mb-8" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              className="px-4 py-2 mb-4 bg-purple-700 text-white rounded-lg border-none focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
              Register
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-lg">
            Already have an account? <Link to="/login" className="text-purple-300 hover:underline">Login here</Link>.
          </p>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Registration Successful"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
        <p className="mb-4">You have registered successfully. You will be redirected to the login page.</p>
        <button className="px-6 py-3 bg-purple-800 text-white rounded-lg font-semibold text-lg hover:bg-purple-700" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </>
  );
}

export default Register;
