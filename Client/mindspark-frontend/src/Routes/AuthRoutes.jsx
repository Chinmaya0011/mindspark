import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Lending from "../pages/Lending";
import InstructorDashboard from "../pages/dashboard/InstructorDashboard";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import PrivateRoute from "../components/PrivateRoute";
import NotFound from "../pages/NotFound"; // Import your 404 page component

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

      {/* Catch-all Route for 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
