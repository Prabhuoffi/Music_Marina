import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Navbar from '../Components/Navbar';
import TicketImage from '../assets/login.jpg';

function RegisterTicket() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    numTickets: '',
    eventName:''
  });

  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      fullName: formData.fullName,
      email: formData.email,
      numTickets: formData.numTickets,
      eventName:formData.eventName,
      amount: formData.numTickets * 10, 
    };

    try {
      const response = await fetch('http://localhost:5000/api/tickets/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        setQrCodeVisible(true);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };

  const handleConfirm = () => {
    setRegistrationSuccessful(true);
    setShowModal(true);
    setFormData({
      fullName: '',
      email: '',
      numTickets: '',
      eventName:''
    });
    setQrCodeVisible(false);
  };
  

  const googlePayUrl = "https://pay.google.com/gp/p/ui/pay"; // Example URL, replace with actual URL
  const qrValue = JSON.stringify({
    fullName: formData.fullName,
    email: formData.email,
    numTickets: formData.numTickets,
    eventName:formData.eventName,
    amount: formData.numTickets * 10, 
    url: googlePayUrl
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="lg:w-1/2 relative flex justify-center items-center bg-purple-300">
          <img
            src={TicketImage}
            alt="Register Ticket"
            className="w-full h-auto lg:h-full opacity-30 lg:opacity-100 lg:scale-100 max-w-full"
          />
        </div>
        <div className="lg:w-1/2 bg-purple-800 text-white py-12 px-6 lg:px-24 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-8">Register for a Ticket</h1>
          <form className="flex flex-col mb-8" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="px-4 py-2 mb-4 bg-purple-700 text-white rounded-lg border-none focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 mb-4 bg-purple-700 text-white rounded-lg border-none focus:outline-none"
            />
            <input
              type="number"
              name="numTickets"
              placeholder="Number of Tickets"
              value={formData.numTickets}
              onChange={handleChange}
              className="px-4 py-2 mb-4 bg-purple-700 text-white rounded-lg border-none focus:outline-none"
            />
             <input
              type="text"
              name="eventName"
              placeholder="EventName"
              value={formData.eventName}
              onChange={handleChange}
              className="px-4 py-2 mb-4 bg-purple-700 text-white rounded-lg border-none focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 mt-4 bg-white text-purple-800 rounded-lg font-semibold text-lg hover:bg-purple-700 hover:text-white"
            >
              Register Ticket
            </button>
          </form>
          {qrCodeVisible && (
            <div className="mt-8 flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-4">Or Pay via Google Pay</h2>
              <QRCode value={qrValue} size={256} />
              <p className="mt-4">Scan the QR code to pay with Google Pay</p>
              <button
                className="px-6 py-3 mt-4 bg-white text-purple-800 rounded-lg font-semibold text-lg hover:bg-purple-700 hover:text-white"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              {registrationSuccessful && (
                <div className="mt-4 text-green-500 font-semibold">
                  Ticket successfully registered!
                </div>
              )}
            </div>
          )}
        </div>
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Ticket Successfully Registered</h3>
                  <div className="mt-4 px-6 py-3 bg-purple-100 rounded-lg">
                    <p className="text-sm text-purple-800">
                      Your ticket has been successfully registered.
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
    </>
  );
}

export default RegisterTicket;
