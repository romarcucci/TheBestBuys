import React from 'react';

const ProductGrid = ({ onCategorySelect }) => {
  const categories = [
    { label: 'Smartphones', icon: '📱' },
    { label: 'Televisions', icon: '📺' },
    { label: 'Écouteurs', icon: '🎧' },
    { label: 'Enceintes', icon: '🔊' },
  ];

  return (
    <div className="product-grid">
      {categories.map((category, index) => (
        <div
          key={index}
          className="product-category"
          onClick={() => onCategorySelect(category.label)}
        >
          <span className="category-icon">{category.icon}</span>
          <span className="category-label">{category.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
