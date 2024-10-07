// src/Routes/AuthRoutes.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Lending from "../pages/Lending";
import InstructorDashboard from "../pages/dashboard/InstructorDashboard";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import PrivateRoute from "../components/PrivateRoute"; // Import PrivateRoute

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Lending />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes with Role-based Access */}
      <Route 
        path="/dashboard/instructor" 
        element={
          <PrivateRoute allowedRoles={['Instructor']}>
            <InstructorDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/dashboard/student" 
        element={
          <PrivateRoute allowedRoles={['Student']}>
            <StudentDashboard />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

export default AuthRoutes;
