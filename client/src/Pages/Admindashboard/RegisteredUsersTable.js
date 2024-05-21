import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';

function RegisteredUsersTable() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRegisteredUsers();
  }, []);

  const fetchRegisteredUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tickets/tickets');
      const data = await response.json();
      setRegisteredUsers(data);
    } catch (error) {
      console.error('Error fetching registered users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/tickets/tickets/${userId}`, {
        method: 'DELETE',
      });
      setRegisteredUsers(registeredUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = registeredUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row">
      {/* Include the Sidebar component */}
      <Sidebar />
      <div className="flex-1 h-screen  mt-72 md:mt-0 bg-purple-700 flex flex-col items-center">
        <h2 className="text-3xl mt-8 font-semibold text-white mb-8">Registered Users</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 bg-purple-800 text-white rounded-lg mb-6 sm:mb-12 border-none focus:outline-none w-full max-w-md"
        />
        <div className="overflow-x-auto w-full max-w-screen-lg">
          <table className="table-auto w-full  border-collapse border border-black">
            <thead className="bg-purple-800 text-white">
              <tr>
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Number of Tickets</th>
                <th className="px-4 py-2">Event Name</th>
                <th className="px-4  py-2">Actions</th>
              </tr>
            </thead>
            <tbody className=" text-gray-700">
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className={index % 2 === 0 ? 'bg-purple-100' : 'bg-purple-200'}>
                  <td className="border border-black px-4 py-2">{index + 1}</td>
                  <td className="border border-black px-4 py-2">{user.fullName}</td>
                  <td className="border border-black px-4 py-2">{user.email}</td>
                  <td className="border border-black px-4 py-2">{user.numTickets}</td>
                  <td className="border border-black px-4 py-2">{user.eventName}</td>
                  <td className="border border-black px-4 py-2">
                    <button onClick={() => handleDeleteUser(user._id)} className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-lg md:ml-8   hover:bg-red-500 focus:outline-none">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     
      </div>
    </div>
  );
}

export default RegisteredUsersTable;
