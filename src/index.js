import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserCredentials from './UserCredentials';
import Quiz from './Quiz.js';
import Result from './Result.js';
import Admin from './admin.js';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='main-section'>
    <Router>
      <Routes>
        <Route path='/' element={<UserCredentials />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path="/result" element={<Result />}/>
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  </div>
);
