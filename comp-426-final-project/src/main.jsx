//this file controls the header and navigation
import React, { useState } from 'react';
import Home from './home';
import Start from './start';
import './main.css';

function Main() {
  const [currentPage, setCurrentPage] = useState('start');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>My Trip Planner</h1>
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'start' && <Start setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default Main;