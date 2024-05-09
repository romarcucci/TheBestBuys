import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import ChatbotInterface from './components/chatbot/ChatbotInterface';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="app">
      <Header />
      <HeroSection />
      {!selectedCategory && (
        <ProductGrid onCategorySelect={handleCategorySelect} />
      )}
      {selectedCategory && (
        <ChatbotInterface selectedCategory={selectedCategory} />
      )}
    </div>
  );
};

export default App;
