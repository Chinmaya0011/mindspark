import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white py-12 font-poppins shadow-2xl">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Top Section with 3D Effects */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-blue-400 pb-8 mb-8">
          {/* Company Name and Description */}
          <div className="mb-6 md:mb-0 transform hover:-translate-y-1 hover:translate-x-1 transition-all duration-300 ease-in-out">
            <h2 className="text-4xl font-extrabold tracking-wide text-blue-100">
              MindSpark
            </h2>
            <p className="text-blue-200 mt-2 text-lg">
              Inspiring Minds Through Technology and Innovation.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transform hover:scale-125 transition-all duration-300 ease-in-out"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transform hover:scale-125 transition-all duration-300 ease-in-out"
            >
              <FaTwitter size={30} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transform hover:scale-125 transition-all duration-300 ease-in-out"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transform hover:scale-125 transition-all duration-300 ease-in-out"
            >
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>

        {/* Newsletter and Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Newsletter Signup */}
          <div className="mb-6 md:mb-0 w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-blue-100">Join Our Newsletter</h3>
            <form className="flex flex-col md:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 w-full md:w-2/3 mb-4 md:mb-0"
              />
              <button className="p-3 rounded-md bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out ml-0 md:ml-4">
                Subscribe
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-lg text-blue-200">
            <a href="/" className="hover:text-blue-300 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
              Home
            </a>
            <a href="/about" className="hover:text-blue-300 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
              About Us
            </a>
            <a href="/courses" className="hover:text-blue-300 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
              Courses
            </a>
            <a href="/contact" className="hover:text-blue-300 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
              Contact
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 text-blue-200 text-center border-t border-blue-300 pt-6">
          <p>
            Email: <a href="mailto:contact@mindspark.com" className="hover:underline">contact@mindspark.com</a>
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} <span className="font-bold text-blue-100">MindSpark</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
