// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoutes from './Routes/AuthRoutes';

const App = () => {
  return (
    <Router>
      <AuthRoutes />
    </Router>
  );
};

export default App;
