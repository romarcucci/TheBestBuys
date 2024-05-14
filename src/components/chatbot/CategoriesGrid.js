import React from 'react';

// Styles
import '../../styles/chatbot/CategoriesGrid.scss';

// Functional component that displays a grid of product categories
const ProductGrid = ({ onCategoryClick, categoriesList }) => {
  const handleCategoryClick = (category) => {
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
