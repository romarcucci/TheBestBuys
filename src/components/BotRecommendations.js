import React from 'react';
import '../styles/BotRecommendations.scss'; // Create a new SCSS file for this component

const BotRecommendations = ({ links }) => {
  return (
    <div className="chat-msg bot-recommendation">
      {links.map((link, index) => (
        <div
          key={index}
          className="recommendation-tile"
          dangerouslySetInnerHTML={{ __html: link }}
        />
      ))}
    </div>
  );
};

export default BotRecommendations;
