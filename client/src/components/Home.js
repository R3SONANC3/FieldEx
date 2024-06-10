import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './styles.css'

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedInData = localStorage.getItem('isLoggedIn');
      
      if (isLoggedInData === 'true') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // Redirect to the home page if not logged in
        navigate('/', { replace: true });
      }
    };

    checkLoginStatus();
  }, [navigate]); // Only run this effect once on component mount

  return (
    <div className='container'>
      <div className='header'>
        <Navbar />
      </div>
        <div className='content'>
          <h1>Welcome to the Home Page!</h1>
        </div>
    </div>
  );
}

export default Home;
