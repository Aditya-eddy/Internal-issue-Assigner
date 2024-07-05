import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showToastInvalid, setShowToastInvalid] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();
  const handleLogin = async () => {
    if (!userName || !password) {
      // Show the toast if username or password is empty
      setShowToast(true);
      // Hide the toast after 3 seconds (adjust as needed)
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
     
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post('http://localhost:8080/api/userDetails', { userName, password}, config);
       if (!data) {
        console.log(data.status);
      } else {
        localStorage.setItem("userInfo", JSON.stringify({userName: data.userName,admin : data.admin}));
        login();
      }
    } catch (err) {
      setShowToastInvalid(true);
      setTimeout(() => {
        setShowToastInvalid(false);
      }, 2000);
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded shadow-inner focus:outline-none focus:border-indigo-500"
            placeholder="Enter your username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded shadow-inner focus:outline-none focus:border-indigo-500"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
          onClick={handleLogin}
        >
          Login
        </button>

        {showToast && (
          <div className="mt-4 p-2 bg-red-500 text-white rounded shadow-md">
            Please enter both username and password.
          </div>
        )}

        {showToastInvalid && (
          <div className="mt-4 p-2 bg-red-500 text-white rounded shadow-md">
            User Not Found.
          </div>
        )}

      </div>
    </div>
  );
};

export default LoginPage;
