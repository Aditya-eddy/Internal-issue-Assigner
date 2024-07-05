import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReplicateDynamicForm = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showToast, setshowToast] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.get(
        'http://localhost:8080/api/getAllUserNames',
        config
      );

      if (!data) {
        console.log(data.status);
      } else {
        setUsers(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAdminCheckboxChange = () => {
    setIsAdmin(!isAdmin);
  };

  const handleRegistration = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:8080/api/registerUser',
        { username, password, isAdmin },
        config
      );

      if (!data) {
        console.log(data.status);
      } else {
        setshowToast(true);
        setTimeout(() => {
          setshowToast(false);
        }, 1500);
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUser === null) return;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.delete(
        `http://localhost:8080/api/deleteUser/${selectedUser.id}`,
        config
      );

      if (!data) {
        console.log(data.status);
      } else {
        fetchData();
        setSelectedUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl font-bold">User Registration</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 w-full border rounded-md pr-10"
            />
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-2 py-1 mt-2 mr-2 focus:outline-none"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12v.01M21 12v-.01"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="admin" className="flex items-center">
            <input
              type="checkbox"
              id="admin"
              name="admin"
              checked={isAdmin}
              onChange={handleAdminCheckboxChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-600">Admin</span>
          </label>
        </div>
        <button
          onClick={handleRegistration}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Register
        </button>
        {showToast && (
          <div className="mt-4 p-2 bg-green-500 text-white rounded shadow-md">
            Added a user.
          </div>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <div className="mb-4">
          <label htmlFor="userDropdown" className="block text-sm font-medium text-gray-600">
            Select User:
          </label>
          <select
            id="userDropdown"
            name="userDropdown"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => setSelectedUser(JSON.parse(e.target.value))}
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={JSON.stringify(user)}>
                {user.userName}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleDeleteUser}
          className="bg-red-500 text-white-900 px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          disabled={!selectedUser}
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default ReplicateDynamicForm;
