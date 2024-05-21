import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventDetails from './EventDetails';
import Sidebar from '../../Components/Sidebar';
import UserUrls from '../../utils/userUrls';

function EventPage() {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(UserUrls.Retrieve);
        setEventList(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleShare = (event) => {
    console.log('Sharing event:', event);
  };

  const handleDelete = async (event) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${event._id}`);
      setEventList((prevEventList) => prevEventList.filter((e) => e._id !== event._id));
      console.log('Event deleted:', event);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const handleItemClick = (component) => {
    console.log(`Navigating to ${component}`);
    // Implement navigation logic here
  };

  return (
    <div className="flex flex-col mt-72 md:mt-0 md:flex-row">
      <Sidebar onItemClick={handleItemClick} />
      <div className="bg-purple-800 min-h-screen py-8 flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-white">Event Details</h1>
          <div className="md:ml-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
            {eventList.map((event) => (
              <EventDetails
                key={event._id}
                event={event}
                onShare={handleShare}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
