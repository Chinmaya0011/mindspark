// src/components/DashboardHeader.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import Swal from 'sweetalert2';

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg  z-50">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Welcome, {user.name}</p>
        <div className="flex items-center">
          {user ? (
            <>
              <p className="mr-4 text-sm">Role: {user.role}</p>
            </>
          ) : (
            <p className="mr-4 text-sm">Welcome!</p>
          )}
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
