import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Calculator from './components/Calculator';
import AddMenuItem from './components/AddMenuItem';
import TicTacToe from './components/TicTacToe';
import Game from './Game';
import PrivacyPolicy from './pages/privacy-policy';
import TermsOfService from './pages/terms-of-service';
import { getItems } from './utils/db';
import Layout from './components/Layout';
import GoogleLoginPage from './components/GoogleLoginPage';
import { UserProvider } from './components/UserContext';

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const wsUrl = process.env.REACT_APP_WS_URL;
  useEffect(() => {
    const fetchMenuItems = async () => {
      const items = await getItems();
      setMenuItems(items);
    };
    fetchMenuItems();
  }, []);

  return (
    <UserProvider>
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}m
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Layout menuItems={menuItems} setMenuItems={setMenuItems} />}>
          <Route index element={<Home />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="Tic-Tac-Toe" element={<TicTacToe />} />
          <Route path="GameOn" element={<Game wsUrl={wsUrl} />} />
          <Route path="GoogleLoginPage" Component={GoogleLoginPage} />
          <Route path="privacy-policy" element={<PrivacyPolicy apiUrl={apiUrl} />} />
            <Route path="terms-of-service" element={<TermsOfService apiUrl={apiUrl} />} />
          <Route path="add-menu-item" element={<AddMenuItem setMenuItems={setMenuItems} />} />
        </Route>
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
