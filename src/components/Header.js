import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">TheBestBuys</div>
      <input type="text" placeholder="Search for products..." className="search-bar" />
      <nav className="category-nav">
        <ul>
          <li>Smartphones</li>
          <li>Televisions</li>
          <li>Écouteurs</li>
          <li>Enceintes</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
