import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({
  retrievedUserName,
  toggleDrawer,
  onCreateTask,
  toogleReplicateDynamicform,
  toogleFetchingChats,
  admin,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="mr-4 text-white focus:outline-none"
            onClick={toggleDrawer}
          >
            {/* You can use your custom icon or the standard one */}
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <h1 className="text-2xl font-bold m-2">Welcome</h1>
          <p className="border-2 p-2 border-slate-700 rounded-l mr-2">
            {retrievedUserName}-san
          </p>
          <div className="relative pl-2 pr-2">
            <p
              className="bg-inherit text-white px-6 py-2  rounded-lg hover:bg-blue-600 transition duration-300 mr-4"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              Actions
            </p>
            {isDropdownOpen && (
              <ul
                className="absolute bg-slate-300 rounded-lg text-gray-800 pt-1 pl-2 pr-2 shadow-md "
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <li
                  className="hover:bg-gray-700 rounded-lg hover:text-gray-100 py-2 px-4 mt-4 mb-4 cursor-pointer"
                  onClick={() => {
                    toogleFetchingChats();
                    setIsDropdownOpen(false);
                  }}
                >
                  Fetch Chats
                </li>
                {admin && (
                  <li
                    className="hover:bg-gray-700 rounded-lg hover:text-gray-100 py-2 px-4 mt-4 mb-4 cursor-pointer"
                    onClick={() => {
                      toogleReplicateDynamicform();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Users
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {admin && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 mr-4"
              onClick={onCreateTask}
            >
              Create Task
            </button>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
