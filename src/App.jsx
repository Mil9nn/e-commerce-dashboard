import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './pages/Home'; // Example: Create a Home component
import Header from './components/Header'; // Example: Create a Header component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route for the home page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Route for the Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;