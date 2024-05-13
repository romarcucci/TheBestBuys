import React, { useState } from 'react';

// Icons
import {
  FaMobileAlt,
  FaTv,
  FaLaptop,
  FaRegClock,
  FaHeadphones,
  FaHeadphonesAlt,
  FaCamera,
  FaBluetooth,
  FaVolumeUp,
  FaProjectDiagram,
  FaDesktop,
  FaGamepad,
} from 'react-icons/fa';

// Styles
import '../../styles/chatbot/CategoriesGrid.scss';

// Functional component that displays a grid of product categories
const ProductGrid = ({ onCategoryClick }) => {
  const [categoriesList, setCategoriesList] = useState([
    { label: 'Smartphone', icon: <FaMobileAlt /> },
    { label: 'TV', icon: <FaTv /> },
    { label: 'Laptop', icon: <FaLaptop /> },
    { label: 'Smartwatch', icon: <FaRegClock /> },
    { label: 'Headphones', icon: <FaHeadphones /> },
    { label: 'Earbuds', icon: <FaHeadphonesAlt /> },
    { label: 'Camera', icon: <FaCamera /> },
    { label: 'Wireless speaker', icon: <FaBluetooth /> },
    { label: 'Soundbar', icon: <FaVolumeUp /> },
    { label: 'Video projector', icon: <FaProjectDiagram /> },
    { label: 'Monitor', icon: <FaDesktop /> },
    { label: 'Video game console', icon: <FaGamepad /> },
  ]);

  const handleCategoryClick = (category) => {
    setCategoriesList([]);
    onCategoryClick(category);
  };

  return (
    <div className="categories-grid">
      {categoriesList.map((category, index) => (
        <div
          key={index} // Unique key for each category
          className="category" // Class for styling the product category
          onClick={() => handleCategoryClick(category)} // Event handler for category selection
        >
          <div className="icon-wrapper">{category.icon}</div>
          <span className="category-label">{category.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid; // Exporting the ProductGrid component
