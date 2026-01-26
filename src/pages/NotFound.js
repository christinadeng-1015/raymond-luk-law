import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Luk & Associates</title>
        <meta
          name="description"
          content="The page you are looking for does not exist. Return to the homepage of Luk & Associates for legal services."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mb-8">
            Page Not Found
          </h2>
          <p className="text-gray-500 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
