import React from 'react';

// Icons
import { FaPaperPlane } from 'react-icons/fa';

// Styles
import '../../styles/chatbot/ChatInput.scss';

// ChatInput component for user input and sending messages
const ChatInput = ({
  currentInput,
  setCurrentInput,
  sendMessage,
  isLoading,
}) => {
  return (
    <div className="input-container">
      {' '}
      {/* Container for chat input and send button */}
      <textarea
        rows="1" /* Use a single row by default, expands with content */
        value={currentInput} /* Current text in the chat input */
        onChange={(e) =>
          setCurrentInput(e.target.value)
        } /* Update input on change */
        onKeyPress={(e) => {
          // If the Enter key is pressed without Shift and not loading, send the message
          if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
            sendMessage(); // Trigger sending the message
            e.preventDefault(); // Prevent new line from being added
          }
        }}
        className="chat-input" /* Apply styles for the chat input */
        placeholder="Message Robot Advisor" /* Placeholder text for guidance */
      />
      <div
        className={`send-button ${isLoading ? 'disabled' : ''}`} /* Apply styles and disabled class if loading */
        onClick={
          !isLoading ? sendMessage : null
        } /* Only enable click if not loading */
      >
        <FaPaperPlane /> {/* Icon for sending messages */}
      </div>
    </div>
  );
};

export default ChatInput; /* Export the ChatInput component */
