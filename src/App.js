import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import ChatbotInterface from './components/chatbot/ChatbotInterface';
import backgroundVideo from './assets/videos/background.mp4';
import './styles/App.scss';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="app">
      <Header />
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        src={backgroundVideo}
      />
      <div className="content">
        {!selectedCategory && <HeroSection />}
        {!selectedCategory && (
          <ProductGrid onCategorySelect={handleCategorySelect} />
        )}
        {selectedCategory && (
          <ChatbotInterface selectedCategory={selectedCategory} />
        )}
      </div>
    </div>
  );
};

export default App;
