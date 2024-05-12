import React from 'react';

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
import '../styles/ProductGrid.scss';

// Functional component that displays a grid of product categories
const ProductGrid = ({ onCategorySelect }) => {
  // Array of product categories with labels and corresponding icons
  const categories = [
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
  ];

  return (
    <div className="product-grid">
      {' '}
      {/* Container for the product grid */}
      {categories.map((category, index) => (
        <div
          key={index} // Unique key for each category
          className="product-category" // Class for styling the product category
          onClick={() => onCategorySelect(category.label)} // Event handler for category selection
        >
          <div className="icon-wrapper">
            {' '}
            {/* Wrapper for the category icon */}
            {category.icon} {/* Display the category icon */}
          </div>
          <span className="category-label">
            {' '}
            {/* Label for the category */}
            {category.label} {/* Display the category name */}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid; // Exporting the ProductGrid component
