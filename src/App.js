import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import ChatbotInterface from './components/ChatbotInterface';
import ProductRecommendations from './components/ProductRecommendations'; // Importing ProductRecommendations

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recommendations, setRecommendations] = useState([]); // State to hold product recommendations

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleRecommendations = (products) => {
    setRecommendations(products); // Update the recommendations state when new products are received
  };

  return (
    <div className="app">
      <Header />
      <HeroSection />
      {!selectedCategory && (
        <ProductGrid onCategorySelect={handleCategorySelect} />
      )}
      {selectedCategory && (
        <>
          {/* Display recommendations above the chatbot interface */}
          <ProductRecommendations
            products={recommendations}
            reset={() => setSelectedCategory(null)}
          />
          <ChatbotInterface
            selectedCategory={selectedCategory}
            onRecommendations={handleRecommendations} // Pass the handler to receive recommendations
          />
        </>
      )}
    </div>
  );
};

export default App;
