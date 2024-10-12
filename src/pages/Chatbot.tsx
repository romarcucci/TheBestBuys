import React from 'react';

import ChatbotInterface from '../components/chatbot/ChatbotInterface';
import '../styles/pages/Chatbot.scss';

import backgroundVideo from '../assets/videos/background.mp4';

const HomePage = () => {
  return (
    <div>
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        src={backgroundVideo}
      />
      <ChatbotInterface />
    </div>
  );
};

export default HomePage;
