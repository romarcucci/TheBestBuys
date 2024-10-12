// import React from 'react';

// // Styles
// import '../styles/Header.scss';

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="logo">The Best Buys</div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';

import { FaCity } from 'react-icons/fa';
import { FiHome, FiSidebar } from 'react-icons/fi';
import { HiMiniSquares2X2 } from 'react-icons/hi2';

import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HomePage from '../pages/HomePage';
import Chatbot from '../pages/Chatbot';

import '../styles/Header.scss';

const Header: React.FC = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem('navbar-collapsed');
    return savedState ? JSON.parse(savedState) : true;
  });

  const location = useLocation();
  const path = location.pathname;

  const [selectedCategory, setSelectedCategory] = useState(() => {
    switch (location.pathname) {
      case '/':
        return 'home';
      case '/chatbot':
        return 'chatbot';
      default:
        return 'home';
    }
  });

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    localStorage.setItem('navbar-collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  useEffect(() => {
    if (path === '/') {
      setSelectedCategory('home');
    } else if (path.startsWith('/chatbot')) {
      setSelectedCategory('chatbot');
    }
  }, [path]);

  return (
    <div>
      <header className={`header ${!collapsed ? 'expanded' : ''}`}>
        <div
          className={`navigation-bar ${collapsed ? 'collapsed' : 'expanded'}`}
        >
          <div className="top-bar">
            <Link to="/" onClick={() => setSelectedCategory('home')}>
              {!collapsed && <FaCity className="icon" />}
              {!collapsed && <span className="website-title">thebestbuys</span>}
            </Link>
            <FiSidebar
              className={`toggle-button ${!collapsed ? 'expanded' : ''}`}
              onClick={toggleCollapse}
            />
          </div>
          <ul className="category-list">
            <Link to="/" onClick={() => setSelectedCategory('home')}>
              <li
                className={`category-item ${
                  selectedCategory === 'home' ? 'selected' : ''
                }`}
              >
                <div>
                  <FiHome className="icon" />
                </div>
                {!collapsed && <span className="category-title">Home</span>}
              </li>
            </Link>
            <Link to="/chatbot" onClick={() => setSelectedCategory('chatbot')}>
              <li
                className={`category-item ${
                  selectedCategory === 'chatbot' ? 'selected' : ''
                }`}
              >
                <div>
                  <HiMiniSquares2X2 className="icon" />
                </div>
                {!collapsed && <span className="category-title">Chatbot</span>}
              </li>
            </Link>
          </ul>
        </div>
      </header>{' '}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </main>
    </div>
  );
};

export default Header;
