import React from 'react';

// Assets
import robotImage from '../assets/images/robot.png';

// Styles
import '../styles/HeroSection.scss';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-message">Hello, what are you looking for?</div>
      <img src={robotImage} alt="Robot" className="hero-image" />
    </section>
  );
};

export default HeroSection;
