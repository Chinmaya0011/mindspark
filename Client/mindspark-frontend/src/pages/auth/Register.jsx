import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { registerUser } from '../../redux/authSlice';
import style from "../../Styles/Auth.module.css";
import Swal from 'sweetalert2'; // Import SweetAlert2

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); // Default role is Student
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user state from Redux
  const { user } = useSelector((state) => state.auth);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === 'Instructor' ? '/dashboard/instructor' : '/dashboard/student');
    }
  }, [user, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, role }))
      .unwrap()
      .then((response) => {
        // Store JWT in localStorage
        localStorage.setItem('token', response.token);

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered and are now logged in.',
        });

        // Redirect based on role
        if (response.user.role === 'Instructor') {
          navigate('/dashboard/instructor');
        } else {
          navigate('/dashboard/student');
        }
      })
      .catch((err) => {
        const errorMessage = typeof err === 'string' ? err : (err?.message || 'Registration failed. Please try again.');
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage,
        });
      });
  };

  // Prevent showing the registration page when the user is already authenticated
  if (user) {
    return <Navigate to={user.role === 'Instructor' ? '/dashboard/instructor' : '/dashboard/student'} />;
  }

  return (
    <div className={style.auth}>
      <div className={style.authContainer}>
        <h2 className={style.heading}>Register</h2>
        <form onSubmit={handleRegister} className={style.form}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={style.input}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={style.input}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={style.input}
          />

          {/* Role Selection */}
          <div className={style.roleSelection}>
            <label className={style.radioLabel}>
              <input
                type="radio"
                value="Student"
                checked={role === 'Student'}
                onChange={(e) => setRole(e.target.value)}
                className={style.radioInput}
              />
              Student
            </label>
            <label className={style.radioLabel}>
              <input
                type="radio"
                value="Instructor"
                checked={role === 'Instructor'}
                onChange={(e) => setRole(e.target.value)}
                className={style.radioInput}
              />
              Instructor
            </label>
          </div>

          <button type="submit" className={style.button}>
            Register
          </button>
        </form>
        <p className={style.link}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
