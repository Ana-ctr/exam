import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Define theme tokens
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

const Header = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || THEME_LIGHT);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.status === 200) {
            setUser(response.data);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = theme === THEME_LIGHT ? 'white' : '#333';
  }, [theme]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    setUser(null);
    window.location.href = '/login'; // Redirect to login page
  };

  const switchTheme = () => {
    const newTheme = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === THEME_LIGHT ? 'bg-light' : 'bg-dark'}`} style={{ height: '80px' }}>
      <div className="container-fluid d-flex align-items-center">
        {/* Left-aligned section */}
        <div className="d-flex flex-grow-1 justify-content-start">
          <button className="btn btn-light btn-sm me-2" onClick={() => navigateTo('/wallet')}>My Wallet</button>
          <button className="btn btn-light btn-sm me-2" onClick={() => navigateTo('/currency')}>Currency</button>
          <button className="btn btn-light btn-sm me-2" onClick={() => navigateTo('/help')}>Help</button>
        </div>
        
            <button className="btn btn-light btn-sm me-2 " onClick={() => navigateTo('/login')}>Logout</button>
        
          <button onClick={switchTheme} className="btn btn-link">
            <i className={`fa${theme === THEME_LIGHT ? '-regular' : '-solid'} fa-moon`}></i>
          </button>
      
      </div>
    </nav>
  );
};

export default Header;
