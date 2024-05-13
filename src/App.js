import React from 'react';
// import React, { useState } from 'react';

// Components
import Header from './components/Header';
// import HeroSection from './components/HeroSection';
// import ProductGrid from './components/ProductGrid';
import ChatbotInterface from './components/chatbot/ChatbotInterface';
import Footer from './components/Footer';

// Assets
import backgroundVideo from './assets/videos/background.mp4';

// Styles
import './App.scss';

const App = () => {
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
        <ChatbotInterface />
      </div>
      <Footer />
    </div>
  );
};

export default App; // Exporting the App component for use in the application
