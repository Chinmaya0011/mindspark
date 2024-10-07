import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use Vite's import.meta.env for environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Async thunk to handle user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      return response.data; // Ensure the response contains user and token
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed. Please try again.');
    }
  }
);

// Async thunk to handle user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        role, // Include role in registration request
      });
      return response.data; // Ensure the response contains user and role
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed. Please try again.');
    }
  }
);

// Helper function to get the initial authentication state from local storage
const getInitialState = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      user: JSON.parse(localStorage.getItem('user')), // Retrieve user data from localStorage if available
      token,
      isAuthenticated: true,
      error: null,
      loading: false,
      registrationSuccess: false,
    };
  } else {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
      loading: false,
      registrationSuccess: false,
    };
  }
};

// Slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(), // Initialize state based on local storage
  reducers: {
    // Reducer to handle logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.registrationSuccess = false; // Reset registration success
      localStorage.removeItem('token'); // Remove token from local storage
      localStorage.removeItem('user'); // Remove user from local storage
    },
  },
  extraReducers: (builder) => {
    // Handle user login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user; // Assume payload contains user object with role
      state.token = payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', payload.token); // Save token to local storage
      localStorage.setItem('user', JSON.stringify(payload.user)); // Save user data to local storage
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Handle user registration
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.registrationSuccess = false; // Reset on pending
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.registrationSuccess = true; // Set registration success
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.registrationSuccess = false; // Reset on error
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
