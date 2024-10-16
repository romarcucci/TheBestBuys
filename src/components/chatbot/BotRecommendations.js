import React from 'react';

// Styles
import '../../styles/chatbot/BotRecommendations.scss';

const BotRecommendations = ({ links }) => {
  return (
    <div className="chat-msg bot-recommendations">
      {links.map((link, index) => (
        <a
          class="affiliated-link"
          href={`https://www.amazon.fr/s?k=${link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div key={index} className="recommendation-tile">
            <span class="test-affiliated-link">{link}</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default BotRecommendations;
