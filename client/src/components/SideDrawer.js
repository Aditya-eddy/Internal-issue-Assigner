// SideDrawer.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SideDrawer = ({ isOpen, toggleDrawer , userDetails}) => {
  const navigate = useNavigate();
  const admin = userDetails.admin;
  return (
    <div className={`fixed inset-0 overflow-hidden  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={toggleDrawer}
      ></div>

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white p-4">
        {/* Close button */}
        <div className="flex justify-between items-center">
          <button onClick={toggleDrawer} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Drawer content */}
        <div className="mt-4 text-center">
          {/* Circular Image */}
          <img
            src={require('../profilepics/author.jpg')} // Replace with the URL of your image
            alt="Side Drawer Image"
            className="mx-auto h-20 w-17 rounded-full"
          />

          {/* Other Details */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-800">Hello {userDetails.userName}</h1>
            {admin ? (
              <p className="text-gray-600 mt-2">Post :admin </p>
            ):(
              <p className="text-gray-600 mt-2">Post :user </p>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
