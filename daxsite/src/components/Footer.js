import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <nav>
        <div>
        <Link to="/">Home</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </nav>  
      <p>&copy; {new Date().getFullYear()} React space. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
