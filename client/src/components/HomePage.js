import React, { useState } from 'react';

const Homepage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your App</h1>

        <div className="text-left mb-8">
          <p className="text-gray-600 mb-2">
            Get started by:
          </p>
          <ul className="list-disc pl-6">
            <li>Clicking the <span className="text-blue-500 hover:underline cursor-pointer">Create Task</span> button to create a new task.</li>
            <li>Clicking the <span className="text-red-500 hover:underline cursor-pointer">Logout</span> button to logout.</li>
          </ul>
        </div>

        <div className="text-left">
          <p className="text-gray-600 mb-2">
            Explore more details:
          </p>
          <ul className="list-disc pl-6">
            <li>Click the <span className="text-purple-950 hover:underline cursor-pointer" onClick={toggleDrawer}>Side Drawer</span> button to reveal additional information.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
