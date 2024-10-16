import React from 'react';

// Styles
import '../../styles/chatbot/BotRecommendations.scss';

const BotRecommendations = ({ links }) => {
  return (
    <div className="chat-msg bot-recommendations">
      {links.map((link, index) => (
        <div key={index} className="recommendation-tile">
          <a
            class="affiliated-link"
            href={`https://www.amazon.fr/s?k=${link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="test-affiliated-link">{link}</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default BotRecommendations;
