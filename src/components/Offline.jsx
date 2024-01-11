import React from 'react';

const Offline = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in">
          You are Offline
          <br /> Check your Internet connection!
        </h1>
        <p className="text-gray-600">Please reconnect to the internet and try again.</p>
      </div>
    </div>
  );
};

export default Offline;
