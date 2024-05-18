import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import Home from './Home';
import Calculator from './components/Calculator';
import Menu from './components/Menu';
import AddMenuItem from './components/AddMenuItem';
import TicTacToe from './components/TicTacToe';
import Game  from './Game';
import logo from './assets/react_web_dev_logo_3rd.png';
import './App.css';
import { getItems } from './utils/db';

const App = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const items = await getItems();
      setMenuItems(items);
    };

    fetchMenuItems();
  }, []);

  return (
    <Router>
      <header className="app-header">
        <img src={logo} className="app-logo" alt="Logo" />
        <div className="app-title">
          <h1>My Website</h1>
          <p>Your go-to place for web development</p>
        </div>
      </header>
      <ToastContainer
       position="top-center"
       autoClose={1500}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
      />
      <Menu menuItems={menuItems} setMenuItems={setMenuItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/Tic-Tac-Toe" element={<TicTacToe />} />
        <Route path="/GameOn" element={<Game />} />
        <Route path="/add-menu-item" element={<AddMenuItem setMenuItems={setMenuItems} />} />
      </Routes>
    </Router>
  );
};

export default App;
