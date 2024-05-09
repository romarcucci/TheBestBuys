import React from 'react';
import { FaPaperPlane } from 'react-icons/fa'; // Import the paper plane icon
import '../../styles/chatbot/ChatInput.scss'; // Import the styles for the component

const ChatInput = ({ currentInput, setCurrentInput, sendMessage, isLoading }) => {
  return (
    <div className="input-container">
      <textarea
        rows="1"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
            sendMessage();
            e.preventDefault();
          }
        }}
        className="chat-input"
        placeholder="Type your message..."
      />
      <div
        className={`send-button ${isLoading ? 'disabled' : ''}`}
        onClick={!isLoading ? sendMessage : null}
      >
        <FaPaperPlane />
      </div>
    </div>
  );
};

export default ChatInput;
