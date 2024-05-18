import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Your Game Name. All rights reserved.</p>
      <nav>
        <div>
        <Link to="/">Home</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </nav>  
    </footer>
  );
};

export default Footer;
