// src/store/assignmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get the base URL from the .env file
const API_URL = `${import.meta.env.VITE_API_URL}/assignments`;

// Fetch assignments
export const fetchAssignments = createAsyncThunk('assignments/fetch', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add a new assignment
export const addAssignment = createAsyncThunk('assignments/add', async (assignment) => {
  const response = await axios.post(API_URL, assignment);
  return response.data;
});

// Assignment slice
const assignmentSlice = createSlice({
  name: 'assignments',
  initialState: { assignments: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.assignments = action.payload;
      })
      .addCase(addAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
      });
  },
});

// Export the reducer
export default assignmentSlice.reducer;
