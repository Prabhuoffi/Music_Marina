import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar'; 

function HomePage() {
  const  setSelectedItem = useState('home');

  const handleItemClick = (item) => {
    setSelectedItem(item);

  };

  return (
    <div className="flex ">
      <Sidebar onItemClick={handleItemClick} />
      <div className="flex-grow flex items-center justify-center min-h-screen bg-purple-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Admin Dashboard</h1>
          <Link to="/adminCreate-event" className="bg-white text-purple-800 py-2 px-4 rounded-md font-semibold hover:bg-gray-200">
            Create Event
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
