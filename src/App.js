import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import ChatbotInterface from './components/ChatbotInterface';
import ProductRecommendations from './components/ProductRecommendations';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [productRecommendations, setProductRecommendations] = useState([]);

  return (
    <div className="app">
      <Header />
      <HeroSection onChatbotInit={() => setShowChatbot(true)} />
      {!showChatbot && !selectedCategory && (
        <ProductGrid onCategorySelect={setSelectedCategory} />
      )}
      {showChatbot && (
        <ChatbotInterface
          selectedCategory={selectedCategory}
          onRecommendations={setProductRecommendations}
        />
      )}
      {productRecommendations.length > 0 && (
        <ProductRecommendations
          products={productRecommendations}
          reset={() => {
            setProductRecommendations([]);
            setSelectedCategory(null);
            setShowChatbot(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
