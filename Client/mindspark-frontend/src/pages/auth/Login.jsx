import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { loginUser } from '../../redux/authSlice';
import style from "../../Styles/Auth.module.css";
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth); // Access user and authentication state

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === 'Instructor' ? '/dashboard/instructor' : '/dashboard/student');
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((response) => {
        // Store JWT in localStorage
        localStorage.setItem('token', response.token);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
        });

        // Role-based redirection
        if (response.user.role === 'Instructor') {
          navigate('/dashboard/instructor');
        } else if (response.user.role === 'Student') {
          navigate('/dashboard/student');
        } else {
          navigate('/'); // Default fallback route
        }
      })
      .catch((err) => {
        const errorMessage = typeof err === 'string' ? err : (err?.message || 'Invalid credentials. Please try again.');
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
        });
      });
  };

  // Prevent showing the login page when the user is already authenticated
  if (user) {
    return <Navigate to={user.role === 'Instructor' ? '/dashboard/instructor' : '/dashboard/student'} />;
  }

  return (
    <div className={style.auth}>
      <div className={style.authContainer}>
        <h2 className={style.heading}>Login</h2>
        <form onSubmit={handleLogin} className={style.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={style.input}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={style.input}
            autoComplete="current-password"
          />
          <button type="submit" disabled={loading} className={style.button}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <p className={style.error}>{typeof error === 'string' ? error : error.message}</p>}
        <p className={style.link}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
