import React, { useState, useEffect } from 'react';
import './styles.css';
import Navbar from './Navbar';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authTimestamp = localStorage.getItem('authTimestamp');
    if (authTimestamp) {
      const now = new Date().getTime();
      if (now - authTimestamp < 5 * 60 * 1000) { // 5 minutes
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('authTimestamp');
      }
    }
  }, []);

  return (
    <div className='container'>
      <div className='header'>
        <Navbar/>
      </div>
    </div>
  );
}

export default Home;
