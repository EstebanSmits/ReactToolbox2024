import React from 'react';
import { Link } from 'react-router-dom';
import { getItems, deleteItem } from '../utils/db';
import './Menu.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Menu = ({ menuItems, setMenuItems }) => {

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    setMenuItems(await getItems());
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calculator">Calculator</Link>
          </li>
          <li>
            <Link to="/GameOn">Game On</Link>
          </li>
          <li>
            <Link to="/add-menu-item">Add New Menu Item</Link>
          </li>
          {menuItems.map((item) => (
            <li key={item.id}>
              <a href={item.url} target={item.newWindow ? '_blank' : '_self'} rel="noopener noreferrer">
                {item.text}
                {item.newWindow && <i className="fas fa-external-link-alt external-link-icon"></i>}
              </a>
              <i className="fas fa-times delete-icon" onClick={() => handleDeleteItem(item.id)}></i>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
