import React from 'react';
import logo from '../assets/react_web_dev_logo_3rd.png'
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
    <img src={logo} className="app-logo" alt="Logo" />
    <div className="app-title">
      <h1>My Website</h1>
      <p>Your go-to place for web development</p>
    </div>
  </header>
  );
};

export default Header;
