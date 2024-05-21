import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import UserUrls from '../../utils/userUrls';


function CreateEvent() {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    time: '',
    date: '',
    venue: '',
    ChiefGuest: '',
    description: '',
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(UserUrls.create, eventDetails);
      console.log(response.data);
      setIsSuccessModalOpen(true);
      setEventDetails({
        name: '',
        time: '',
        date: '',
        venue: '',
        ChiefGuest: '',
        description: '',
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/adminEvent-page');
  };

  const handleItemClick = (component) => {
    console.log(`Navigating to ${component}`);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <Sidebar onItemClick={handleItemClick} />

      {/* Main Content */}
      <div className="bg-purple-800 md:mt-0 mt-72 flex-grow flex justify-center items-center">
        <div className="bg-purple-700 p-4 md:p-8 rounded-lg shadow-lg md:max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-white text-center">Create Event</h1>
          <form onSubmit={handleSubmit}>
            {/* Form Inputs */}
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold mb-1 text-white">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={eventDetails.name}
                onChange={handleChange}
                className="border border-purple-500 rounded-md p-2 w-full focus:outline-none focus:border-purple-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block font-semibold mb-1 text-white">Time:</label>
              <input
                type="text"
                id="time"
                name="time"
                value={eventDetails.time}
                onChange={handleChange}
                className="border border-purple-500 rounded-md p-2 w-full focus:outline-none focus:border-purple-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block font-semibold mb-1 text-white">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={eventDetails.date}
                onChange={handleChange}
                className="border border-purple-500 rounded-md p-2 w-full focus:outline-none focus:border-purple-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="venue" className="block font-semibold mb-1 text-white">Venue:</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={eventDetails.venue}
                onChange={handleChange}
                className="border border-purple-500 rounded-md p-2 w-full focus:outline-none focus:border-purple-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ChiefGuest" className="block font-semibold mb-1 text-white">ChiefGuest:</label>
              <input
                id='ChiefGuest'
                type="text"
                name="ChiefGuest"
                value={eventDetails.ChiefGuest}
                onChange={handleChange}
                className="border border-purple-500 rounded-md p-2 w-full focus:outline-none focus:border-purple-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold mb-1 text-white">Description:</label>
              <textarea
                id="description"
                name="description"
                value={eventDetails.description}
                onChange={handleChange}
                className="border border-purple-500 rounded-md p-2 w-full h-24 focus:outline-none focus:border-purple-300"
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-purple-900 text-white py-2 px-4 rounded-md w-full hover:bg-purple-700 transition duration-300">Create Event</button>
          </form>
        </div>



        {/* Modal for success message */}
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-700 bg-opacity-75">
            <div className="bg-white p-4 md:p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Event Created Successfully!</h2>
              <button onClick={handleCloseModal} className="bg-purple-900 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateEvent;
