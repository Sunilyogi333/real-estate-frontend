import React from 'react';

const adminSidebar = ({ handleOptionClick }) => (
  <aside className="bg-gray-50 h-screen w-72 flex flex-col justify-between p-4 overflow-y-auto border">
    <div className="flex flex-col mt-20">
      <button 
      onClick={() => handleOptionClick('Dashboard')} 
      className="text-lg font-medium text-gray-700 px-2 py-1 text-left rounded-md hover:bg-gray-200">
      Dashboard
      </button>
      <button 
      onClick={() => handleOptionClick('KYC Forms')} 
      className="text-lg font-medium text-gray-700 px-2 py-1 text-left rounded-md hover:bg-gray-200">
      KYC Forms
      </button>
      <button 
      onClick={() => handleOptionClick('Inbox')} 
      className="text-lg font-medium text-gray-700 px-2 py-1 text-left rounded-md hover:bg-gray-200">
      Inbox
      </button>
      <button 
      onClick={() => handleOptionClick('Help')} 
      className="text-lg font-medium text-gray-700 px-2 py-1 text-left rounded-md hover:bg-gray-200">
      Help & Support
      </button>
      <button 
      onClick={() => handleOptionClick('Settings')} 
      className="text-lg font-medium text-gray-700 px-2 py-1 text-left rounded-md hover:bg-gray-200">
      Settings
      </button>
    </div>
  </aside>
);

export default adminSidebar;
