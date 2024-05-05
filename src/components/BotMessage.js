import React from 'react';
import robotAvatar from '../assets/robot_profile_picture.png'; // Path to your robot avatar
import '../styles/BotMessage.scss'; // SCSS file for styling
import '../styles/ChatbotInterface.scss';

const BotMessage = ({ className, content, recommendations }) => {
  return (
    <div className={`bot-message ${className}`}>
      {' '}
      {/* Apply new class for structure */}
      <div className="message-row">
        <img src={robotAvatar} alt="Bot" className="profile-picture" />
        <div className="message-content">{content}</div>
      </div>
      {/* Display additional recommendations as tiles below the main bot message */}
      {recommendations && recommendations.length > 0 && (
        <div className="recommendations-row">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="recommendation-tile"
              dangerouslySetInnerHTML={{ __html: rec }} // Insert raw HTML
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BotMessage;
