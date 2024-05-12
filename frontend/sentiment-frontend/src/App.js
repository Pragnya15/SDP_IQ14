import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Prediction from './Prediction';
import ReviewsPage from './ReviewsPage'; // Import ReviewsDisplay component

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Prediction />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
