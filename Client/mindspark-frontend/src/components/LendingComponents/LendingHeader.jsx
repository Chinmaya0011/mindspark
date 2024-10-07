import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const LendingHeader = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">
        Mind<span className="text-green-500">Spark</span>
      </h1>
      <Link to="/login"> {/* Use Link for navigation */}
        <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
          Login
        </button>
      </Link>
    </header>
  );
}

export default LendingHeader;
