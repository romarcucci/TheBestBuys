import React from 'react';

// Assets
import robotAvatar from '../../assets/images/robot_profile_picture.png';

// Styles
import '../../styles/chatbot/BotMessage.scss';

const BotMessage = ({ content }) => {
  return (
    <div className={'chat-msg bot-message'}>
      <img src={robotAvatar} alt="Bot" className="profile-picture" />
      <div className="message-content">{content}</div>
    </div>
  );
};

export default BotMessage;
