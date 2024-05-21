import React, { useState } from 'react';
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus, FaCog, FaTachometerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-0 ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className={`fixed inset-y-0 left-0 w-64 bg-purple-800 text-white z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-300 ease-in-out`}>
        <div className="p-6 mt-9">
          <NavItem icon={<FaSignInAlt />} text="Login" link="/login" />
          <NavItem icon={<FaUserPlus />} text="Register" link="/register" />
          <NavItem icon={<FaTachometerAlt />} text="Admin Dashboard" link="/login" />
          <NavItem icon={<FaCog />} text="Settings"/>
        </div>
      </div>
      <nav className="flex items-center justify-between bg-purple-700 flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
          <span className="font-semibold text-xl tracking-tight">Music Marina</span>
        </div>
        <div className='text-white'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block px-3 py-2 rounded"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
    </>
  );
}

function NavItem({ icon, text, link }) {
  return (
    <Link to={link} className="flex items-center mt-4 text-white hover:text-gray-400">
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  );
}

export default Navbar;
