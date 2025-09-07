import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Page Not Found</p>
        <p className="text-gray-500 dark:text-gray-400">The page you're looking for doesn't exist or has been moved.</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;