// src/components/DashboardHeader.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import Swal from 'sweetalert2';
import styles from '../../Styles/DashboardHeader.module.css'; // Import your CSS module

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
    <div className={styles.dashboardHeader}>
      <div className={styles.welcomeText}>
        <p className={styles.userName}>Welcome, {user.name}</p>
      </div>
      <div className={styles.userInfo}>
        {user ? (
          <>
            <p className={styles.userRole}>Role: {user.role}</p>
          </>
        ) : (
          <p className={styles.welcomeMessage}>Welcome!</p>
        )}
        <button 
          onClick={handleLogout} 
          className={styles.logoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
