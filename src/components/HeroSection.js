import React from 'react';
import robotImage from '../assets/robot.jpeg';

const HeroSection = ({ onChatbotInit }) => {
  return (
    <section className="hero-section">
      <img src={robotImage} alt="Robot" />
      <button className="chatbot-init-button" onClick={onChatbotInit}>
        Hello, what are you looking for?
      </button>
    </section>
  );
};

export default HeroSection;
