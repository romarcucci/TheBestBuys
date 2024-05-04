import React from 'react';
import { FaAmazon } from 'react-icons/fa'; // Using an icon for Amazon
import '../styles/ProductRecommendations.scss';

const ProductRecommendations = ({ products, reset }) => {
  return (
    <div className="product-recommendations">
      <h2>Recommended Products:</h2>
      <div className="product-list">
        {products.map((product, index) => (
          <div key={index} className="product-tile">
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              <FaAmazon /> {/* Amazon icon */}
              <span>{product.name}</span> {/* Product name */}
            </a>
          </div>
        ))}
      </div>
      <button onClick={reset}>Start Over</button>
    </div>
  );
};

export default ProductRecommendations;
