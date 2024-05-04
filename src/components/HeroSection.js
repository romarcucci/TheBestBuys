import React from 'react';
import robotImage from '../assets/robot.jpeg';
import '../styles/HeroSection.scss';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <img src={robotImage} alt="Robot" className="hero-image" />
      <div className="hero-message">Hello, what are you looking for?</div>
    </section>
  );
};

export default HeroSection;
