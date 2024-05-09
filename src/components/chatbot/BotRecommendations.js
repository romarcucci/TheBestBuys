import React from 'react';

// Styles
import '../../styles/chatbot/BotRecommendations.scss';

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
