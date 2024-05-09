import React from 'react';

// Styles
import '../../styles/chatbot/LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default LoadingSpinner;
