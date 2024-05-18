import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu'; // Import the Menu component
import './Layout.css';

const Layout = ({ menuItems, setMenuItems }) => {
  return (
    <div>
      <Header />
      <Menu menuItems={menuItems} setMenuItems={setMenuItems} /> {/* Add the Menu component here */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
