// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice';
import assignmentReducer from './redux/assignmentSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    assignments: assignmentReducer,

  },
});

export default store;
