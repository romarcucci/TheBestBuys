import React from 'react';
import '../styles/BotRecommendations.scss'; // SCSS styling for this component

const BotRecommendations = ({ links }) => {
  return (
    <div className="chat-msg bot-recommendations">
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
