import React, { useState, useEffect } from 'react';
import './styles.css';
import Navbar from './Navbar';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='container'>
      <div className='header'>
        <Navbar />
      </div>
    </div>
  );
}

export default Home;
