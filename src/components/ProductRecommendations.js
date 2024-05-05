import React from 'react';
import '../styles/ProductRecommendations.scss';

const ProductRecommendations = ({ isLoading, products }) => {
  return (
    <div className="product-recommendations">
      <h2>Recommended Products:</h2>
      <div className="product-list">
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            {/* Tailwind CSS spinner */}
            <div className="animate-spin h-8 w-8 border-4 border-t-transparent rounded-full border-gray-500"></div>
          </div>
        ) : (
          products.length > 0 &&
          products.map((product, index) => (
            <div key={index} className="product-tile">
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={product.imageSrc}
                  alt={product.title}
                  style={{ width: '150px', height: '150px' }}
                />
                <span>{product.title}</span>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductRecommendations;
