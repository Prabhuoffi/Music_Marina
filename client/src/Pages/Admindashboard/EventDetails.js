import React, { useState } from 'react';
import { FaCopy, FaTrash } from 'react-icons/fa';

function convertUTCtoIST(utcDateTimeString) {
  const utcDate = new Date(utcDateTimeString);
  const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000)); // Add 5.5 hours for IST
  return istDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
}

function EventDetails({ event, onDelete }) {
  const istTime = convertUTCtoIST(event.date);
  const [showModal, setShowModal] = useState(false);

  const copyEventDetails = () => {
    const details = `
      Name: ${event.name}
      Time: ${event.time}
      Date: ${istTime}
      Venue: ${event.venue}
      ChiefGuest: ${event.chiefGuest}
      Description: ${event.description}
      Website: http://localhost:3000/
    `;
    navigator.clipboard.writeText(details).then(() => setShowModal(true), () => alert('Failed to copy event details!'));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-semibold text-purple-800 mb-2">{event.name}</h2>
        <div className="text-lg text-gray-600 mb-4">
          <p><span className="font-semibold">Date:</span> {istTime}</p>
          <p><span className="font-semibold">Time:</span> {event.time}</p>
          <p><span className="font-semibold">Venue:</span> {event.venue}</p>
          <p><span className="font-semibold">ChiefGuest:</span> {event.chiefGuest}</p>
          <p><span className="font-semibold">Description:</span> {event.description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button onClick={copyEventDetails} className="text-purple-800 flex items-center gap-2 hover:text-purple-600 focus:outline-none">
          <FaCopy /> <span>Copy</span>
        </button>
        <button onClick={() => onDelete(event)} className="text-red-500 flex items-center gap-2 hover:text-red-400 focus:outline-none">
          <FaTrash /> <span>Delete</span>
        </button>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
                  <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Event Details Copied</h3>
                  <div className="mt-4 px-6 py-3 bg-purple-100 rounded-lg">
                    <p className="text-sm text-purple-800">
                      Event details have been copied to your clipboard.
                      Share it with your friends and colleagues to invite them to this event.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button onClick={() => setShowModal(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetails;
