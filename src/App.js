import React, { useState } from 'react';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import ChatbotInterface from './components/chatbot/ChatbotInterface';
import Footer from './components/Footer';

// Assets
import backgroundVideo from './assets/videos/background.mp4';

// Styles
import './App.scss';

const App = () => {
  // State to keep track of the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to handle category selection and update the state
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Updates the selected category
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
        {/* If no category is selected, render the Hero section */}
        {!selectedCategory && <HeroSection />}{' '}
        {/* If no category is selected, render the ProductGrid with a callback for category selection */}
        {!selectedCategory && (
          <ProductGrid onCategorySelect={handleCategorySelect} />
        )}
        {/* If a category is selected, render the ChatbotInterface with the selected category */}
        {selectedCategory && (
          <ChatbotInterface selectedCategory={selectedCategory} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App; // Exporting the App component for use in the application
