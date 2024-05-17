import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Prediction from './Prediction';
import ReviewsPage from './ReviewsPage';
import Home from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element={<App/>} path="/"></Route>
      <Route element={<Home/>} path="/home"></Route>
      <Route element={<Prediction/> } path="/prediction"></Route>
      <Route element={<ReviewsPage/>} path="/reviews"></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


