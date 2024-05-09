import React from 'react';
import robotAvatar from '../assets/robot_profile_picture.png';
import '../styles/BotMessage.scss';

const BotMessage = ({ content }) => {
  return (
    <div className={'chat-msg bot-message'}>
      <img src={robotAvatar} alt="Bot" className="profile-picture" />
      <div className="message-content">{content}</div>
    </div>
  );
};

export default BotMessage;
