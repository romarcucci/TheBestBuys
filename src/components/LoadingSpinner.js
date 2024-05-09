import React from 'react';
import '../styles/LoadingSpinner.scss'; // Import the associated styles

const LoadingWave = () => {
  return (
    <div className="loading-spinner">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default LoadingWave;
