import React from 'react';

const ProductRecommendations = ({ products, reset }) => {
  return (
    <div className="product-recommendations">
      <h2>Recommended Products:</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              {product.name}
            </a>
          </li>
        ))}
      </ul>
      <button onClick={reset}>Start Over</button>
    </div>
  );
};

export default ProductRecommendations;
