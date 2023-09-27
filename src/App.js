// Import necessary libraries
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import your components
import HomePage from './components/HomePage';
import FishPage from './components/FishPage';
// Keep your existing imports if you need them
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fish/:id" element={<FishPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
