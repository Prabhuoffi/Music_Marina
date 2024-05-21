import React, { useState, useEffect } from 'react';
import { FaHome, FaCalendarAlt, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoutClick = () => {
    // Perform logout logic here if needed
    navigate('/');
  };

  return (
    <aside className={`bg-purple-900 text-white flex flex-col fixed top-0 left-0 ${isMobile ? 'w-full' : 'md:w-64'} transition-all duration-300 ease-in-out`}>
      <div className="p-2 md:h-screen h-72">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="flex flex-col px-4 space-y-0.5">
          <Link to="/adminHome-page" className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded">
            <FaHome /> <span className="ml-2">Home</span>
          </Link>
          <Link to="/adminCreate-event" className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded">
            <FaPlus /> <span className="ml-2">Create Event</span>
          </Link>
          <Link to="/adminEvent-page" className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded">
            <FaCalendarAlt /> <span className="ml-2">Events</span>
          </Link>
          {/* New link for user registration */}
          <Link to="/adminRegistration-table" className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded">
            <FaPlus /> <span className="ml-2">Register User</span>
          </Link>
          <button onClick={handleLogoutClick} className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded mt-auto">
            <FaSignOutAlt /> <span className="ml-2">Logout</span>
          </button>
        </nav>
      </div>
      <div className="gap-12"></div>
    </aside>
  );
}

export default Sidebar;
