import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Homepng from '../assets/Home.jpg';
import 'animate.css/animate.css';

// Utility function to format the date to "DD/MM/YYYY"
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events/');
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-green-500">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-purple-900 text-white">
        <div className="md:ml-8 mt-8 ml-2 z-10 absolute w-full">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white animate__animated animate__fadeInDown">
            Welcome to Music Marina
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl md:mt-4 md:ml-8 lg:text-white animate__animated animate__fadeInUp">
            Where music meets magic!
          </p>
        </div>
        <div className="lg:w-1/2 relative overflow-hidden flex justify-center items-start">
          <div className="absolute h-full w-full bg-purple-700 opacity-75"></div>
          <img src={Homepng} alt="Event" className="scale-95 w-full h-auto mt-48 lg:w-auto max-w-full animate-pulse" />
        </div>
        <div className="lg:w-1/2 bg-purple-800 text-white py-12 px-6 lg:px-24 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-8">Music Marina</h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">
            Music has the remarkable ability to touch our souls and transcend barriers. It speaks a language that goes beyond words, connecting people from all walks of life. From the soaring melodies of classical symphonies to the pulsating beats of contemporary pop, music has the power to evoke emotions, ignite passions, and create unforgettable memories. Whether it's the haunting chords of a melancholic ballad or the infectious rhythm of a lively dance tune, each note carries its own story, weaving together a tapestry of human experience. Through music, we find solace in times of sorrow, celebrate moments of joy, and express the depths of our innermost feelings.
          </p>
          <Link to="/register-ticket" className="flex items-center px-6 py-3 bg-white text-purple-800 rounded-lg font-semibold text-lg hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out">
            <FaCalendarPlus className="mr-2" /> Get Your Event Tickets
          </Link>
        </div>
      </div>

      {/* Cards Section */}
      <div className="bg-purple-900 py-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-white">Upcoming Events</h2>
        <div className="flex flex-wrap justify-center">
          {events.map((event, index) => (
            <div
              key={index}
              className="event-card bg-white m-4 p-6 rounded-lg shadow-lg w-80 md:w-96 lg:w-96 animate__animated animate__fadeInUp transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.2}s` }} // Adds a staggered effect
            >
              <img src={event.photo || Homepng} alt={event.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-purple-700">{event.name}</h3>
              <p className="text-lg md:text-lg lg:text-xl mb-2 text-gray-700">{event.description}</p>
              <div className="flex justify-between text-gray-600 mb-4">
                <p><strong>Date:</strong> {formatDate(event.date)}</p>
                <p><strong>Time:</strong> {event.time}</p>
              </div>
              <p className="text-md md:text-lg lg:text-xl mb-4 text-gray-600"><strong>Venue:</strong> {event.venue}</p>
              <p className="text-md md:text-lg lg:text-xl mb-4 text-gray-600"><strong>Chief Guest:</strong> {event.ChiefGuest}</p>
              <Link to="/register-ticket" className="block text-center bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 transition duration-300 ease-in-out">
                Register
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
