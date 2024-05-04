import React from 'react';
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
import '../styles/ProductGrid.css';

const ProductGrid = ({ onCategorySelect }) => {
  const categories = [
    { label: 'Smartphones', icon: <FaMobileAlt /> },
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
  ];

  return (
    <div className="product-grid">
      {categories.map((category, index) => (
        <div
          key={index}
          className="product-category"
          onClick={() => onCategorySelect(category.label)}
        >
          <div className="icon-wrapper">{category.icon}</div>
          <span className="category-label">{category.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
