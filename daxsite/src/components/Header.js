import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import logo from '../assets/react_web_dev_logo_3rd.png';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="Logo" />
      <div className="app-title">
        <h1>React Tools</h1>
        <p>Learning on the go to implement new tools </p>
      </div>
      <div className="user-section">
        {user ? (
          <div className="user-info">
            <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
            <span className="user-name">{user.name}</span>
            <div className="dropdown-content">
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
        ) : (
          <Link to="/GoogleLoginPage" className="login-link">
            <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
            <span className="user-name">Login</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
